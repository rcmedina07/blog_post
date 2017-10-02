export const required = value => (value ? undefined : 'Required');
const maxLength = max => (value) => {
  value && value.length > max
  ? `Must be ${max} characters or less`
  : undefined;
};
const minLength = min => (value) => {
  value && value.length < min
  ? `Must be ${min} characters or more`
  : undefined;
};

export const alphaNumeric = (value) => {
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Only alphanumeric characters'
    : undefined;
};

export const maxLength15 = maxLength(15);
export const minLength2 = minLength(2);
