import firebase from "firebase";
import "firebase/storage";

export const initializeFirebase = () => {
  let firebaseConfig = {
    apiKey: "AIzaSyBqN9nat6upHj369FN25gsC26VjLy2jmhM",
    authDomain: "picshare-92f7d.firebaseapp.com",
    projectId: "picshare-92f7d",
    storageBucket: "picshare-92f7d.appspot.com",
    messagingSenderId: "406804287904",
    appId: "1:406804287904:web:98cd1d6d89ebf12a5cd4c5",
  };

  //initialize firebase
  firebase.initializeApp(firebaseConfig);
};

export const firebaseStorage = () => {
  let storage = firebase.storage();
  return storage;
};
