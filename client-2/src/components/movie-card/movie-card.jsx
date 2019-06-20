import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import './movie-card.scss';
let toggleClick = false;

export class MovieCard extends React.Component
{
  constructor(props) {
      super(props);
      this.state = {
        fav: props.favorite
        };
        this.toggleClass = this.toggleClass.bind(this);
      }
      componentDidUpdate(prevProps) {
        if (this.props.favorite !== prevProps.favorite) {
        this.setState({
        fav: this.props.favorite
      })
    }
  }
removeFromFavorites() {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    const movieId = this.props.movie._id
    axios
        .delete(`https://mymovieflix.herokuapp.com/users/${user}/movies/${movieId}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )
        .then(response => {
          console.log(response);
          this.setState({
            fav: false
          });
        })
        .catch(e => {
          console.log(e);
        });
  }


addToFavorites(movieId) {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token')
    axios
    .post(`https://mymovieflix.herokuapp.com/users/${user}/movies/${movieId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    .then(response => {
      console.log(response);
      this.setState({
        fav: true
      });
    })
    .catch(e => {
      console.log(e);
    });
}


toggleClass() {
   toggleClick = true;
   if (!this.state.fav) {
     this.addToFavorites(this.props.movie._id);
   } else {
     this.removeFromFavorites();
   }
}

  render()
{
const { movie} = this.props;
return (
  <Card style={{width:'16rem'}}>
    <Card.Img variant="top" src={process.env.PUBLIC_URL + "/images/" + movie.ImagePath}/>
    <Card.Body>
      <Card.Title>
        {movie.Title}
        <span
        onClick={() => this.toggleClass()}
        className={this.state.fav ? "favme active" : "favme"}  >
        &#x2605;
        </span>
      </Card.Title>
      <Card.Text>{movie.Description}</Card.Text>
      <Link to={`/movies/${movie._id}`}>
      <Button  variant="link">Open</Button>
      </Link>
    </Card.Body>
  </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string
  }).isRequired,
  onClick: PropTypes.func.isRequired
};
