import { useQuery } from '@tanstack/react-query';
import { movieService } from '../services/movieService';

export const useMovies = (page = 1, selectedGenres = []) => {
  return useQuery({
    queryKey: ['movies', page, selectedGenres],
    queryFn: () => movieService.getMovies(page, selectedGenres),
    keepPreviousData: true,
  });
};

export const useMovieSearch = (query, page = 1) => {
  return useQuery({
    queryKey: ['movieSearch', query, page],
    queryFn: () => movieService.searchMovies(query, page),
    keepPreviousData: true,
    enabled: !!query,
  });
};

export const useMovieVideos = (movieId) => {
  return useQuery({
    queryKey: ['movieVideos', movieId],
    queryFn: () => movieService.getMovieVideos(movieId),
    enabled: !!movieId,
  });
};