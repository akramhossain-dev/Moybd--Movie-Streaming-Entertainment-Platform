import express from 'express';
import { Dashboard, Users, DeleteUser, UpdateRole, movies, DraftMovies, latestMovies , PublicMovies, movie , Series , Bollywood , Hollywood, South, Marvel_Studio, Gujarati, TV_Shows, Web_Series , Anime, Search} from '../controllers/Dashboard.js';
import { verifyToken, verifyAdmin } from '../middleware/auth.js';

const Dashboardouter = express.Router();

Dashboardouter.get('/', verifyToken, verifyAdmin, Dashboard);
Dashboardouter.get('/users', verifyToken, verifyAdmin, Users);
Dashboardouter.delete('/users/:id', verifyToken, verifyAdmin, DeleteUser);
Dashboardouter.put('/users/:id', verifyToken, verifyAdmin, UpdateRole);

Dashboardouter.get('/search', Search);
Dashboardouter.get('/movies', movies);
Dashboardouter.get('/publicmovies', PublicMovies);
Dashboardouter.get('/draftmovies', verifyToken, verifyAdmin, DraftMovies);
Dashboardouter.get('/latestmovies', latestMovies);
Dashboardouter.get('/movie', movie);
Dashboardouter.get('/series', Series);
Dashboardouter.get('/bollywood', Bollywood);
Dashboardouter.get('/hollywood', Hollywood);
Dashboardouter.get('/south', South);
Dashboardouter.get('/marvelstudio', Marvel_Studio);
Dashboardouter.get('/gujarati', Gujarati);
Dashboardouter.get('/tvshows', TV_Shows);
Dashboardouter.get('/webseries', Web_Series);
Dashboardouter.get('/anime', Anime);

export default Dashboardouter;
