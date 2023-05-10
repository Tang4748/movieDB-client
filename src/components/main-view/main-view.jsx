import { useState } from 'react'; // Import statement for useState
import { MovieCard } from '../movie-card/movie-card'; // Import statement for MovieCard
import { MovieView } from '../movie-view/movie-view'; // Import statement for MovieView

export const MainView = () => { // MainView component
    const [movies, setMovies] = useState([
        {
            _id: ObjectId("640aa1004f793dc5e86d01c5"),
            Title: 'The Lord of the Rings: The Fellowship of the Ring',
            Description: 'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.',
            Genre: {
              Name: 'Fantasy',
              Description: 'The genre typically has no basis in scientific fact or speculation.'
            },
            Director: { Name: 'Peter Jackson' },
            ImagePath: 'LordofTheRings.png',
            Featured: true,
            Bio: 'Peter Jackson was born in 1961 in Pukerua Bay, Wellington, New Zealand, to Joan (Bee), a nurse, and William Bill Jackson, a commercial pilot. He is of English, Irish, Scottish, and Welsh descent.'
          },
          {
            _id: ObjectId("640aa14c4f793dc5e86d01c6"),
            Title: 'The Lord of the Rings: The Two Towers',
            Description: 'Gollum tracks Frodo and Sam as they set out to destroy the One Ring, while their Fellowship mates reunite with Gandalf and battle an evil legion.',
            Genre: {
              Name: 'Fantasy',
              Description: 'The genre typically has no basis in scientific fact or speculation.'
            },
            Director: { Name: 'Peter Jackson' },
            ImagePath: 'LordofTheRings.png',
            Featured: true,
            Bio: 'Peter Jackson was born in 1961 in Pukerua Bay, Wellington, New Zealand, to Joan (Bee), a nurse, and William Bill Jackson, a commercial pilot. He is of English, Irish, Scottish, and Welsh descent.'
          },
          {
            _id: ObjectId("640aa1ab4f793dc5e86d01c7"),
            Title: 'The Lord of the Rings: The Return of The King',
            Description: 'With Gollum as their guide, Frodo and Sam near Mordor and the end of their mission as Aragorn leads a battle against Sauron to save Gondor.',
            Genre: {
              Name: 'Fantasy',
              Description: 'The genre typically has no basis in scientific fact or speculation.'
            },
            Director: { Name: 'Peter Jackson' },
            ImagePath: 'LordofTheRings.png',
            Featured: true,
            Bio: 'Peter Jackson was born in 1961 in Pukerua Bay, Wellington, New Zealand, to Joan (Bee), a nurse, and William Bill Jackson, a commercial pilot. He is of English, Irish, Scottish, and Welsh descent.'
          },
          {
            _id: ObjectId("640aa2634f793dc5e86d01c8"),
            Title: 'Pulp Fiction',
            Description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
            Genre: {
              Name: 'Thriler',
              Description: 'Thriller is a broad genre of literature, film and television, having numerous subgenres. Thrillers are characterized and defined by the moods they elicit, giving viewers heightened feelings of suspense, excitement, surprise, anticipation and anxiety.'
            },
            Director: { Name: 'Quentin Tarantino' },
            ImagePath: 'Pulpfiction.png',
            Featured: true
          }
    ]); 

    const [selectedMovie, setSelectedMovie] = useState(null); //useState hook to store the state of the selected movie

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