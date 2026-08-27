import Movie from '../models/Post.js';
import { decryptUrl } from '../libs/crypto.js';
import crypto from 'crypto';

// In-memory Rate Limiting (IP -> timestamps array)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 15;

// In-memory Signed Download Tokens (token -> { url, expiresAt })
const tokenStore = new Map();

// Periodic cleanup of expired tokens
setInterval(() => {
  const now = Date.now();
  for (const [t, data] of tokenStore.entries()) {
    if (data.expiresAt < now) {
      tokenStore.delete(t);
    }
  }
}, 60 * 1000);

function isRateLimited(clientIp) {
  const now = Date.now();
  const timestamps = rateLimitMap.get(clientIp) || [];
  const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  validTimestamps.push(now);
  rateLimitMap.set(clientIp, validTimestamps);
  return false;
}

/**
 * Download Authorization Endpoint
 * POST /api/download/request
 * Payload: { movieId, resolution, episodeIndex, isZip }
 */
export const requestDownloadAuth = async (req, res) => {
  const clientIp = req.ip || req.headers['x-forwarded-for'] || '127.0.0.1';

  if (isRateLimited(clientIp)) {
    return res.status(429).json({
      success: false,
      message: 'Too many download requests. Please wait a minute and try again.',
    });
  }

  try {
    const { movieId, resolution, episodeIndex, isZip } = req.body;

    if (!movieId) {
      return res.status(400).json({ success: false, message: 'Movie ID is required.' });
    }

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ success: false, message: 'Title not found.' });
    }

    let encryptedUrl = '';

    if (isZip && movie.zipDownloadLink) {
      encryptedUrl = movie.zipDownloadLink[resolution] || '';
    } else if (episodeIndex !== undefined && episodeIndex !== null && Array.isArray(movie.episodes)) {
      const ep = movie.episodes[episodeIndex];
      if (ep && ep.downloadlink) {
        encryptedUrl = ep.downloadlink[resolution] || ep.downloadlink['720p'] || ep.downloadlink['1080p'] || '';
      }
    } else if (movie.downloadlink) {
      encryptedUrl = movie.downloadlink[resolution] || '';
    }

    if (!encryptedUrl && movie.watchonline) {
      encryptedUrl = movie.watchonline;
    }

    if (!encryptedUrl) {
      return res.status(404).json({
        success: false,
        message: 'Requested download link is currently unavailable for this resolution.',
      });
    }

    // Decrypt URL server-side
    const rawUrl = decryptUrl(encryptedUrl);
    if (!rawUrl || !rawUrl.startsWith('http')) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or corrupted download link configuration.',
      });
    }

    // Generate short-lived signed token (valid for 2 minutes)
    const token = crypto.randomBytes(24).toString('hex');
    const expiresAt = Date.now() + 2 * 60 * 1000; // 2 minutes

    tokenStore.set(token, { url: rawUrl, expiresAt });

    const downloadUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/download/file?token=${token}`;

    res.status(200).json({
      success: true,
      downloadUrl,
      expiresInSeconds: 120,
    });
  } catch (error) {
    console.error('Error generating download authorization:', error);
    res.status(500).json({ success: false, message: 'Server error authorizing download.' });
  }
};

/**
 * Download Execution Endpoint
 * GET /api/download/file?token=...
 */
export const executeDownload = async (req, res) => {
  try {
    const { token } = req.query;
    if (!token || !tokenStore.has(token)) {
      return res.status(403).send('Download token expired or invalid. Please request a new download link.');
    }

    const tokenData = tokenStore.get(token);
    if (Date.now() > tokenData.expiresAt) {
      tokenStore.delete(token);
      return res.status(403).send('Download token has expired. Please request a new download link.');
    }

    // One-time token use: consume token
    tokenStore.delete(token);

    // Redirect to remote file URL securely
    return res.redirect(302, tokenData.url);
  } catch (error) {
    console.error('Error executing download:', error);
    res.status(500).send('Server error processing download.');
  }
};
