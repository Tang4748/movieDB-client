import { useEffect, useState } from 'react'; //Import statement for useState
import { MovieCard } from '../movie-card/movie-card'; //Import statement for MovieCard
import { MovieView } from '../movie-view/movie-view'; //Import statement for MovieView
import { LoginView } from '../login-view/login-view';//Import statement for LoginView
import { SignupView } from '../signup-view/signup-view'; //Import statement for SignupView
import {NavbarComponent} from '../nav-bar/nav-bar'; //Import statement for NavbarComponent
import './main-view.scss'; //Import statement for MainView styling


export const MainView = () => { // MainView component
    const storedUser = JSON.parse(localStorage.getItem('user')); //stores the user in localStorage
    const storedToken = localStorage.getItem('token'); //stores the token in localStorage
    const [movies, setMovies] = useState([]); //useState hook to store the state of the list of movies
    const [selectedMovie, setSelectedMovie] = useState(null); //useState hook to store the state of the selected movie
    const [user, setUser] = useState(storedUser? storedUser : null); //useState hook to store the state of the user
    const [token, setToken] = useState(storedToken? storedToken : null); //useState hook to store the state of the token

    useEffect(() => {
        //useEffect hook to retrieve the list of movies when the component is mounted
        if (!token)
          //if the token is false, returns
          return;
    
        fetch("https://myflixdb2-49f7e3987c2e.herokuapp.com/movies", {
          //fetches the list of movies from the API
          headers: { Authorization: `Bearer ${token}` }, //passes the token to the API call
        })
          .then((response) => {
            if (response.ok) {
              return response.json(); //returns the response as JSON if the response is ok
            } else {
              throw Error(response.statusText); //throws an error if the response is not ok
            }
          }) //converts the response to JSON format
          .then((data) => {
            setMovies(data); //setMovies prop
          })
          .catch((error) => {
            //logs any errors
            console.log("Error retrieving movies:", error); //logs any errors
          });
      }, [token]);

    if (!user) {
        return (
          <div>
            <NavbarComponent />
            {/* empty space at the top so navbar doesnt block content) */}
            <Row className="mt-5">
              <Col className="mt-5 col-12"></Col>
              <Col className="mt-5 col-12"></Col>
              <Col className="mt-5 col-12"></Col>
            </Row>
            <Container>
              <Row className="justify-content-md-center">
                <Col className="text-center fs-2 m-5">
                  Studio Ghibli Movies Archive
                </Col>
              </Row>
            </Container>
            <SignupView />
            <LoginView
              onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
              }}
            />
          </div>
        );
      }
      if (selectedMovie) {
        const similarMovies = movies.filter((otherMovie) => {
          return (
            otherMovie.genre.name === selectedMovie.genre.name &&
            otherMovie._id !== selectedMovie._id
          );
        });
    
        return (
          <>
            <NavbarComponent />
            <MovieView
              movie={selectedMovie}
              onBackClick={() => setSelectedMovie(null)}
            />
            <SimilarMovies
              movies={similarMovies}
              onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
              }}
            />
          </>
        );
      }
    
      return (
        <>
          <NavbarComponent />
          {/* empty space at the top of the page ( so navbar doesnt block content) */}
          <Row className="mt-5">
            <Col className="mt-5 col-12"></Col>
            <Col className="mt-5 col-12"></Col>
            <Col className="mt-5 col-12"></Col>
          </Row>
          <Row className="mb-5 justify-content-center">
            {movies.map((movie) => {
              return (
                <Col
                  key={movie._id}
                  className="mb-5 col-xl-3 col-lg-4 col-md-6 col-sm-12 card-size "
                >
                  <MovieCard
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                      setSelectedMovie(newSelectedMovie);
                    }}
                  />
                </Col>
              );
            })}
          </Row>
          <Button
            onClick={() => {
              setUser(null);
              setToken(null);
              localStorage.clear();
            }}
            className="m-3 text-align-center"
          >
            logout
          </Button>
        </>
      );
    };
    
    export default MainView;