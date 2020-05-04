import NovikovAva from '../pictures/Novikov.jpg';
import { profileAPI } from '../api/api';

const ADD_POST             = 'ADD-POST';
const SET_USER_PROFILE     = 'CHANGE-SET_USER_PROFILE-MESSAGE';
const TOGGLE_IS_FETCHING   = 'PROFILE_IS_FETCHING';
const SET_STATUS           = 'SET_STATUS';

let initialState = {
    profileData: {
        fullName: 'Новиков Александр',
        contacts: null,
        photos: {
            large: NovikovAva
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
        default: return state;
    }
}

export const addPostActionCreator = (form) => ({ type: ADD_POST, form });
export const setUserProfile = (data) => ({ type: SET_USER_PROFILE, data })
export const profileIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });
export const setStatus = (status) => ({ type: SET_STATUS, status });

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
        }
    }
}

export default profile_reducer