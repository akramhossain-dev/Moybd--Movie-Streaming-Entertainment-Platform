import dotenv from 'dotenv';
import connectDB from '../libs/db.js';
import Movie from '../models/Post.js';
import { encryptUrl } from '../libs/crypto.js';

dotenv.config();

async function runMigration() {
  console.log('🚀 Starting Download URLs Encryption Migration...');
  await connectDB();

  try {
    const movies = await Movie.find();
    console.log(`Found ${movies.length} catalog items to inspect.`);

    let migratedCount = 0;

    for (const movie of movies) {
      let isModified = false;

      // 1. Check Movie Download Links
      if (movie.downloadlink && typeof movie.downloadlink === 'object') {
        for (const [res, url] of Object.entries(movie.downloadlink)) {
          if (url && typeof url === 'string' && !url.startsWith('gcm:')) {
            movie.downloadlink[res] = encryptUrl(url);
            isModified = true;
          }
        }
      }

      // 2. Check Zip Download Links
      if (movie.zipDownloadLink && typeof movie.zipDownloadLink === 'object') {
        for (const [res, url] of Object.entries(movie.zipDownloadLink)) {
          if (url && typeof url === 'string' && !url.startsWith('gcm:')) {
            movie.zipDownloadLink[res] = encryptUrl(url);
            isModified = true;
          }
        }
      }

      // 3. Check Episodes Download Links
      if (Array.isArray(movie.episodes)) {
        movie.episodes.forEach((ep) => {
          if (ep.downloadlink && typeof ep.downloadlink === 'object') {
            for (const [res, url] of Object.entries(ep.downloadlink)) {
              if (url && typeof url === 'string' && !url.startsWith('gcm:')) {
                ep.downloadlink[res] = encryptUrl(url);
                isModified = true;
              }
            }
          }
          if (ep.watchonline && typeof ep.watchonline === 'string' && !ep.watchonline.startsWith('gcm:')) {
            ep.watchonline = encryptUrl(ep.watchonline);
            isModified = true;
          }
        });
      }

      // 4. Check Watch Online link
      if (movie.watchonline && typeof movie.watchonline === 'string' && !movie.watchonline.startsWith('gcm:')) {
        movie.watchonline = encryptUrl(movie.watchonline);
        isModified = true;
      }

      if (isModified) {
        movie.markModified('downloadlink');
        movie.markModified('zipDownloadLink');
        movie.markModified('episodes');
        await movie.save();
        migratedCount++;
        console.log(`✅ Encrypted download URLs for "${movie.title}" (${movie._id})`);
      }
    }

    console.log(`🎉 Migration Completed Successfully! Total records encrypted/updated: ${migratedCount}`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration Error:', error);
    process.exit(1);
  }
}

runMigration();
