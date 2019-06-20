//importing equired modules
import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
// import react router
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import { setMovies ,setUser } from '../../actions/actions';
import styles from './main-view.scss';
import MovieView  from '../movie-view/movie-view';
import{LoginView} from '../login-view/login-view';
import MoviesList from '../movies-list/movies-list';
import{RegistrationView} from '../registration-view/registration-view';

import ProfileView  from "../profile-view/profile-view";
import DirectorView from '../director-view/director-view';
import{UpdateView} from '../profile-view/update-view'
import GenreView from '../genre-view/genre-view';
import Button from 'react-bootstrap/Button';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

//export components
class MainView extends React.Component
{
  constructor()
  {
    super();
    this.state =
    {
      token:null,
      user:null,
       userInfo: {}
    };
  }

  componentDidMount()
  {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null)
    {
      let user=localStorage.getItem('user')
      this.setState({
      user: user
      });
      this.getMovies(accessToken);
      this.getUser(user,accessToken);
    }
  }

  onLoggedIn(authData)
  {
    console.log(authData.user.Username);
    this.setState({
      user: authData.user.Username
      });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getUser(authData.user.Username,authData.token);
    this.getMovies(authData.token);
  }

  updateUser(data) {
      this.setState({
        userInfo: data
      });
      localStorage.setItem('user', data.Username);
  }


  addToFavorites(movie) {
    //https://stackoverflow.com/questions/43040721/how-to-update-nested-state-properties-in-react
    let favorites = this.state.userInfo.Movies;
    if (favorites.indexOf(movie) < 0) {
      favorites.push(movie);
    }

    let userInfo = {...this.state.userInfo};
    userInfo.Movies = favorites;
this.setState({userInfo});
}

  removeFromFavorites(movieId) {
      let currFavorites = this.state.userInfo.Movies;
    let favorites = currFavorites.filter(mId => {
      return mId !== movieId
    });
    let userInfo = {...this.state.userInfo};
    userInfo.Movies = favorites;
this.setState({userInfo});
}
  getMovies(token)
  {
    axios.get('https://mymovieflix.herokuapp.com/movies',
    {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response =>
    {
      // Assign the result to the state
      this.props.setMovies(response.data);
    })
    .catch(function (error)
    {
      console.log(error);
    });
  }

  getUser(user, token)
  {
    axios.get("https://mymovieflix.herokuapp.com/users/",
    {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response =>
    {
      this.props.setUser(response.data);
      this.setState({
      token: token
      });
      localStorage.setItem('token', token);
      console.log(response.data);
    })
    .catch(function (error)
    {
      console.log(error);
    });
  }

  logOut()
  {
    localStorage.clear();
    window.open('/');
    this.setState({
      user: null,
      token: null
    });
  }

  onRegisterIn(profile)
  {
    this.setState({
      profile: (profile + 1)
    });
  }

  render()
  {
  const{ movies, user} = this.state;
  const{ logOut,getMainView } = this.props;

  return (
  <Router>
    <div className="main-view"/>
    <Route exact path="/" render={() =>  { if (!user) return <LoginView onLoggedIn={currentUser => this.onLoggedIn(currentUser)} />;
    return (
      <div>
        <img src={require('../../movie_logo.svg')}  className= "logo" width="100" height="50"/>
        <div>
          <Button className="logOut" onClick={() => this.logOut()} variant="link">Logout</Button>
        </div>
        <Link to={`/users/${user}`}>
        <Button  className="profile" variant="Primary">Profile</Button>
        </Link>
        <div>
          <MoviesList
          addToFavorites={this.addToFavorites}
          removeFromFavorites={this.removeFromFavorites}
          />
        </div>
      </div>
      );}
    }/>

    <Route path="/register" render={() => <RegistrationView />} />

    <Route path="/movies/:id" render={({match}) => <MovieView movieId={match.params.id}/>}/>

    <Route  path="/directors/:name" render={({ match }) =>
    <DirectorView directorName={match.params.name} />}/>

    <Route path="/users/:username" render={({ match }) => {
      return (
          <div>
            <ProfileView userProfile={user}/>
          </div>
      );
    }}/>

    <Route path="/users/update/:username" render={({ match }) => {
    return <UpdateView/>}}/>
    </Router>
    );
  }
  }
export default connect(null, { setMovies,setUser } )(MainView);
