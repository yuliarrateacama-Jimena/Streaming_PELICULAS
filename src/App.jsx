/*import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

///

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
*/


import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useMovies, useMovieSearch } from './hooks/useMovies';
import NavBar from './components/NavBar';
import GenreList from './components/GenreList';
import MovieCard from './components/MovieCard';
import MoviePagination from './components/MoviePagination';

function App() {
  const [page, setPage] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const {
    data: movieData,
    isLoading: isLoadingMovies,
    isError: isMoviesError
  } = useMovies(page, selectedGenres);

  const {
    data: searchData,
    isLoading: isLoadingSearch,
    isError: isSearchError
  } = useMovieSearch(searchQuery, page);

  const handleGenreSelect = (genreId) => {
    if (genreId === 'clear') {
      setSelectedGenres([]);
      return;
    }
    
    setSelectedGenres(prev => {
      if (prev.includes(genreId)) {
        return prev.filter(id => id !== genreId);
      }
      return [...prev, genreId];
    });
    setPage(1);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedGenres([]);
    setPage(1);
  };

  const currentData = searchQuery ? searchData : movieData;
  const isLoading = isLoadingMovies || isLoadingSearch;
  const isError = isMoviesError || isSearchError;

  if (isLoading) {
    return <div className="text-center text-white mt-5">Loading...</div>;
  }

  if (isError) {
    return <div className="text-center text-white mt-5">Error loading movies...</div>;
  }

  return (
    <div className="min-vh-100">
      <NavBar onSearch={handleSearch} />
      <GenreList
        selectedGenres={selectedGenres}
        onGenreSelect={handleGenreSelect}
      />
      
      <Container>
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {currentData?.results.map(movie => (
            <Col key={movie.id}>
              <MovieCard movie={movie} />
            </Col>
          ))}
        </Row>

        {currentData?.total_pages > 1 && (
          <MoviePagination
            currentPage={page}
            totalPages={currentData.total_pages}
            onPageChange={setPage}
          />
        )}
      </Container>
    </div>
  );
}

export default App;
