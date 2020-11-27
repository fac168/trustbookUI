  import firebase from 'firebase/app';
  import "firebase/auth";
  import 'firebase/firestore';

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCKvgb9gP_5Qu9Hc64p9JDRkS2BZ06y5kY",
    authDomain: "trustbook-a270b.firebaseapp.com",
    databaseURL: "https://trustbook-a270b.firebaseio.com",
    projectId: "trustbook-a270b",
    storageBucket: "trustbook-a270b.appspot.com",
    messagingSenderId: "183885774615",
    appId: "1:183885774615:web:abb27c025d39f2ca1c0152",
    measurementId: "G-QJ0NQ1NTDS"
  };  // Initialize Firebase
  
  firebase.initializeApp(firebaseConfig);
  
  export default (firebase);