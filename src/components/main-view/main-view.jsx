import { useEffect, useState } from 'react'; // Import statement for useState
import { MovieCard } from '../movie-card/movie-card'; // Import statement for MovieCard
import { MovieView } from '../movie-view/movie-view'; // Import statement for MovieView
import Row from "react-bootstrap/Row"; // Import statement for Row from react-bootstrap
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import Col from "react-bootstrap/Col"; // Import statement for Col from react-bootstrap

export const MainView = () => { // MainView component
    const [movies, setMovies] = useState([]); //useState hook to store the state of the list of movies
    const [selectedMovie, setSelectedMovie] = useState(null); //useState hook to store the state of the selected movie
    const [user, setUser] = useState(null); //useState hook to store the state of the user

    useEffect(() => { //useEffect hook to retrieve the list of movies when the component is mounted
        fetch('https://themovieapi.herokuapp.com/movies') //fetches the list of movies from the API
            .then((response) => response.json()) //converts the response to JSON format
            .then((data) => { //stores the data in a state
                
                //maps over the list
                const moviesFromApi = data.map((movie) => { //maps over the list
                
                //returns a list of objects with the properties listed below
                return {
                    _id: movie._id, //movie._id prop
                    Title: movie.Title, //movie.Title prop
                    Description: movie.Description, //movie.Description prop
                    Genre: {
                        Name: movie.Genre.Name, //movie.Genre.Name prop
                        Description: movie.Genre.Description //movie.Genre.Description prop
                    },
                    Director: { //movie.Director prop
                        Name: movie.Director.Name, //movie.Director.Name prop
                        Bio: movie.Director.Bio, //movie.Director.Bio prop
                    },
                    ImagePath: movie.ImagePath, //movie.ImagePath prop
                    Featured: movie.Featured //movie.Featured prop
                };
                })
                setMovies(moviesFromApi); //sets the state of the list of movies
            })
            .catch((error) => { //logs any errors
                console.log('Error retrieving movies:', error); //logs any errors
            });
    }, []);

    return (
        <Row className="justify-content-md-center">
            {!user ? (
                <Col md={5}>
                <LoginView onLoggedIn={(user) => setUser(user)} />
                <br />
                <SignupView />
                </Col>
            ) : selectedMovie ? (
                <Col md={8}>
                <MovieView
                    movie={selectedMovie}
                    onBackClick={() => setSelectedMovie(null)}
                />
                </Col>
            ) : movies.length === 0 ? (
                <div>The list is empty!</div>
            ) : (
                <>
                    {movies.map((movie) => (
                        <Col className="mb-5" key={movie.id} md={3}>
                            <MovieCard
                                movie={movie}
                                onMovieClick={(newSelectedMovie) => {
                                    setSelectedMovie(newSelectedMovie);
                                }}
                            />
                        </Col>
                    ))}
                </>
            )}
        </Row>
    );
};