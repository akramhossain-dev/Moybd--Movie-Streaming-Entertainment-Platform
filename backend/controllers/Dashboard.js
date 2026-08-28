import User from '../models/user.js';
import Comment from '../models/Comments.js';
import Movie from '../models/Post.js';
import { sanitizeMovieForPublic } from '../libs/sanitize.js';

const Dashboard = async (req, res) => {
    try {
        const MovieCount = await Movie.countDocuments();
        const commentCount = await Comment.countDocuments();
        const userCount = await User.countDocuments();
        const publicMovieCount = await Movie.countDocuments({ status: 'Publish' });
        const draftMovieCount = await Movie.countDocuments({ status: 'Draft' });

        res.status(200).json({
            success: true,
            data: {
                MovieCount,
                commentCount,
                userCount,
                publicMovieCount,
                draftMovieCount
            }
        });

    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const Users = async (req, res) => {
    try {
        const users = await User.find().select('-password');

        if (!users) {
            return res.status(404).json({ message: "No data found" });
        }

        res.status(200).json({ success: true, data: users });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const DeleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role === 'admin') {
            return res.status(401).json({ message: "You cannot delete an admin" });
        }

        await User.deleteOne({ _id: userId });
        res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const UpdateRole = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role === 'admin') {
            user.role = 'user';
        } else if (user.role === 'user') {
            user.role = 'admin';
        }

        await user.save();

        res.status(200).json({ success: true, message: "User role updated successfully", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const movies = async (req, res) => {
    try {
        const moviesList = await Movie.find();
        if (!moviesList) {
            return res.status(404).json({ message: "No data found" });
        }

        const sanitized = moviesList.map(sanitizeMovieForPublic);
        res.status(200).json({ success: true, data: sanitized });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const PublicMovies = async (req, res) => {
    try {
        const publicMovies = await Movie.find({ status: 'Publish' });
        if (!publicMovies) {
            return res.status(404).json({ message: "No data found" });
        }

        const sanitized = publicMovies.map(sanitizeMovieForPublic);
        res.status(200).json({ success: true, data: sanitized });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const DraftMovies = async (req, res) => {
    try {
        const DraftMovies = await Movie.find({ status: 'Draft' });
        if (!DraftMovies) {
            return res.status(404).json({ message: "No data found" });
        }

        const sanitized = DraftMovies.map(sanitizeMovieForPublic);
        res.status(200).json({ success: true, data: sanitized });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const movie = async (req, res) => {
    try {
        const movie = await Movie.find({status: 'Publish' , titlecategory: 'Movies' });
        if (!movie) {
            return res.status(404).json({ message: "No data found" });
        }

        const sanitized = movie.map(sanitizeMovieForPublic);
        res.status(200).json({ success: true, data: sanitized });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const Series = async (req, res) => {
    try {
        const series = await Movie.find({status: 'Publish' , titlecategory: 'Series' });
        if (!series) {
            return res.status(404).json({ message: "No data found" });
        }

        const sanitized = series.map(sanitizeMovieForPublic);
        res.status(200).json({ success: true, data: sanitized });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const Bollywood = async (req, res) => {
    try {
        const bollywood = await Movie.find({status: 'Publish' , category: 'Bollywood' });
        if (!bollywood) {
            return res.status(404).json({ message: "No data found" });
        }

        const sanitized = bollywood.map(sanitizeMovieForPublic);
        res.status(200).json({ success: true, data: sanitized });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const Hollywood = async (req, res) => {
    try {
        const hollywood = await Movie.find({status: 'Publish' , category: 'Hollywood' });
        if (!hollywood) {
            return res.status(404).json({ message: "No data found" });
        }

        const sanitized = hollywood.map(sanitizeMovieForPublic);
        res.status(200).json({ success: true, data: sanitized });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const South = async (req, res) => {
    try {
        const south = await Movie.find({status: 'Publish' , category: 'South' });
        if (!south) {
            return res.status(404).json({ message: "No data found" });
        }

        const sanitized = south.map(sanitizeMovieForPublic);
        res.status(200).json({ success: true, data: sanitized });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const Marvel_Studio = async (req, res) => {
    try {
        const marvel_studio = await Movie.find({status: 'Publish' , category: 'Marvel Studio' });
        if (!marvel_studio) {
            return res.status(404).json({ message: "No data found" });
        }

        const sanitized = marvel_studio.map(sanitizeMovieForPublic);
        res.status(200).json({ success: true, data: sanitized });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const Gujarati = async (req, res) => {
    try {
        const gujarati = await Movie.find({status: 'Publish' , category: 'Gujarati' });
        if (!gujarati) {
            return res.status(404).json({ message: "No data found" });
        }

        const sanitized = gujarati.map(sanitizeMovieForPublic);
        res.status(200).json({ success: true, data: sanitized });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const TV_Shows = async (req, res) => {
    try {
        const tv_shows = await Movie.find({status: 'Publish' , category: 'TV Shows' });
        if (!tv_shows) {
            return res.status(404).json({ message: "No data found" });
        }

        const sanitized = tv_shows.map(sanitizeMovieForPublic);
        res.status(200).json({ success: true, data: sanitized });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const Web_Series = async (req, res) => {
    try {
        const web_series = await Movie.find({status: 'Publish' , category: 'Web Series' });
        if (!web_series) {
            return res.status(404).json({ message: "No data found" });
        }

        const sanitized = web_series.map(sanitizeMovieForPublic);
        res.status(200).json({ success: true, data: sanitized });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const Anime = async (req, res) => {
    try {
        const anime = await Movie.find({status: 'Publish' , category: 'Anime' });
        if (!anime) {
            return res.status(404).json({ message: "No data found" });
        }

        const sanitized = anime.map(sanitizeMovieForPublic);
        res.status(200).json({ success: true, data: sanitized });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const latestMovies = async (req, res) => {
    try {
        const latestMovies = await Movie.find().sort({ createdAt: -1 });
        if (!latestMovies) {
            return res.status(404).json({ message: "No data found" });
        }

        const sanitized = latestMovies.map(sanitizeMovieForPublic);
        res.status(200).json({ success: true, data: sanitized });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { Dashboard, Users, DeleteUser, UpdateRole, movies, PublicMovies, DraftMovies, latestMovies , movie, Series , Bollywood, Hollywood, South, Marvel_Studio, Gujarati, TV_Shows, Web_Series, Anime };