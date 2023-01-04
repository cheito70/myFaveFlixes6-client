import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setMovies } from '../../actions/actions';


import PropTypes from 'prop-types';

import { BrowserRouter as Router, Routes, Route, Redirect } from 'react-router-dom';

//Views
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import{ MovieView } from '../movie-view/movie-view';
import { ProfileView } from '../profile-view/profile-view';
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { NavBar } from '../navbar/navbar';
import MoviesList from '../movies-list/movies-list';


//Styles
import { Navbar, Nav, Container, Row, Col, Button} from 'react-bootstrap';
import './main-view.scss';

export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: [],
            //favoriteMovies: [],
            //selectedMovie: null,
            user: null,
            //registered: null
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
    .then((response) => {
        //Assign the result to the state
        this.props.setMovies(response.data);
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


    render() {
        const { movies, user, favoriteMovies } = this.state;
        //let { movies } = this.props;
        //let { user } = this.state;
        return (
            <Router>
             <NavBar user={user} />
               <Row className="main-view justify-content-md-center">
               
                 <Route
                  
                  path='/'
                  render={() => {
                    if (!user)
                     return (
                        <Col>
                        <LoginView
                         md={4}
                         movies={movies}
                         onLoggedIn={user => this.onLoggedIn(user)}
                         />
                        </Col>
                     );
                     //Before movies upload
                     if (movies.length === 0) return <div className='main-view' />;
                     return <MoviesList movies={movies} />;
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
                 exact
                 path={`/users/${user}`}
                 render={({ history }) => {
                   if (!user) return <Redirect to="/" />;
                   return (
                     <Col>
                       <ProfileView
                         user={user}
                         movies={movies}
                         goBack={history.goBack}
                         favoriteMovies={favoriteMovies || []}
                         //handleFavorite={this.handleFavorite}
                         onBackClick={() => history.goBack()}
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
             exact
             path="/movies/:movieId"
             render={({ match, history }) => {
               return (
                <Col className='pt-4'>
                  <MovieView
                    movie={movies.find((m) => m._id === match.params.movieId)}
                    onBackClick={() => history.goBack()}
                    />
                </Col>
               );       
             }}
           />     

           <Route
           path="/directors/:name"
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
                   director={movies.find(
                     (m) => m.Director.Name === match.params.name
                   ).Director }
                   onBackClick={() => history.goBack()}
                 />
               </Col>
             );
           }}
         />
         
         <Route
            path="/genres/:name"
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
                    genre={
                      movies.find((m) => m.Genre.Name === match.params.name
                    ).Genre }
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
             
            </Row>            
        </Router>            
       );
    }

}
let mapStateToProps = (state) => {
  return { movies: state.movies };
};

export default connect(mapStateToProps, { setMovies})(MainView);