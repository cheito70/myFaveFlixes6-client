import React from 'react';
import axios from "axios";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//Bootstrap imports
import {Form, Button, Container, Row, Col, Card, Figure } from 'react-bootstrap';

export default class ProfileView extends React.Component {
    constructor() {
        super();
        this.state = {
            Username: null,
            Password: null,
            Emai: null,
            Birthday: null,
            FavoriteMovies: [],
        };
    }

    componentDidMount() {
        const accessToken = localStorage.getItem('token');
        this.getUser(accessToken);
    }

    onRemoveFavorite = (movie) => {
        const username =localStorage.getItem('user');
        const token = localStorage.getItem('token');
        console.log(movie)
        axios
          .delete(
            `https://myfaveflixes.herokuapp.com/users/${username}/movies/${movie}`,
            { headers: { Authorization: `Bearer ${token}` }}
          )
          .then((response) => {
            console.log(response);
            alert("Movie was removed from favorites.");
            this.componentDidMount();
          })
          .catch(function (error) {
            console.log(error);
          });
    };

    editUser = (e) => {
        e.preventDefault();
        const Username=
    }


}