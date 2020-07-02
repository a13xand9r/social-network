import { profileAPI } from '../api/api';
import { stopSubmit, FormAction } from 'redux-form';
import { ProfileDataType, ProfilePhotoType, PostDataType } from '../types/types';
import { ThunkAction } from 'redux-thunk';
import { AppStateType } from './redux_store';

const ADD_POST             = 'ADD-POST';
const SET_USER_PROFILE     = 'CHANGE-SET_USER_PROFILE-MESSAGE';
const TOGGLE_IS_FETCHING   = 'PROFILE_IS_FETCHING';
const SET_STATUS           = 'SET_STATUS';
const UPDATE_PHOTO         = 'UPDATE_PHOTO';

let initialState = {
    profileData: {
        fullName: null,
        contacts: {
            // github: null,
            // vk: null,
            // facebook: null,
            // instagram: null,
            // twitter: null,
            // website: null,
        },
        photos: {
            large: null,
            small: null
        }
    } as ProfileDataType,
    status: '',
    postData: [
        { id: '1', message: 'Whats up!', like: '3' },
        { id: '2', message: 'hey, YO, how are you doing', like: '0' },
        { id: '3', message: 'Happy birthday to you broooooooooooooooooooooo', like: '20' },
    ] as Array<PostDataType>,
    isFetching: false
};

export type ProfilePageStateType = typeof initialState

const profile_reducer = (state = initialState, action: ActionsType): ProfilePageStateType => {
    switch(action.type){
        case ADD_POST: {
            let newPost = {
                id: '5',
                message: action.form,
                like: '0'
            };
            return {
                ...state,
                postData: [newPost,...state.postData],
            }
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profileData: action.data
            }
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case TOGGLE_IS_FETCHING:{
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case UPDATE_PHOTO:{
            return {
                ...state,
                profileData: {...state.profileData,
                    photos: {...state.profileData.photos, large: action.photos.large} }
            }
        }
        default: return state;
    }
}

type ActionsType = AddPostActionType | SetUserActionType | ProfileIsFetchingActionType | SetStatusActionType | UpdatePhotoSuccessActionType
type AddPostActionType = {
    type: typeof ADD_POST
    form: any
}
export const addPostActionCreator = (form: any): AddPostActionType => ({ type: ADD_POST, form });
type SetUserActionType = {
    type: typeof SET_USER_PROFILE
    data: ProfileDataType
}
export const setUserProfile = (data: ProfileDataType): SetUserActionType => ({ type: SET_USER_PROFILE, data })
type ProfileIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const profileIsFetching = (isFetching: boolean): ProfileIsFetchingActionType => ({ type: TOGGLE_IS_FETCHING, isFetching });
type SetStatusActionType = {
    type: typeof SET_STATUS
    status: string
}
export const setStatus = (status: string): SetStatusActionType => ({ type: SET_STATUS, status });
type UpdatePhotoSuccessActionType = {
    type: typeof UPDATE_PHOTO
    photos: ProfilePhotoType
}
export const updatePhotoSuccess = (photos: ProfilePhotoType): UpdatePhotoSuccessActionType => ({ type: UPDATE_PHOTO, photos });

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsType | FormAction>
export const requestProfilePage = (userId: number): ThunkType => {
    return async (dispatch) => {
        dispatch(profileIsFetching(true));
        let response = await profileAPI.getProfile(userId)
        dispatch(setUserProfile(response));
        dispatch(profileIsFetching(false));
    }
}
export const getUserStatus = (userId: number): ThunkType => {
    return async (dispatch) => {
        let response = await profileAPI.getStatus(userId)
        dispatch(setStatus(response));
    }
}

export const updateUserStatus = (statusBody: string): ThunkType => {
    return async (dispatch) => {
        let response = await profileAPI.updateStatus(statusBody)
        if (response.resultCode === 0) {
            dispatch(setStatus(statusBody));
        } else {
            dispatch(stopSubmit('aboutMe', { _error: response.messages }))
        }
    }
}

export const savePhoto = (photoFile: any): ThunkType => {
    return async (dispatch) => {
        let response = await profileAPI.updatePhoto(photoFile)
        if (response.resultCode === 0) {
            dispatch(updatePhotoSuccess(response.data.photos));
        }
    }
}
export const updateAboutMe = (form: any): ThunkType => {
    return async (dispatch, getState: () => AppStateType) => {
        let response = await profileAPI.updateAboutMe(form)
        let userId = getState().auth.userId
        if (response.resultCode === 0 && userId) {
            dispatch(requestProfilePage(userId));
        }
    }
}

export default profile_reducer