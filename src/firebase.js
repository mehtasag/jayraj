import firebase from "firebase";
import "firebase/storage";
import "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyD2ZfDwHPdNi48sA1MC37qzpT_mUINz6lY",
  authDomain: "neha-s-project.firebaseapp.com",
  databaseURL: "https://neha-s-project.firebaseio.com",
  projectId: "neha-s-project",
  storageBucket: "neha-s-project.appspot.com",
  messagingSenderId: "227150674950",
  appId: "1:227150674950:web:7bef7584908893bb4d9787"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const projectStorage = firebase.storage();

const provider = new firebase.auth.GoogleAuthProvider();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
export { auth, provider, projectStorage, timestamp };
export default db;
