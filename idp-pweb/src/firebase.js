import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import "firebase/compat/database";

const app = firebase.initializeApp({
    apiKey: "AIzaSyDYe4KcRYqda6X2mNSP_Vg1S0DdIYxUB5g",
    authDomain: "idp-pweb.firebaseapp.com",
    databaseURL: "https://idp-pweb-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "idp-pweb",
    storageBucket: "idp-pweb.appspot.com",
    messagingSenderId: "566500893358",
    appId: "1:566500893358:web:bddf27751b3ae99f93033f",
    measurementId: "G-VN6KQ7TKSW"
})

export const auth = app.auth();
export const database = app.database();
export default app;