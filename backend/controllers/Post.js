import Movie from "../models/Post.js";
import { encryptUrl } from "../libs/crypto.js";

function encryptDownloadObject(downloadlink) {
    if (!downloadlink || typeof downloadlink !== 'object') return {};
    const encryptedObj = {};
    for (const [res, url] of Object.entries(downloadlink)) {
        if (url && typeof url === 'string') {
            encryptedObj[res] = encryptUrl(url);
        } else {
            encryptedObj[res] = '';
        }
    }
    return encryptedObj;
}

function encryptEpisodesArray(episodes) {
    if (!Array.isArray(episodes)) return [];
    return episodes.map((ep) => ({
        ...ep,
        downloadlink: encryptDownloadObject(ep.downloadlink),
        watchonline: ep.watchonline ? encryptUrl(ep.watchonline) : '',
    }));
}

const NewPost = async (req, res) => {
    try {
        const {
            title, slug, bgposter, smposter, titlecategory, description,
            rating, duration, year, genre, language, subtitle, size,
            quality, youtubelink, category, watchonline, downloadlink,
            episodes, zipDownloadLink, status
        } = req.body;

        const newMovie = new Movie({
            title,
            slug,
            bgposter,
            smposter,
            titlecategory,
            description,
            rating,
            duration,
            year,
            genre,
            language,
            subtitle,
            size,
            quality,
            youtubelink,
            category,
            watchonline: encryptUrl(watchonline),
            downloadlink: encryptDownloadObject(downloadlink),
            episodes: encryptEpisodesArray(episodes),
            zipDownloadLink: encryptDownloadObject(zipDownloadLink),
            status
        });

        await newMovie.save();

        res.status(200).json({ success: true, message: 'Movie/Series posted successfully', movie: newMovie });

    } catch (error) {
        console.error('Error during post movie/series:', error);
        res.status(500).json({ error: 'Error during post movie/series' });
    }
};

const GetPost = async (req, res) => {
    try{
        const movie = await Movie.findById(req.params.id);
        res.status(200).json({ success: true, movie: movie });
    }
    catch(error){
        console.error('Error during get movie', error);
        res.status(500).json({ error: 'Error during get movie' });
    }
};

const UpdatePost = async (req, res) => {
    try {
        const {
            title, slug, bgposter, smposter, titlecategory, description,
            rating, duration, year, genre, language, subtitle, size,
            quality, youtubelink, category, watchonline, downloadlink,
            episodes, zipDownloadLink, status
        } = req.body;

        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({ success: false, message: 'Movie not found' });
        }

        Object.assign(movie, {
            title,
            slug,
            bgposter,
            smposter,
            titlecategory,
            description,
            rating,
            duration,
            year,
            genre,
            language,
            subtitle,
            size,
            quality,
            youtubelink,
            category,
            watchonline: watchonline ? encryptUrl(watchonline) : movie.watchonline,
            downloadlink: downloadlink ? encryptDownloadObject(downloadlink) : movie.downloadlink,
            episodes: episodes ? encryptEpisodesArray(episodes) : movie.episodes,
            zipDownloadLink: zipDownloadLink ? encryptDownloadObject(zipDownloadLink) : movie.zipDownloadLink,
            status
        });

        await movie.save();

        res.status(200).json({ success: true, message: 'Movie/Series updated successfully', movie });
    } catch (error) {
        console.error('Error during update movie', error);
        res.status(500).json({ success: false, message: 'Server error during movie update' });
    }
};

const deletePost = async (req, res) => {
    try{
        const movie = await Movie.findById(req.params.id);

        if(!movie){
            return res.status(404).json({ success: false, message: 'Movie not found' });
        }

        await Movie.deleteOne({ _id: req.params.id });

        res.status(200).json({ success: true, message: 'Movie deleted successfully' });
    }
    catch(error){
        console.error('Error during delete movie', error);
        res.status(500).json({ error: 'Error during delete movie' });
    }
};

export { NewPost, GetPost, UpdatePost, deletePost };