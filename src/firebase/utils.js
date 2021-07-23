
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'; 

 const firebaseConfig = {
    apiKey: "AIzaSyAinmhcjoTGFb8qSVlfFXtBNM_KfZkoEqc",
    authDomain: "ecommerce-website-e6eb5.firebaseapp.com",
    projectId: "ecommerce-website-e6eb5",
    storageBucket: "ecommerce-website-e6eb5.appspot.com",
    messagingSenderId: "509228763946",
    appId: "1:509228763946:web:3b0f09c1e57f33f48dac53"
}

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({prompt : 'select_account'});

export const handleUserProfile = async (userAuth,additionalData) => {
    if(!userAuth) return;
    const {uid} = userAuth;
 
    const userRef = firestore.doc(`users/${uid}`);
    const snapshot = await userRef.get();
    if(!snapshot.exists){
        const {displayName, email} = userAuth;
        const  timestamp = new Date();
        try{
            await userRef.set({
                displayName,
                email, 
                createdAt : timestamp,
                ...additionalData
            });
        }catch(err){
            //console.log(err)

        }
    }

    return userRef;
};
