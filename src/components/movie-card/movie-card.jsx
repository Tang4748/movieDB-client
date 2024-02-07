import PropTypes from "prop-types";
import "./movie-card.scss";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BookmarkHeart, BookmarkHeartFill } from "react-bootstrap-icons";
import inceptionImage from "../../img/inception.jpg"; // Import the images
import theMatrixImage from "../../img/TheMatrix.jpg"; 

export const MovieCard = ({ movie, addFav, removeFav, isFavorite }) => {
  // Map the image paths to corresponding imported images
  const imageMap = {
    "inception.png": inceptionImage,
    "matrix.png": theMatrixImage,
    // Add more mappings as needed
  };
  return (
    <Card className="h-100 mt-5 card-shadow">
      <div className="position-relative .d-inline-block">
        {/* Use the imported image based on the movie's ImagePath */}
        <Card.Img variant="top card-img" src={imageMap[movie.ImagePath]} />
        <div>
          {isFavorite ? (
            <BookmarkHeartFill
              size={40}
              color="orange"
              className="fav-button mt-2 me-2 top-0 end-0"
              onClick={() => removeFav(movie._id)}
            />
          ) : (
            <BookmarkHeart
              size={40}
              color="orange"
              className="fav-button mt-2 me-2 top-0 end-0"
              onClick={() => addFav(movie._id)}
            />
          )}
        </div>
      </div>
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Director.Name}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button variant="link">Open</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

// define all the props constraints for the MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
  }).isRequired,
};