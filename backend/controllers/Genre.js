import Movie from '../models/Post.js';
import { sanitizeMovieForPublic } from '../libs/sanitize.js';

const getGenreMovies = async (req, res, genreName) => {
    try {
        const moviesList = await Movie.find({ status: 'Publish', genre: genreName });

        if (!moviesList) {
            return res.status(404).json({ message: "No data found" });
        }

        const sanitized = moviesList.map(sanitizeMovieForPublic);
        res.status(200).json({ success: true, data: sanitized });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const Action = (req, res) => getGenreMovies(req, res, 'Action');
const Adventure = (req, res) => getGenreMovies(req, res, 'Adventure');
const Comedy = (req, res) => getGenreMovies(req, res, 'Comedy');
const Drama = (req, res) => getGenreMovies(req, res, 'Drama');
const Crime = (req, res) => getGenreMovies(req, res, 'Crime');
const Animation = (req, res) => getGenreMovies(req, res, 'Animation');
const Fantasy = (req, res) => getGenreMovies(req, res, 'Fantasy');
const Horror = (req, res) => getGenreMovies(req, res, 'Horror');
const Science_Fiction = (req, res) => getGenreMovies(req, res, 'Science Fiction');
const Romance = (req, res) => getGenreMovies(req, res, 'Romance');
const Thriller = (req, res) => getGenreMovies(req, res, 'Thriller');

export { Action, Adventure, Comedy, Drama, Crime, Animation, Fantasy, Horror, Science_Fiction, Romance, Thriller };