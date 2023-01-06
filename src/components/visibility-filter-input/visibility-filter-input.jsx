import React from 'react';
import { Form, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setFilter } from '../../actions/actions';


function VisibilityFilterInput(props) {
    return (
        <div class="d-flex justify-content-center">
        <Col md={8} >
        <Form.Control
        onChange={(e) => props.setFilter(e.target.value)}
        value={props.visibilityFilter}
        placeholder='Search'
        />
        </Col>
        </div>
    );
}

export default connect(null, { setFilter })(VisibilityFilterInput);