
import { initializeApp } from "firebase/app";
import { getDatabase , ref, set} from "firebase/database";
import {getAuth, createUserWithEmailAndPassword,  GoogleAuthProvider,signInWithPopup ,onAuthStateChanged ,signOut} from "firebase/auth";
import FirebaseContext from './FirebaseContext';
import { useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyBmyGTnKeyIhgI77eIAaQ4mp0gFGsvQzec",
  authDomain: "first-project-aa9af.firebaseapp.com",
  projectId: "first-project-aa9af",
  storageBucket: "first-project-aa9af.appspot.com",
  messagingSenderId: "951868208737",
  appId: "1:951868208737:web:5a8dd8d75a80f9eb2a5c20",
  databaseUrl:"https://first-project-aa9af-default-rtdb.firebaseio.com/"
};


const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);
const GoogleProvider = new GoogleAuthProvider();


const FirebaseProvider= (props) =>{
    const signUpWithEmail=(email, password)=>{
        createUserWithEmailAndPassword(firebaseAuth,email, password)
        .then(()=>console.log("Sign up Success"))
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
          });
    }
    const putData=(key,data)=>{
         set(ref(database,key),data);
    }
   const signUpWithGoogle=()=>{
    signInWithPopup(firebaseAuth,GoogleProvider).then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUseresurInfo(lt)
        //
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
   }

   const logoutFromGoogle=()=>{
    signOut(firebaseAuth).then(() => {
      console.log("Sign-out successful");
    }).catch((error) => {
      console.log(error);
    });
   }
   const [user,setUser]=useState(null);
   onAuthStateChanged(firebaseAuth, (user) => {
    if (user) {
      console.log(user);
      setUser(user);
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      // ...
    } else {
      setUser(null);
    }
  });
    return (
        <FirebaseContext.Provider value={{signUpWithEmail,putData,signUpWithGoogle,logoutFromGoogle,user}}>
        {props.children}
        </FirebaseContext.Provider>
    )

}
export default FirebaseProvider;

