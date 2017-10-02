import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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

const Form = (props) => {
  const { handleSubmit, submitting } = props;
  return (
    <form onSubmit={handleSubmit(values => props.onSubmit(values))} name="postNew">
      <Field
        label="Title"
        name="title"
        type="text"
        component={renderField}
        validate={[validations.required,
          validations.maxLength15,
          validations.minLength2]}
        warn={validations.alphaNumeric}
      />
      <Field
        label="Category"
        name="category"
        type="textarea"
        component={renderField}
        validate={[validations.required,
          validations.maxLength15,
          validations.minLength2]}
        warn={validations.alphaNumeric}
      />
      <Field
        label="Content"
        name="content"
        type="textarea"
        component={renderField}
        validate={[validations.required,
          validations.maxLength15,
          validations.minLength2]}
        warn={validations.alphaNumeric}
      />
      <div className="btn-group pull-right">
        <button type="submit" className="btn btn-primary" disabled={submitting}>Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </div>
    </form>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.func.isRequired
};

export default reduxForm({ form: 'postNew' })(Form);
