function checkName(e, name) {
  name = name.trim();

  const stringRegex = /[^a-z\d'/ ]/gi;
  const isValid = !stringRegex.test(name);
  const isFirstName = name === this.firstName.trim();
  const errMessage = 'Name can only be alphanumeric characters with spaces.';

  if (isValid && isFirstName) {
    this.errInvalidFirstName = '';
  } else if (isValid && !isFirstName) {
    this.errInvalidLastName = '';
  } else if (isFirstName) {
    this.errInvalidFirstName = errMessage;
  } else {
    this.errInvalidLastName = errMessage;
  }
}

function checkUsername(e, username) {
  username = username.trim();
  // Check for format
  const usernameRegex = /[^a-z\d]/gi;
  const isValid = !usernameRegex.test(username);
  isValid ? (this.errInvalidUsername = '') : (this.errInvalidUsername = 'Username can only be alphanumeric.');
  // Check against other usernames
  const doesUserExist = this.users.some(user => user.username.toLowerCase() === username.toLowerCase());

  doesUserExist ? (this.errTakenUsername = 'Username is taken') : (this.errTakenUsername = '');
}

export { checkUsername, checkName };
