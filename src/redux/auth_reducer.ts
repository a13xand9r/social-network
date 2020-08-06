import { LoginResultCode, AuthResultCode, profileAPI } from './../api/api';
import { authAPI, securityAPI } from "../api/api";
import { stopSubmit, FormAction } from "redux-form";
import { InferActionType, BaseThunkType } from "./redux_store";
import { LoginFormValuesType } from '../Components/Login/Login';

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    isAuthRequested: false,
    captchaUrl: null as string | null,
    smallPhoto: null as string |null
};

const auth_reducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch(action.type){
        case 'AUTH_GET_AUTH': {
            return {
                ...state,
                ...action.data,
                isAuthRequested: true,
                isAuth: action.isAuth,
                captchaUrl: null,
                smallPhoto: action.photo
            }
        }
        case 'AUTH_GET_CAPTCHA_SUCCESS': {
            return {
                ...state,
                captchaUrl: action.url
            }
        }
        default: return state;
    }
}

export const actions = {
    getAuth: (userId: number | null, email: string | null, login: string | null, isAuth: boolean, photo: string | null) => ({
        type: 'AUTH_GET_AUTH', data: { userId, email, login }, isAuth, photo
    } as const),
    getCaptchaSuccess: (url: string) => ({ type: 'AUTH_GET_CAPTCHA_SUCCESS', url } as const)
}

export const getAuth = (): ThunkType => async (dispatch) => {
    let response = await authAPI.getMe()
    if (response.resultCode === AuthResultCode.Success) {
        let { id, email, login } = response.data;
        let profileData = await profileAPI.getProfile(id)
        dispatch(actions.getAuth(id, email, login, true, profileData.photos.small));
    } else {
        let { id, email, login } = response.data;
        dispatch(actions.getAuth(id, email, login, false, null));
    }
}

export const requestCaptcha = (): ThunkType => async (dispatch) => {
    let response = await securityAPI.getCaptcha()
    dispatch(actions.getCaptchaSuccess(response.url))
}


export const login = (form: LoginFormValuesType): ThunkType => async (dispatch) => {
    let response = await authAPI.login(form)
    if (response.resultCode === LoginResultCode.SuccessLogin) {
        dispatch(getAuth());
    } else {
        if ( response.resultCode === LoginResultCode.CaptchaRequired ) dispatch(requestCaptcha())
        dispatch(stopSubmit('login', { _error: response.messages }))
    }

}
export const logout = (): ThunkType => async (dispatch) => {
    await authAPI.logout()
    dispatch(actions.getAuth(null, null, null, false, null));

}

export default auth_reducer

export type InitialStateType = typeof initialState
type ActionsType = InferActionType<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>