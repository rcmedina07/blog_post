import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { NavDropdown, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

const Header = ({ user, isLogin, logout }) => (
  <nav className="navbar navbar-inverse navbar-static-top">
    <div className="container-fluid">
      <div className="navbar-header">
        <button type="button" className="navbar-toggle collapsed">
          <span className="sr-only">Toggle navigation</span>
        </button>
        <Link className="navbar-brand" to="/"> Blog Post</Link>
      </div>
      <div className="collapse navbar-collapse">
        {isLogin ?
          <ul className="nav navbar-nav navbar-right">
            <li><Link to="/posts"> Posts </Link></li>
            <li><Link to="/newPost"> New post </Link></li>
            <NavDropdown eventKey="4" title={user.username} id="nav-dropdown">
              <MenuItem eventKey="4.1" onClick={() => logout()}> Logout </MenuItem>
            </NavDropdown>
          </ul> :
          <ul className="nav navbar-nav navbar-right">
            <li><Link to="/posts"> Posts </Link></li>
            <li><Link to="/login"> Login </Link></li>
          </ul>}
      </div>
    </div>
  </nav>
);

Header.propTypes = {
  user: PropTypes.object,
  isLogin: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  const { user, isLogin } = state.user;
  return {
    user,
    isLogin
  };
};

export default connect(mapStateToProps, { logout: actions.logOut })(Header);
