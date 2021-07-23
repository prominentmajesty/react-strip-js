/*import { takeLastest, call, all, put } from redux-saga/effect
import {auth, handleUserProfile, GoogleProvider} from './../../firebase/utils';
import userTypes from './user.types';
import {signInSuccess} from './user.actions';
import userReducer from './user.reducer';

export function* emailSignIn({payload : {email, password}}){

    try{
            yield auth.signInWithEmailAndPassword(email, password);
            dispatch({
                type : userTypes.SIGN_IN_SUCCESS,
                payload : true
            });
        
        }catch(err){
            //console.log(err);
        }
}

export function* onEmailSignStart(){
    yield takeLastest(userReducer.EMAIL_SIGN_IN_START, emailSignIn);
}

export default function* userSagas(){
    yield all([call(onEmailSignStart)]);
}*/