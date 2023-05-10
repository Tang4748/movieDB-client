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