// Initialize Firebase
var config = {
  apiKey: "AIzaSyAQDIFL2EgihXQBRn_w-SYiwEMrvHTJBx0",
  authDomain: "pollr-91934.firebaseapp.com",
  databaseURL: "https://pollr-91934.firebaseio.com",
  projectId: "pollr-91934",
  storageBucket: "",
  messagingSenderId: "893445214130"
};
firebase.initializeApp(config);

const firestore = firebase.firestore();
const settings = { /* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);

var db = firebase.firestore();
