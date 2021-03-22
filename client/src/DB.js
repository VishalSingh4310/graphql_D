import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCJSmnEonsqOwE57nUNM8OqqEZh49NXSQY",
  authDomain: "music-2e108.firebaseapp.com",
  databaseURL: "https://music-2e108.firebaseio.com",
  projectId: "music-2e108",
  storageBucket: "music-2e108.appspot.com",
  messagingSenderId: "277391688120",
  appId: "1:277391688120:web:34d797183da4a3d6a04f4d",
  measurementId: "G-NSH5788BQF",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
