import React from 'react';
import axios from 'axios';

import PropTypes from 'prop-types';

import { BrowserRouter as Router, Routes, Route, Redirect } from 'react-router-dom';

//Views
import RegistrationView from '../registration-view/registration-view';
import LoginView from '../login-view/login-view';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import ProfileView from '../profile-view/profile-view';
import DirectorView from "../director-view/director-view";
import GenreView from "../genre-view/genre-view";
import { NavBar } from '../navbar/navbar';

//Styles
import { Navbar, Nav, Container, Row, Col, Button} from 'react-bootstrap';
import './main-view.scss';

export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: [],
            favoriteMovies: [],
            selectedMovie: null,
            user: null,
            registered: null
        };
    }

    componentDidMount(){
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
    }

setSelectedMovie(movie) {
    this.setState({
        selectedMovie: movie,
    });
}

//Function updates 'user' property in state to particular user if logged in properly
onLoggedIn(authData) {
    console.log(authData);
    this.setState({
        user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
}

onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
        user: null
    });
}

getMovies(token) {
    axios.get ('https://myfaveflixes.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
        //Assign the result to the state
        this.setState({
            movies: response.data
        });
    })
    .catch(function (error) {
        console.log(error);
    });
}


onRegistration(registered) {
    this.setState({
        registered
    });
}

handleFavorite = (movieId, action) => {
    const { user, favoriteMovies } = this.state;
    const accessToken = localStorage.getItem('token');
    const username = user;
    if (accessToken !== null && username !== null) {
        //Add movieID to favorites (local state and server)
        if (action === 'add') {
            this.setState({ favoriteMovies: [...favoriteMovies, movieId] });
            axios.put(
                `https://myfaveflixes.herokuapp.com/users/${username}/movies/${movieID}`,
                {},
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            )
            .then((res) => {
                console.log(`Movie added to ${username} Favorite movies`);
                alert(`Movie added to ${username} Favorite movies`);
            })
            .catch((err) => {
                console.log(err);
            });

        } else if (action === 'remove') {
            this.setState({
                favoriteMovies: favoriteMovies.filter((id) => id !== movieID),
            });
            axios.delete(
                `https://myfaveflixes.herokuapp.com/users/${username}/movies/${movieID}`,
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            )
            .then((res) => {
                console.log(`Movie removed from ${username} Favorite Movies`);
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }
};

    render() {
        const { movies, user, favoriteMovies } = this.state;
        return (
            <Router>
             <NavBar user={user} />
               <Row className="main-view justify-content-md-center">
               <Routes>
                 <Route
                  exact
                  path='/'
                  element={<MainView />}
                  render={() => {
                    if (!user)
                     return (
                        <Col>
                        <LoginView
                         md={4}
                         onLoggedIn={(user) => this.onLoggedIn(user)}
                         />
                        </Col>
                     );
                     if (movies.length === 0) return <div className='main-view' />;
                     return movies.map((m) => (
                        <Col md={8} key={m._id}>
                         <MovieCard movie={m} />
                        </Col>
                     ));
                  }}
                  />

                <Route
                 path='/register'
                 render={() => {
                    console.log("Registering User");
                    if (user) return <Redirect to='/' />;
                    return (
                        <Col lg={8}>
                         <RegistrationView
                           onLoggedIn={(user) => this.onLoggedIn(user)}
                           />
                        </Col>
                    );
                 }}
                 />

             <Route
                 path={`/users/:username`}
                 render={({ history }) => {
                   if (!user) return <Redirect to="/" />;
                   return (
                     <Col>
                       <ProfileView
                         movies={movies}
                         goBack={history.goBack}
                         favoriteMovies={favoriteMovies || []}
                         handleFavorite={this.handleFavorite}
                       />
                     </Col>
                   );
                 }}
               />
        
             <Route
               path={`/user-update/:username`}
               render={({ match, history }) => {
                 if (!user) return <Redirect to="/" />;
                 return (
                   <Col>
                     <UserUpdate
                       user={user}
                       onBackClick={() => history.goBack()}
                     />
                   </Col>
                 );
               }}
             />

         <Route
             path="/movies/:movieId"
             render={({ match, history }) => {
               // console.log("movies route user", user);
               if (!user)
                 return (
                   <Col>
                     <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                   </Col>
                 );
               if (movies.length === 0) return <div className="main-view" />;
               return (
                 <Col md={8}>
                   <MovieView
                     movie={movies.find((m) => m._id === match.params.movieId)}
                     onBackClick={() => history.goBack()}
                     handleFavorite={this.handleFavorite}
                   />
                 </Col>
               );
             }}
           />     

           <Route
           path="/directors/:directorName"
           render={({ match, history }) => {
             console.log("movies route director", user);
             if (!user)
               return (
                 <Col>
                   <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                 </Col>
               );
             if (movies.length === 0) return <div className="main-view" />;
             return (
               <Col md={8}>
                 <DirectorView
                   movie={movies.find(
                     (m) => m.Director.Name === match.params.directorName
                   )}
                   onBackClick={() => history.goBack()}
                 />
               </Col>
             );
           }}
         />
         
         <Route
            path="/genres/:genreName"
            render={({ match, history }) => {
              console.log(
                movies.find((m) => m.Genre.Name === match.params.genreName)
              );
              console.log("movies route genre", user);
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <GenreView
                    movie={movies.find(
                      (m) => m.Genre.Name === match.params.genreName
                    )}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
     
            <Route
             path="/home"
             render={() => {
                console.log("Selecting Movie");
                if (user) return <Redirect to="/" />;
                return (
                    <Row className="main-view justify-content-md-center">
                      {selectedMovie ? (
                        <Col md={8}>
                         <MovieView
                           movie={selectedMovie}
                           onBackClick={(newSelectedMovie) => {
                            this.setSelectedMovie(newSelectedMovie);
                           }}
                           />
                        </Col>
                      ) : (
                        movies.map((movie) => (
                           <Col md={4}>
                            <MovieCard
                             key={movie._id}
                             movie={movie}
                             onMovieClick={(newSelectedMovie) => {
                                this.setSelectedMovie(newSelectedMovie);
                             }}
                             />
                           </Col> 
                        ))
                      )}
                    </Row>
                    );
                 }}                    
             />
             </Routes>
            </Row>            
        </Router>            
       );
    }

}

