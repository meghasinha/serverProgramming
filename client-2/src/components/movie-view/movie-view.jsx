
//importing required modules
import React from 'react';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import styles from './movie-view.scss';
import Container from 'react-bootstrap/Container';
import { Link } from "react-router-dom";

//export components
function MovieView(props)
{
  const { movies, movieId} = props;
  if (!movies || !movies.length) return null;
  const movie = movies.find(m => m._id == movieId);

  const handleMainView= (e) =>
    {
      window.open('/');
    };

  return (
    <div>
      <img src={require('../../movie_logo.svg')}  className= "logo" width="100" height="50"/>
      <Container>
      <Row className="movie-view">
       <Col md={8}>
       <Card>
       <Card.Img variant="top" src={process.env.PUBLIC_URL + "/images/" + movie.ImagePath} />
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>{movie.Description}</Card.Text>
            <div className="label h6">Genre: {movie.Genre.Name}</div>
            <div className="label h6">Director: {movie.Director.Name}</div>
            <Link to={`/directors/${movie.Director.Name}`}>
                <Button variant="link">Learn more</Button>
            </Link>
             <Link to={'/'}>
                <Button className="back-btn" variant="link" type="button" onClick={handleMainView}>
                  BACK</Button>
                  </Link>
          </Card.Body>
      </Card>
      </Col>
      </Row>
    </Container>

    </div>
  );
 }

export default connect(({movies}) => ({movies}))(MovieView);
