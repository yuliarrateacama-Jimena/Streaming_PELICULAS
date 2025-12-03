import axios from 'axios';

const API_KEY = '1cf50e6248dc270629e802686245c2c8';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const movieService = {
  getMovies: async (page = 1, selectedGenres = []) => {
    const params = {
      sort_by: 'popularity.desc',
      page,
    };
    
    if (selectedGenres.length > 0) {
      params.with_genres = selectedGenres.join(',');
    }
    
    const response = await api.get('/discover/movie', { params });
    return response.data;
  },

  searchMovies: async (query, page = 1) => {
    const response = await api.get('/search/movie', {
      params: {
        query,
        page,
      },
    });
    return response.data;
  },

  getMovieVideos: async (movieId) => {
    const response = await api.get(`/movie/${movieId}/videos`);
    return response.data;
  },
};

export const genres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" }
];

export { IMG_URL };