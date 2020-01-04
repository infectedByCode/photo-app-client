import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDyPEkRlLQc-GC85l9mFuFtPHkK56d4Z3A',
  authDomain: 'photo-app-93167.firebaseapp.com',
  databaseURL: 'https://photo-app-93167.firebaseio.com',
  projectId: 'photo-app-93167',
  storageBucket: 'photo-app-93167.appspot.com',
  messagingSenderId: '899521639361',
  appId: '1:899521639361:web:d06e068b2b35020289f540'
};

firebase.initializeApp(firebaseConfig);

// firebase auth
const auth = firebase.auth();
const currentUser = auth.currentUser();

export { auth, currentUser };
