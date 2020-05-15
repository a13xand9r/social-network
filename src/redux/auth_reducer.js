import { authAPI, securityAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const GET_AUTH            = 'ADD-GET_AUTH';
const GET_CAPTCHA_SUCCESS = 'ADD-GET_CAPTCHA_SUCCESS';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    isAuthRequested: false,
    captchaUrl: null
};

const auth_reducer = (state = initialState, action) => {
    switch(action.type){
        case GET_AUTH: {
            return {
                ...state,
                ...action.data,
                isAuthRequested: true,
                isAuth: action.isAuth,
                captchaUrl: null
            }
        }
        case GET_CAPTCHA_SUCCESS: {
            return {
                ...state,
                captchaUrl: action.url
            }
        }
        default: return state;
    }
}

export const getAuthAC    = (userId, email, login, isAuth) => ({ 
    type: GET_AUTH, data: {userId, email, login}, isAuth 
});
export const getCaptchaSuccess = (url) => ({ type: GET_CAPTCHA_SUCCESS, url});

export const getAuth = () => async (dispatch) => {
    let response = await authAPI.getMe()
    if (response.resultCode === 0) {
        let { id, email, login } = response.data;
        dispatch(getAuthAC(id, email, login, true));
    } else {
        let { id, email, login } = response.data;
        dispatch(getAuthAC(id, email, login, false));
    }
}

export const requestCaptcha = () => async (dispatch) => {
    let response = await securityAPI.getCaptcha()
    dispatch(getCaptchaSuccess(response.url))
}


export const login = (form) => async (dispatch) => {
    let response = await authAPI.login(form)
    if (response.resultCode === 0) {
        dispatch(getAuth());
    } else {
        if ( response.resultCode === 10 ) dispatch(requestCaptcha())
        dispatch(stopSubmit('login', { _error: response.messages }))
    }

}
export const logout = () => async (dispatch) => {
    await authAPI.logout()
    dispatch(getAuthAC(null, null, null, false));

}

export default auth_reducer