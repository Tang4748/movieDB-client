import { useEffect, useState } from 'react'; //Import statement for useState
import { MovieCard } from '../movie-card/movie-card'; //Import statement for MovieCard
import { MovieView } from '../movie-view/movie-view'; //Import statement for MovieView
import { LoginView } from '../login-view/login-view';//Import statement for LoginView
import { SignupView } from '../signup-view/signup-view'; //Import statement for SignupView

export const MainView = () => { // MainView component
    const storedUser = JSON.parse(localStorage.getItem('user')); //stores the user in localStorage
    const storedToken = localStorage.getItem('token'); //stores the token in localStorage
    const [movies, setMovies] = useState([]); //useState hook to store the state of the list of movies
    const [selectedMovie, setSelectedMovie] = useState(null); //useState hook to store the state of the selected movie
    const [user, setUser] = useState(storedUser? storedUser : null); //useState hook to store the state of the user
    const [token, setToken] = useState(storedToken? storedToken : null); //useState hook to store the state of the token

    useEffect(() => { //useEffect hook to retrieve the list of movies when the component is mounted
        if (!token) //if the token is false, returns
            return;
        
        fetch("https://myflixdb2-49f7e3987c2e.herokuapp.com/movies", { //fetches the list of movies from the API
            headers: { Authorization: `Bearer ${token}` }//passes the token to the API call
        })
            .then((response) => { 
                if ( response.ok ) { 
                    return response.json(); //returns the response as JSON if the response is ok
                }
                else {
                    throw Error(response.statusText); //throws an error if the response is not ok
                }
            }) //converts the response to JSON format
            .then((data) => { 
                
                //maps over the list
                const moviesFromApi = data.map((movies) => { //maps over the list
                
                //returns a list of objects with the properties listed below
                return {
                    _id: movies._id, //movie._id prop
                    Title: movies.Title, //movie.Title prop
                    Description: movies.Description, //movie.Description prop
                    Genre: {
                        Name: movies.Genre.Name, //movie.Genre.Name prop
                        Description: movies.Genre.Description //movie.Genre.Description prop
                    },
                    Director: { //movie.Director prop
                        Name: movies.Director.Name, //movie.Director.Name prop
                        Bio: movies.Director.Bio, //movie.Director.Bio prop
                    },
                    ImagePath: movies.ImagePath, //movie.ImagePath prop
                    Featured: movies.Featured //movie.Featured prop
                };
                });
                
                setMovies(moviesFromApi); //setMovies prop
            })
            .catch((error) => { //logs any errors
                console.log('Error retrieving movies:', error); //logs any errors
            });
    }, [token]);

    if (!user) {
        return (
            <>
                <LoginView onLoggedIn={(user, token) => { //If the user is false, returns the LoginView component
                    setUser(user); //setUser prop
                    setToken(token); //setToken prop
                }} />
                or
                <SignupView />
            </>
        );
    }

    if (selectedMovie) {
        return <MovieView movie={selectedMovie} onBackClick={() => //If the selected movie is true, returns the MovieView component
            setSelectedMovie(null) //setSelectedMovie prop
            }
        />; //If the selected movie is true, returns the MovieView component
    }

    if (movies.length === 0) { //If the list of movies is empty, returns this message
        return <div className='main-view'>The list is empty!</div>; //If the list of movies is empty, returns this message
    }
    
    return (//Returns the list of movies
        <div>
            <button onClick={() => { //onClick event handler
                setUser(null); //setUser prop
                setToken(null); //setToken prop
                localStorage.clear(); //clears localStorage
            }}>
                Logout
            </button>

            {movies.map((movie) => { //Maps over the list of movies
                return <MovieCard 
                key={movie.id} //Key prop
                movie={movie} //Movie prop
                onMovieClick={(newSelectedMovie) => { //onMovieClick prop
                    setSelectedMovie(newSelectedMovie); //setSelectedMovie prop
                }}
                />;
            })}
        </div>
    );
};