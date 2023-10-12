import PropTypes from 'prop-types'; //import statement for PropTypes

export const MovieCard = ({ movie, onMovieClick }) => { //MovieCard component
    return (
        <div
        onClick={() => { //onClick event handler
            onMovieClick(movie); //onMovieClick prop
        }}
        >
            {movie.Title}
        </div>
    );
};

//here is where we define all the props constraints for the MovieCard component
MovieCard.propTypes = {
    movie: PropTypes.shape({
      _id: PropTypes.string.isRequired, // id of movie in string format
      Title: PropTypes.string.isRequired, // title of movie in string format
      Description: PropTypes.string.isRequired, // description of movie in string format
      Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired, // name of the genre in string format
        Description: PropTypes.string.isRequired, // description of the genre in string format
      }).isRequired,
      Director: PropTypes.shape({
        Name: PropTypes.string.isRequired, // name of the director in string format
        Bio: PropTypes.string.isRequired, // bio of the director in string format
        Birth: PropTypes.string.isRequired, // birth year of the director in string format
        Death: PropTypes.string, // death year of the director in string format
      }).isRequired,
      Actors: PropTypes.array.isRequired, // an array of actors (you can specify actor PropTypes if needed)
      ImagePath: PropTypes.string.isRequired, // image path of movie in string format
      Featured: PropTypes.bool.isRequired, // featured status of movie in boolean format
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired, // onMovieClick prop
  };