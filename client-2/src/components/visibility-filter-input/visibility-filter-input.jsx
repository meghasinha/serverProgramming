import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './visibility-filter-input.scss';
import Form from 'react-bootstrap/Form';
import { setFilter } from '../../actions/actions';

function VisibilityFilterInput(props)
{
  return (
    <form>
      <div className="form-group">
        <Form.Group controlId="formBasicUsername">
          <Form.Control size="sm" placeholder="filter" value={props.visibilityFilter} onChange={e => props.setFilter(e.target.value)} />
        </Form.Group>
        </div>
      </form>
    );
}

export default connect(
  ({visibilityFilter}) => ({visibilityFilter}),
  { setFilter }
)(VisibilityFilterInput);
