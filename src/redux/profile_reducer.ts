import { profileAPI } from '../api/api';
import { stopSubmit, FormAction } from 'redux-form';
import { ProfileDataType, ProfilePhotoType, PostDataType } from '../types/types';
import { AppStateType, InferActionType, BaseThunkType } from './redux_store';
import { AboutMeFormValuesType } from '../Components/Content/Profile/AboutMe';

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
    postsData: [
        { id: 1, message: 'Whats up!', likes: 3, iLike: false, authorId: null},
        { id: 2, message: 'hey, YO, how are you doing', likes: 0, iLike: false, authorId: null },
        { id: 3, message: 'Happy birthday to you broooooooooooooooooooooo', likes: 20, iLike: false, authorId: null },
    ] as Array<PostDataType>,
    isFetching: false
};

const profile_reducer = (state = initialState, action: ActionsType): ProfilePageStateType => {
    switch(action.type){
        case 'PROFILE_ADD_POST': {
            let newPost = {
                id: state.postsData.length ? state.postsData[state.postsData.length - 1].id + 1 : 0,
                message: action.postText,
                likes: 0,
                iLike: false,
                authorId: action.authorId
            };
            return {
                ...state,
                postsData: [...state.postsData, newPost],
            }
        }
        case 'PROFILE_LIKE_POST': {
            return {
                ...state,
                postsData: state.postsData.map(p => {
                    if (action.postId === p.id){
                        return {...p, iLike: action.like, likes: action.like ? p.likes+=1 : p.likes-=1}
                    }
                    return p
                })
            }
        }
        case 'PROFILE_DELETE_POST': {
            return {
                ...state,
                postsData: state.postsData.filter(p => p.id !== action.postId),
            }
        }
        case 'PROFILE_SET_USER_PROFILE': {
            return {
                ...state,
                profileData: action.data
            }
        }
        case 'PROFILE_SET_STATUS': {
            return {
                ...state,
                status: action.status
            }
        }
        case 'PROFILE_TOGGLE_IS_FETCHING':{
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case 'PROFILE_UPDATE_PHOTO':{
            return {
                ...state,
                profileData: {...state.profileData,
                    photos: {...state.profileData.photos, large: action.photos.large} }
            }
        }
        default: return state;
    }
}

export const actions = {
    addPost: (postText: string, authorId: number | null) => ({ type: 'PROFILE_ADD_POST', postText, authorId } as const),
    deletePost: (postId: number) => ({ type: 'PROFILE_DELETE_POST', postId } as const),
    likePost: (postId: number, like: boolean) => ({ type: 'PROFILE_LIKE_POST', postId, like } as const),
    setUserProfile: (data: ProfileDataType) => ({ type: 'PROFILE_SET_USER_PROFILE', data } as const),
    profileIsFetching: (isFetching: boolean) => ({ type: 'PROFILE_TOGGLE_IS_FETCHING', isFetching } as const),
    setStatus: (status: string) => ({ type: 'PROFILE_SET_STATUS', status } as const),
    updatePhotoSuccess: (photos: ProfilePhotoType) => ({ type: 'PROFILE_UPDATE_PHOTO', photos } as const)
}


export const requestProfilePage = (userId: number): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.profileIsFetching(true));
        let response = await profileAPI.getProfile(userId)
        dispatch(actions.setUserProfile(response));
        dispatch(actions.profileIsFetching(false));
    }
}
export const getUserStatus = (userId: number): ThunkType => {
    return async (dispatch) => {
        let response = await profileAPI.getStatus(userId)
        dispatch(actions.setStatus(response));
    }
}

export const updateUserStatus = (statusBody: string): ThunkType => {
    return async (dispatch) => {
        let response = await profileAPI.updateStatus(statusBody)
        if (response.resultCode === 0) {
            dispatch(actions.setStatus(statusBody));
        } else {
            dispatch(stopSubmit('aboutMe', { _error: response.messages }))
        }
    }
}

export const savePhoto = (photoFile: File): ThunkType => {
    return async (dispatch) => {
        let response = await profileAPI.updatePhoto(photoFile)
        if (response.resultCode === 0) {
            dispatch(actions.updatePhotoSuccess(response.data.photos));
        }
    }
}
export const updateAboutMe = (form: AboutMeFormValuesType): ThunkType => {
    return async (dispatch, getState: () => AppStateType) => {
        let response = await profileAPI.updateAboutMe(form)
        let userId = getState().auth.userId
        if (response.resultCode === 0 && userId) {
            dispatch(requestProfilePage(userId));
        }
    }
}

export default profile_reducer

type ActionsType = InferActionType<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction> 
export type ProfilePageStateType = typeof initialState