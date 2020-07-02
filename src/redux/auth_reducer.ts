import { authAPI, securityAPI } from "../api/api";
import { stopSubmit, FormAction } from "redux-form";
import { ThunkAction } from "redux-thunk";
import { AppStateType } from "./redux_store";

const GET_AUTH            = 'ADD-GET_AUTH';
const GET_CAPTCHA_SUCCESS = 'ADD-GET_CAPTCHA_SUCCESS';

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    isAuthRequested: false,
    captchaUrl: null as string | null
};

export type InitialStateType = typeof initialState

const auth_reducer = (state = initialState, action: ActionsType): InitialStateType => {
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

type ActionsType = GetAuthActionType | getCaptchaActionType 
type GetAuthActionType = {
    type: typeof GET_AUTH
    data: {userId: null | number, email: string | null, login: string | null}
    isAuth: boolean
}
export const getAuthAC    = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): GetAuthActionType => ({ 
    type: GET_AUTH, data: {userId, email, login}, isAuth 
});
type getCaptchaActionType = {
    type: typeof GET_CAPTCHA_SUCCESS
    url: string
}
export const getCaptchaSuccess = (url: string): getCaptchaActionType => ({ type: GET_CAPTCHA_SUCCESS, url});

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsType | FormAction>
export const getAuth = (): ThunkType => async (dispatch) => {
    let response = await authAPI.getMe()
    if (response.resultCode === 0) {
        let { id, email, login } = response.data;
        dispatch(getAuthAC(id, email, login, true));
    } else {
        let { id, email, login } = response.data;
        dispatch(getAuthAC(id, email, login, false));
    }
}

export const requestCaptcha = (): ThunkType => async (dispatch) => {
    let response = await securityAPI.getCaptcha()
    dispatch(getCaptchaSuccess(response.url))
}


export const login = (form: any): ThunkType => async (dispatch) => {
    let response = await authAPI.login(form)
    if (response.resultCode === 0) {
        dispatch(getAuth());
    } else {
        if ( response.resultCode === 10 ) dispatch(requestCaptcha())
        dispatch(stopSubmit('login', { _error: response.messages }))
    }

}
export const logout = () => async (dispatch: any) => {
    await authAPI.logout()
    dispatch(getAuthAC(null, null, null, false));

}

export default auth_reducer