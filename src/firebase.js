import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA_2C5i-coDaEwYnj2zBU21-DvKhq-Y93U",
  authDomain: "browser-search-liverpool.firebaseapp.com",
  projectId: "browser-search-liverpool",
  storageBucket: "browser-search-liverpool.appspot.com",
  messagingSenderId: "592513469901",
  appId: "1:592513469901:web:54567e6057bf828bcb8884",
};

// Create the firebase app by initialize it with the config
const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
