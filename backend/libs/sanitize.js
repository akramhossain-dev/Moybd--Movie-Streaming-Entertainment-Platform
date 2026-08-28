/**
 * Sanitizes movie document for public API responses by stripping raw encrypted URLs
 * and returning available resolutions / episode structure safely.
 */
export function sanitizeMovieForPublic(movieDoc) {
    if (!movieDoc) return null;
    const obj = movieDoc.toObject ? movieDoc.toObject() : { ...movieDoc };

    const availableResolutions = [];
    if (obj.downloadlink && typeof obj.downloadlink === 'object') {
        for (const [res, url] of Object.entries(obj.downloadlink)) {
            if (url && typeof url === 'string' && url.trim()) {
                availableResolutions.push(res);
            }
        }
    }

    const availableZipResolutions = [];
    if (obj.zipDownloadLink && typeof obj.zipDownloadLink === 'object') {
        for (const [res, url] of Object.entries(obj.zipDownloadLink)) {
            if (url && typeof url === 'string' && url.trim()) {
                availableZipResolutions.push(res);
            }
        }
    }

    const safeEpisodes = [];
    if (Array.isArray(obj.episodes)) {
        obj.episodes.forEach((ep) => {
            const epResolutions = [];
            if (ep.downloadlink && typeof ep.downloadlink === 'object') {
                for (const [res, url] of Object.entries(ep.downloadlink)) {
                    if (url && typeof url === 'string' && url.trim()) {
                        epResolutions.push(res);
                    }
                }
            }
            safeEpisodes.push({
                episodeNumber: ep.episodeNumber || '',
                title: ep.title || '',
                availableResolutions: epResolutions,
                hasWatchOnline: !!ep.watchonline,
            });
        });
    }

    delete obj.downloadlink;
    delete obj.zipDownloadLink;
    delete obj.episodes;
    delete obj.watchonline;

    return {
        ...obj,
        hasDownload: availableResolutions.length > 0 || availableZipResolutions.length > 0 || safeEpisodes.length > 0,
        availableResolutions,
        availableZipResolutions,
        episodes: safeEpisodes,
    };
}
