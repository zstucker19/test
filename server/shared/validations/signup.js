import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
  let errors = {};
  console.log(data);

  if (Validator.isNull(data.username)) {
    errors.username = 'This field is required';
  }
  if (Validator.isNull(data.email)) {
    errors.email = 'This field is required';
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (Validator.isNull(data.password)) {
    errors.password = 'This field is required';
  }
  if (Validator.isNull(data.passwordConfirmation)) {
    errors.passwordConfirmation = 'This field is required';
  }
  if (!Validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = 'Passwords must match';
  }
  if (Validator.isNull(data.address)) {
    errors.address = 'This field is required';
  }
  if (Validator.isNull(data.occupation)) {
    errors.timezone = 'This field is required';
  }

  


  return {
    errors,
    isValid: isEmpty(errors),data
  }
}
