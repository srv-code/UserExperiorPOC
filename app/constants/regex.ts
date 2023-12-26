const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
const FULL_NAME_REGEX = /^[a-zA-Z ]+$/;
const USERNAME_REGEX = /^[a-zA-Z0-9.\-_@$]{5,18}$/;

/* From 4-16 characters,
    with at least a symbol,
    upper and lower case letters
    and a number */
const PASSWORD_REGEX =
  /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{4,16}$/;

export { EMAIL_REGEX, FULL_NAME_REGEX, USERNAME_REGEX, PASSWORD_REGEX };
