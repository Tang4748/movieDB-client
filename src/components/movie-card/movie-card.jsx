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
        _id: PropTypes.string.isRequired, //id of movie in string format
        Title: PropTypes.string.isRequired, //title of movie in string format
        Description: PropTypes.string.isRequired, //description of movie in string format
        Genre: PropTypes.string.isRequired, //genre of movie in string format [NEEDT TO MAP THIS]
        Director: PropTypes.string.isRequired, //director of movie in object format
        ImagePath: PropTypes.string.isRequired, //image path of movie in string format
        Featured: PropTypes.bool.isRequired //featured status of movie in boolean format
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired //onMovieClick prop
};