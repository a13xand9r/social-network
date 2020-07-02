import { usersAPI, followAPI } from "../api/api";
import { UsersType } from "../types/types";
import { ThunkAction } from "redux-thunk";
import { AppStateType } from "./redux_store";

const FOLLOW                       = 'FOLLOW';
const SET_USERS                    = 'SET_USERS';
const TOGGLE_IS_FETCHING           = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FETCHING_FOLLOW    = 'TOGGLE_IS_FETCHING_FOLLOW';
const CHANGE_CURRENT_PAGE          = 'CHANGE_CURRENT_PAGE';


let initialState = {
    users: [] as Array<UsersType>,
    //pagesCount: 1,
    itemsOnPage: 30,
    currentPage: 1,
    totalUsers: 0,
    isFetching: false,
    FetchingFollowDisable: [] as Array<number>
};

export type InitialStateType = typeof initialState;

const users_reducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch(action.type){
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (action.userId === u.id){
                        return {...u, followed: action.followBool};
                    }
                    return u;
                })
            }
        case SET_USERS:
            return {
                ...state,
                users: [...action.users],
                totalUsers: action.totalCount
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case TOGGLE_IS_FETCHING_FOLLOW:
            return {
                ...state,
                FetchingFollowDisable: action.isFetching 
                                         ? [...state.FetchingFollowDisable, action.userId]
                                         : state.FetchingFollowDisable.filter(u => u!==action.userId)
            }
        case CHANGE_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.pageNumber
            }
        default: return state;
    }
}

type ActionsType = FollowUserActionType | SetUsersActionType | IsFetchingActionType | FollowIsFetchingActionType | FollowIsFetchingActionType | ChangeCurrentPageActionType
type FollowUserActionType = {
    type: typeof FOLLOW
    userId: number
    followBool: boolean
}
export const followUser = (userId: number, followBool: boolean): FollowUserActionType => ({ type: FOLLOW, userId, followBool });
type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<UsersType>
    totalCount: number
}
export const setUsers = (users: Array<UsersType>, totalCount: number): SetUsersActionType => ({ type: SET_USERS, users, totalCount });
type IsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): IsFetchingActionType => ({ type: TOGGLE_IS_FETCHING, isFetching });
type FollowIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING_FOLLOW
    isFetching: boolean
    userId: number
}
export const toggleIsFetchingFollow = (isFetching: boolean, userId: number): FollowIsFetchingActionType => ({ type: TOGGLE_IS_FETCHING_FOLLOW, isFetching, userId });
type ChangeCurrentPageActionType = {
    type: typeof CHANGE_CURRENT_PAGE
    pageNumber: number
}
export const changeCurrentPage = (pageNumber: number): ChangeCurrentPageActionType  => ({type: CHANGE_CURRENT_PAGE, pageNumber});

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsType>
export const getUsers = (pageNumber: number, itemsOnPage: number): ThunkType => {
    return (dispatch, getState: () => AppStateType) => {
        dispatch(toggleIsFetching(true));
        usersAPI.getUsers(pageNumber, itemsOnPage)
        .then((response: any) => {
            dispatch(setUsers(response.items, response.totalCount));
            dispatch(changeCurrentPage(pageNumber));
            dispatch(toggleIsFetching(false));
        })
    }
}

export const followUnFollow = (userId: number, followed: boolean): ThunkType => {
    return (dispatch, getState: () => AppStateType) => {
        dispatch(toggleIsFetchingFollow(true, userId));
        if (!followed) {
           followAPI.follow(userId)
                .then((response: any) => {
                    dispatch(toggleIsFetchingFollow(false, userId));
                    if (response.resultCode === 0) {
                        dispatch(followUser(userId, true))
                    }
                })
        } else {
            followAPI.unFollow(userId)
                .then((response: any) => {
                    dispatch(toggleIsFetchingFollow(false, userId));
                    if (response.resultCode === 0) {
                        dispatch(followUser(userId, false))
                    }
                })
        }
    }
}

export default users_reducer