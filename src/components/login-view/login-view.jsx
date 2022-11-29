import React, { useState }  from 'react';
import {Form, Col, Row, Container, Card, CardGroup, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import axios from 'axios';

import './login-view.scss';

export function LoginView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        /* Send a request to server for authentication  */
        /* Then call props.onLoggedIn(username) */
        props.onLoggedIn(username);
    };

    const handleRegisterClick = (e) => {
        e.preventDefault();
        props.toRegister();
    };


    return (

        
<Container fluid className="login-container">
    <Row className="login-card"> 
        <Col></Col>
            <Col>
                <CardGroup>
                    <Card>
                        <Card.Body>
                            <Card.Title>Login Here</Card.Title>
                            <Form className="login-border">
                                <Form.Group controlId="formUsername">
                                    <Form.Label>Username:</Form.Label>
                                    <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
                                </Form.Group>

                                <Form.Group controlId="formPassword">
                                    <Form.Label>Password:</Form.Label>
                                    <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
                                </Form.Group>
                                <Button 
                                className="login-button mt-2 mr-2"
                                variant="primary" 
                                type="submit" 
                                onClick={handleSubmit}>Submit</Button>

                                <Button 
                                className="register-button mt-2" 
                                variant="secondary" 
                                type="submit"
                                onClick={handleRegisterClick}>Register</Button>
                            </Form>
            </Card.Body>
            </Card>
            </CardGroup>
                </Col>
            <Col></Col>
        </Row>
    </Container>
    );
}

LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
}