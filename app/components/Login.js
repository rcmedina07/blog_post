import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import * as validations from '../utils/validations';


const renderField = ({
  input,
  label,
  type,
  name,
  meta: { touched, error, warning }
}) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <input
      {...input}
      placeholder={label}
      type={type}
      className={touched && error ? 'form-control errorField' : 'form-control'}
    />
    <div>
      {touched &&
          ((error && <span className="error">{error}</span>) ||
            (warning && <span className="warn">{warning}</span>))}
    </div>
  </div>
  );

const Login = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <div className="row" >
      <div className="col-sm-6 col-md-4 col-md-offset-4">
        <h1 className="text-center login-title">Sign in </h1>
        <div className="account-wall">
          {props.message ?
            <div className="alert alert-danger" role="alert">
              {props.message}
            </div> : null}
          <form className="form-signin" onSubmit={handleSubmit(values => props.onSubmit(values))} name="login">
            <Field
              label="Username"
              name="user"
              type="text"
              component={renderField}
              validate={[validations.required,
                validations.maxLength15,
                validations.minLength2]}
              warn={validations.alphaNumeric}
            />
            <Field
              label="Password"
              name="pass"
              type="password"
              component={renderField}
              validate={[validations.required,
                validations.maxLength15,
                validations.minLength2]}
              warn={validations.alphaNumeric}
            />
            <button type="submit" className="btn btn-lg btn-primary btn-block" disabled={submitting}>Sign in</button>
            <button type="button" className="btn btn-lg btn-danger btn-block" disabled={pristine || submitting} onClick={reset}>
              Clear Values
        </button>
          </form>
        </div>
      </div>
    </div >
  );
};

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  message: PropTypes.string
};

export default reduxForm({ form: 'login' })(Login);
