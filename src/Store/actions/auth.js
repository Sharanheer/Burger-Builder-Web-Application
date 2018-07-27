import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authSpinner = () => {
    return {
        type: actionTypes.AUTH_SPINNER
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const logout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout());
        },expirationTime * 1000)
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authSpinner());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBY9upHsqazYmIdGjPUCQffnSMFTN2mGLw';

        if(!isSignUp){
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBY9upHsqazYmIdGjPUCQffnSMFTN2mGLw';
        }
        axios.post(url, authData)
            .then(res => {
                // console.log(res.data);
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('userId', res.data.localId);
                const expirationDate = new Date(new Date().getTime() + (res.data.expiresIn * 1000));
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(authSuccess(res.data.idToken, res.data.localId));
                dispatch(logout(res.data.expiresIn));
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err.response.data.error.message));
            })
    }
}

export const getAuthOnStartUp = () => {
    return dispatch => {
        let token = localStorage.getItem('token');
        if(!token){
            dispatch(authLogout());
        }
        else{
            let expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate > new Date()){
                let userId = localStorage.getItem('userId'); 
                dispatch(authSuccess(token, userId));
                const timeInSecs = (expirationDate.getTime() - new Date().getTime())/1000;
                dispatch(logout(timeInSecs));
            } 
            else{
                dispatch(authLogout());
            }

            
        }
        
    }
}

