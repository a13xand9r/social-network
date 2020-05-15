import { profileAPI } from '../api/api';
import { stopSubmit } from 'redux-form';

const ADD_POST             = 'ADD-POST';
const SET_USER_PROFILE     = 'CHANGE-SET_USER_PROFILE-MESSAGE';
const TOGGLE_IS_FETCHING   = 'PROFILE_IS_FETCHING';
const SET_STATUS           = 'SET_STATUS';
const UPDATE_PHOTO         = 'UPDATE_PHOTO';

let initialState = {
    profileData: {
        fullName: null,
        contacts: {
            github: null,
            vk: null,
            facebook: null,
            instagram: null,
            twitter: null,
            website: null,
        },
        photos: {
            large: null
        }
    },
    status: "",
    postData: [
        { id: '1', message: 'Whats up!', like: '3' },
        { id: '2', message: 'hey, YO, how are you doing', like: '0' },
        { id: '3', message: 'Happy birthday to you broooooooooooooooooooooo', like: '20' },
    ],
    isFetching: false
};

const profile_reducer = (state = initialState, action) => {
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
                    photos: {...state.photos, large: action.photos.large} }
            }
        }
        default: return state;
    }
}

export const addPostActionCreator = (form) => ({ type: ADD_POST, form });
export const setUserProfile = (data) => ({ type: SET_USER_PROFILE, data })
export const profileIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });
export const setStatus = (status) => ({ type: SET_STATUS, status });
export const updatePhotoSuccess = (photos) => ({ type: UPDATE_PHOTO, photos });

export const requestProfilePage = (userId) => {
    return async (dispatch) => {
        dispatch(profileIsFetching(true));
        let response = await profileAPI.getProfile(userId)
        dispatch(setUserProfile(response));
        dispatch(profileIsFetching(false));
    }
}
export const getUserStatus = (userId) => {
    return async (dispatch) => {
        let response = await profileAPI.getStatus(userId)
        dispatch(setStatus(response));
    }
}

export const updateUserStatus = (statusBody) => {
    return async (dispatch) => {
        let response = await profileAPI.updateStatus(statusBody)
        if (response.resultCode === 0) {
            dispatch(setStatus(statusBody));
        } else {
            dispatch(stopSubmit('aboutMe', { _error: response.messages }))
        }
    }
}

export const savePhoto = (photoFile) => {
    return async (dispatch) => {
        let response = await profileAPI.updatePhoto(photoFile)
        if (response.resultCode === 0) {
            dispatch(updatePhotoSuccess(response.data.photos));
        }
    }
}
export const updateAboutMe = (form) => {
    return async (dispatch, getState) => {
        let response = await profileAPI.updateAboutMe(form)
        if (response.resultCode === 0) {
            dispatch(requestProfilePage(getState().auth.userId));
        }
    }
}

export default profile_reducer