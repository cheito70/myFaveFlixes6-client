import React from 'react';
import axios from 'axios';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import { Navbar, Nav, Container, Row, Col} from 'react-bootstrap';


import './main-view.scss';

export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null,
            registered: true
        };
    }

    componentDidMount(){
        axios.get('https://myfaveflixes.herokuapp.com/movies')
        .then(response => {
            this.setState({
                movies: response.data
            });
        })
        .catch(error =>{
            console.log(error);
        });
    }

setSelectedMovie(movie) {
    this.setState({
        selectedMovie: movie
    });
}

//Function updates 'user' property in state to particular user if logged in properly
onLoggedIn(user) {
    this.setState({
        user
    });
}
toRegister(registered) {
    this.setState({
        registered
    });
}

    render() {
        const { movies, selectedMovie, user, registered } = this.state;

        /* If there is no user, the LoginView is rendered. If there is a user logged in, 
        the user details are *passed as a prop to the LoginView*/
        if (!registered) return <RegistrationView />;

        // If there is no user, the LoginView is rendered.
        //If user us logged in, user details are passed as a prop to lgin view
        if (!user)
            return (
                <LoginView
                onLoggedIn={(user) => this.onLoggedIn(user)}
                toRegister={(registered) => this.toRegister(registered)}
                />
            );
        //if ( selectedMovie ) return <MovieView movie={selectedMovie} />;
            
        if(movies.length === 0) return <div className="main-view" />;
    
        return (

            <Row className="main-view justify-content-md-center">
            {selectedMovie  
                ? (
                  <Col md={8}> 
                    <MovieView
                   movie={selectedMovie}
                   onBackClick={newSelectedMovie => {
                     this.setSelectedMovie(newSelectedMovie);
                   }}/>
                   </Col>
               )
                : movies.map(movie => (
                        <Col md={3}>
                        <MovieCard className="movieCard"
                     key={movie._id}
                     movie={movie}
                     onMovieClick={(newSelectedMovie) => {
                       this.setSelectedMovie(newSelectedMovie); }}/>
                        </Col>
                     ))
                    }
                 </Row>

            
              );
    }

}

