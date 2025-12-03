import { Button, Container } from 'react-bootstrap';
import { genres } from '../services/movieService';

const GenreList = ({ selectedGenres, onGenreSelect }) => {
  const handleGenreClick = (genreId) => {
    onGenreSelect(genreId);
  };

  return (
    <Container className="py-3">
      <div className="d-flex flex-wrap gap-2 justify-content-center">
        {genres.map((genre) => (
          <Button
            key={genre.id}
            variant={selectedGenres.includes(genre.id) ? "danger" : "warning"}
            className="genre-tag rounded-pill"
            onClick={() => handleGenreClick(genre.id)}
          >
            {genre.name}
          </Button>
        ))}
        {selectedGenres.length > 0 && (
          <Button
            variant="dark"
            className="rounded-pill"
            onClick={() => onGenreSelect('clear')}
          >
            Clear x
          </Button>
        )}
      </div>
    </Container>
  );
};

export default GenreList;