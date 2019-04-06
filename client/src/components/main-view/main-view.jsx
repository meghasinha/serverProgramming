//importing equired modules
import React from 'react';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

//export components
 export class MainView extends React.Component{
   constructor() {
    super();
    this.state = {
      movies: null,
      selectedMovie: null
    };
  }

   componentDidMount(){
     axios.get('https://mymovieflix.herokuapp.com/movies')
     .then(response=> {
       this.setState({
         movies:response.data
       });
     }).catch(function(error)
     {
       console.log("error");
     });
   }
//go to movie view
   onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }
//returning back to main view
  getMainView() {
    this.setState({
      selectedMovie: null
    });
  }

  render() {
      const { movies, selectedMovie} = this.state;

      // Before the movies have been loaded
      if (!movies) return <div className="main-view"/>;

      return (
       <div className="main-view">
        {selectedMovie
           ? <MovieView movie={selectedMovie} onClick={button => this.getMainView()}/>
           : movies.map(movie => (
             <MovieCard key={movie.id} movie={movie} onClick={movie => this.onMovieClick(movie)}/>
           ))
        }
       </div>
      );
    }
  }
