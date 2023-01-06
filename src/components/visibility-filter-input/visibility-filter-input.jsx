import React from 'react';
import { Form, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setFilter } from '../../actions/actions';


function VisibilityFilterInput(props) {
    return (
        <Col md={8} class="searchbox">
        <Form.Control
        onChange={(e) => props.setFilter(e.target.value)}
        value={props.visibilityFilter}
        placeholder='Search'
        />
        </Col>
    );
}

export default connect(null, { setFilter })(VisibilityFilterInput);