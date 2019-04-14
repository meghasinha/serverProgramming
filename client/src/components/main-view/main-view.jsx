//importing equired modules
import React from 'react';
import axios from 'axios';
import{ MovieCard } from '../movie-card/movie-card';
import{ MovieView } from '../movie-view/movie-view';
import{LoginView} from '../login-view/login-view';
import{RegistrationView} from '../registration-view/registration-view';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

//export components
 export class MainView extends React.Component{

   constructor(){
    super();
    this.state ={
      movies: null,
      selectedMovie: null,
      user:null,
      newuser:null
    };
  }

   componentDidMount(){
    axios.get('https://mymovieflix.herokuapp.com/movies')
    .then(response=>{
      this.setState({
       movies:response.data
      });
    }).catch(function(error)
    {
      console.log("error");
    });
   }
//go to movie view
   onMovieClick(movie){
    this.setState({
      selectedMovie: movie
    });
  }
//returning back to main view
  getMainView(){
    this.setState({
      selectedMovie: null
    });
  }

 onLoggedIn(user){
   this.setState({
     user
   });
  }

  onRegisterIn(newuser){
     this.setState({
       newuser: (newuser + 1)
     });
   }

  render(){

  const{ movies, selectedMovie,  user, newuser } = this.state;
  const{ onRegisterIn } = this.props;

  if(newuser) return <RegistrationView/>;

  if(!user) return(
  <div className="main-view">
    <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>
    <div className="form-group">
      <p> Not Registered Yet, Please Signup </p>
      <Button onClick={() => this.onRegisterIn(newuser)} variant="link">Signup</Button>
    </div>
  </div>
  );
  // Before the movies have been loaded
  if (!movies) return <div className="main-view"/>;
    return (
    <div className="main-view">
      // <button type="button" onClick={() => this.onRegisterIn(newuser)}>signin</button>
      { selectedMovie
        ? <MovieView movie={selectedMovie} onClick={button => this.getMainView()}/>
        : movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} onClick={movie => this.onMovieClick(movie)}/>
        ))
      }
    </div>
    );
  }
}
