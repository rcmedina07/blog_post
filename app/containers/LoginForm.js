import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import Login from '../components/Login';

class LoginForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  };
  componentWillUpdate = (nextProps) => {
    if (nextProps.isLogin) {
      this.context.router.history.push('/');
    }
  }
  componentWillUnmount = () => {
    this.props.resetLogin();
  }
  render() {
    const { login, messageLogin } = this.props;
    return (
      <Login onSubmit={login} message={messageLogin} />
    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  resetLogin: PropTypes.func.isRequired,
  isLogin: PropTypes.bool.isRequired,
  messageLogin: PropTypes.string
};

const mapStateToProps = (state) => {
  const { messageLogin, isLogin } = state.user;
  return {
    messageLogin,
    isLogin
  };
};

export default withRouter(connect(mapStateToProps,
    { login: actions.loginUser, resetLogin: actions.resetLogin })(LoginForm));
