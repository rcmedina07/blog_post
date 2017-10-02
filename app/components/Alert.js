import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Alert = ({ style, message }) => (
  <div className={`alert ${style}`} role="alert">
    <Link
      className="close"
      to="/posts"
    ><span>&times;</span></Link>
    {message}
  </div>
    );

Alert.propTypes = {
  style: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};

export default Alert;
