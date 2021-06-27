import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

//Enter Your Firebase Credentials
var firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};
// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);
