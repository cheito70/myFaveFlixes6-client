import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Image } from "react-bootstrap";

import "./movie-card.scss";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Link, Route } from "react-router-dom";

export class MovieCard extends React.Component {
    render() {
        const { movie, setSelectedMovie } = this.props;

        //return <div className="movie-card" onClick={() => onMovieClick(movie)}>{movie.Title}</div>;
        return (
            <Card className="movie-card m-2">
                <Card.Img variant="top" src={movie.ImagePath} />
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>{movie.Description}</Card.Text>
                </Card.Body>

                <Card.Footer className="card-footer m-1" >
                    <Link to={`/movies/${movie._id}`}>
                        <Button className="btn btn-success btn-sm float-left" variant="success">Open</Button>
                    </Link>
                    <Link to={`/directors/${movie.Director.Name}`}>
                        <Button className="btn btn-primary btn-sm" variant="primary">Director</Button>
                    </Link>
                    <Link to={`/genres/${movie.Genre.Name}`}>
                        <Button className="btn btn-primary btn-sm float-right" variant="primary">Genre</Button>
                    </Link>

                </Card.Footer>

            </Card>
        );
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({ 
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired
    }).isRequired,
       onMovieClick: PropTypes.func,
};