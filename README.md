# trippr

## About

A trip review application, built with VueJS, where users share reviews about different locations across the world as well as post an image URL of one of their images.

Users are able to:

- Singup and login with an email and password.
- Edit their name and username.
- View all locations reviewed.
- Search locations by city or country name.
- Post a new review to an existing or non-exisitng location. If the location is non-existing, it will be created.
- Edit their reviews when view a location.
- Delete their reviews when viewing a location they have reviewed.

Each location also provides current weather information via OpenWeatherMap.org API.

Before cloning the project, you may demo the site [here](https://photo-app-idol.netlify.com/).

On the demo site, you can login using the guest login details below:

- Email - guest@email.com
- Password - Password123!

Alternatively, you can register for an account. Please note that this is a demonstration site only, and therefore do not use real email and passwords.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installing

A step by step guide to getting the project running on your local machine.

### Prerequisites

In order to get the app running on your local machine, you will require the following installed.

- [NodeJS v.8.10](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [VueJS CLI](https://vuejs.org/)

### Cloning to local machine

1. Go to the root of the repository here.
2. Fork the repository to your GitHub account.
3. Once forked, you will be given a git link. Copy this link.
4. Open up a terminal on your local machine and type git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY and press Enter. Your local clone will then be created.

### Installing Packages

The following packages will be required for the project to work locally.

- axios
- core-js
- dotenv-webpack
- firebase
- vue
- vue-router
- vuex

To install required versions, type `npm install`. This will also install any dev dependencies.

### Additional setup

#### Firebae Authentication

In order to be able to use the Firebase Authentication, you will need to create a firebaseConfig.js file inside the src directory.

The contents will look similar to the below.

```
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_PROJECT.firebaseapp.com',
  databaseURL: 'YOUR_PROJECT_URL.firebaseio.com',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT_STORE.appspot.com',
  messagingSenderId: '********',
  appId: '***********************'
};

firebase.initializeApp(firebaseConfig);

// firebase auth
const auth = firebase.auth();
const currentUser = auth.currentUser;

export { auth, currentUser };
```

[Click here](https://firebase.google.com/) for more information on setting up a Firebase account.

#### OpenWeatherMap API

Each location has weather information supplied from a 3rd party API, [OpenWeatherMap](https://openweathermap.org/).

As this API requires a key, you should sign up for an account if you wish to use this function.

Once you have obtained a key, you will need to create a .env file and create a reference to your API key like so `VUE_APP_WEATHER='YOURAPIKEY'`

### Running Locally

Once all of the above steps have been followed, you should be able to run the application locally by typing `npm run serve` in your terminal.
