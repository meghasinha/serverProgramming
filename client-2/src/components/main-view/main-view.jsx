//importing equired modules
import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import styles from './main-view.scss';
import{ MovieCard } from '../movie-card/movie-card';
import{ MovieView } from '../movie-view/movie-view';
import{LoginView} from '../login-view/login-view';
//import{FavouriteView} from '../favourite-view/favourite-view';
import{RegistrationView} from '../registration-view/registration-view';
import{ProfileView} from '../profile-view/profile-view';
import{DirectorView} from '../director-view/director-view';
import{UpdateView} from '../profile-view/update-view'
import{GenreView} from '../genre-view/genre-view';
import Button from 'react-bootstrap/Button';

//import{RegistrationView} from '../registration-view/registration-view';

//export components
 class MainView extends React.Component{

   constructor(){
    super();
    this.state ={
      movies: [],
      user:[],
      username: null

      };
  }

  componentDidMount() {

   let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        username: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
}


  onLoggedIn(authData) {
     console.log(authData.user.Username);

     this.setState({
      user: authData
      });
      localStorage.setItem('token', authData.token);
      localStorage.setItem('user', authData.user.Username);
      this.getMovies(authData.token);
    }

   getMovies(token) {
      axios.get('https://mymovieflix.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
        movies: response.data
    });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  logOut(){
    localStorage.clear();
    window.location.href = 'https://mymovieflix.herokuapp.com/';
  }


 onRegisterIn(profile){
  this.setState({
    profile: (profile + 1)
  });
}

render(){
    const{ movies, user} = this.state;
    const{ logOut } = this.props;
    if (!movies) return <div className="main-view"/>;
    return (
    <Router>
      <div className="main-view"/>
      <Route exact path="/" render={() =>  { if ( user.length === 0 ) return <LoginView onLoggedIn={currentUser => this.onLoggedIn(currentUser)} />;
      return (
        <div>
        <div>
          <Button className="logOut" onClick={() => this.logOut()} variant="link">Logout</Button>
        </div>
          <Link to={`/users/${user.user.Username}`}>
            <Button  className="profile" variant="Primary">Profile</Button>
          </Link>

          <div>
            <Route exact path="/" render={() => movies.map(m => <MovieCard key={m._id} movie={m}/>)}/>
          </div>
        </div>
        );}
        }/>

        <Route path="/register" render={() => <RegistrationView />} />

        <Route path="/movies/:movieId" render={({match}) => <MovieView movie={movies.find(m => m._id === match.params.movieId)}/>}/>

        <Route path="/genres/:name" render={({ match }) => {
          if (!movies || !movies.length) return <div className="main-view"/>;
          return <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre}/>}
        } />

        <Route path="/directors/:name" render={({ match }) => {
          if (!movies || !movies.length) return <div className="main-view"/>;
          return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director}/>}
        } />

        <Route path="/users/:username" render={({ match }) => {
          if ( user.length=== 0) return <div className="main-view"/>;
          return (
            <div>
              <Button className="logOut"onClick={() => this.logOut()} variant="link">Logout</Button>
              <div>
              <ProfileView userProfile={user.user}/>
              </div>
            </div>
          );} }/>

          <Route path="/users/update/:username" render={({ match }) => {
          if (user.length === 0) return <div className="main-view"/>;
          return <UpdateView/>} }/>
          
      </Router>
    );
  }
}
export default MainView;
