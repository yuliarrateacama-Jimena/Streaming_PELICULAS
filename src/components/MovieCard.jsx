import { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import { IMG_URL } from '../services/movieService';
import { useMovieVideos } from '../hooks/useMovies';

const MovieCard = ({ movie }) => {
  const [showModal, setShowModal] = useState(false);
  const { data: videoData } = useMovieVideos(showModal ? movie.id : null);

  const getColor = (vote) => {
    if (vote >= 8) return 'success';
    if (vote >= 5) return 'warning';
    return 'danger';
  };

  const videos = videoData?.results?.filter(video => video.site === 'YouTube') || [];

  return (
    <>
      <Card className="h-100 movie-card">
        <Card.Img 
          variant="top" 
          src={movie.poster_path ? `${IMG_URL}${movie.poster_path}` : 'http://via.placeholder.com/1080x1580'} 
          alt={movie.title}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title className="d-flex justify-content-between align-items-center">
            {movie.title}
            <span className={`badge bg-${getColor(movie.vote_average)}`}>
              {movie.vote_average}
            </span>
          </Card.Title>
          <Card.Text className="movie-overview flex-grow-1">
            {movie.overview}
          </Card.Text>
          <Button 
            variant="primary" 
            onClick={() => setShowModal(true)}
            className="mt-auto"
          >
            Know More
          </Button>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{movie.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {videos.length > 0 ? (
            <div className="ratio ratio-16x9">
              <iframe
                src={`https://www.youtube.com/embed/${videos[0].key}`}
                title={videos[0].name}
                allowFullScreen
              />
            </div>
          ) : (
            <p>No videos available</p>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MovieCard;