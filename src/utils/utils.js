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

function checkEmail(e, email) {
  email = email.trim();

  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  !emailRegex.test(email) && this.email !== '' ? (this.errEmail = 'Please enter a valid email.') : (this.errEmail = '');
}

function checkPasswords(e, password, confirmPassword) {
  password = password.trim();
  confirmPassword = confirmPassword.trim();

  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  if (!password.length && !confirmPassword.length) this.errPassword = '';
  else if (password.length < 8) this.errPassword = 'Please enter a password with 8 or characters.';
  else if (!passwordRegex.test(password))
    this.errPassword = 'Please include upper and lowercase characters, a number and a special character';
  else if (password !== confirmPassword) this.errPassword = 'Passwords do not match.';
  else this.errPassword = '';
}

function checkInputs(e, input) {
  const validCharacters = /([^A-Z\d.,&$'" ])/gi;

  if (!input.length || !validCharacters.test(input)) this.errInput = '';
  else this.errInput = "Please only use alphanumeric characters and special characters . , & ' and space.";
}
function checkLocationName(e, input) {
  const validCharacters = /([^A-Z\d()Å-ôé' ])/gi;

  if (!input.length || !validCharacters.test(input)) this.errLocation = '';
  else this.errLocation = "Please only use alphanumeric characters and special characters ' and space.";
}

function checkURL(e, url) {
  const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-d][a-zA-Z\d-]+[a-zA-Z\d]\.[^\s]{2,}|www\.[a-zA-Z\d][a-zA-Z\d-]+[a-zA-Z\d]\.[^\s]{2,})/gi;

  if (urlRegex.test(url) || !url.length) this.errURL = '';
  else this.errURL = 'Please enter a valid URL';
}

function checkWindowResize() {
  const menuItems = document.querySelectorAll('.menu-item');

  if (window.innerWidth < 800) {
    menuItems.forEach(item => {
      item.style.display = 'none';
    });
  }
  menuItems.forEach(item => {
    item.style.display = 'block';
  });
}

export {
  checkUsername,
  checkName,
  checkEmail,
  checkPasswords,
  checkInputs,
  checkURL,
  checkLocationName,
  checkWindowResize
};
