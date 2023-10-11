// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID

  // apiKey: "AIzaSyABwinU6ssKrPeG27ZpCrmfDRCKk8mv7ug",
  // authDomain: "react-bbs-7230e.firebaseapp.com",
  // projectId: "react-bbs-7230e",
  // storageBucket: "react-bbs-7230e.appspot.com",
  // messagingSenderId: "124845476045",
  // appId: "1:124845476045:web:5675d925711546134c4184"
};

// Initialize Firebase
// export const firebase = initializeApp(firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const authService = getAuth(app);