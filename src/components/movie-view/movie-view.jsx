import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Button } from 'react-bootstrap';

import './movie-view.scss';


export class MovieView extends React.Component {

    render() {
        const { movie, onBackClick } = this.props;

        return (            
            <div md={8} className="movie-view">
                <Row>
                    <Col>
                <div className="movie-poster">
                    <img crossorigin="anonymous" src={movie.ImagePath} />
                </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                <div className="movie-title">
                    <span className="label">Title: </span>
                    <span className="value">{movie.Title}</span>
                </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                <div className="movie-description">
                    <span className="label">Description: </span>
                    <span className="value">{movie.Description}</span>
                </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                <div className="movie-genre">
                    <span className="label">Genre: </span>
                    <span className="value">{movie.Genre.Name}</span>
                </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                <div className="movie-director">
                    <span className="label">Director: </span>
                    <span className="value">{movie.Director.Name}</span>
                </div>
                    </Col>
                </Row>
                <Col>
                <Button onClick={() => { onBackClick(null); }}>Back</Button>        
                </Col>
            </div>
        );
    }
}

MovieView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired,
        }).isRequired,
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
            Birth: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    onBackClick: PropTypes.func.isRequired,
};