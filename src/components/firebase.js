import { initializeApp } from "@firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyC8ks3N0GgQtAd-f4uJ26pw_46zrvcq_sw",
    authDomain: "pc-family-chat.firebaseapp.com",
    databaseURL: "https://pc-family-chat-default-rtdb.firebaseio.com",
    projectId: "pc-family-chat",
    storageBucket: "pc-family-chat.appspot.com",
    messagingSenderId: "198112913959",
    appId: "1:198112913959:web:c428f54be1b30ae04c3c02"
};

firebase.initializeApp(firebaseConfig);
export const usersref = firebase.database().ref("users");
export const chatsref = firebase.database().ref("chats");
export const storage = getStorage(initializeApp(firebaseConfig));
export default firebase;