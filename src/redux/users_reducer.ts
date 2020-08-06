import { usersAPI, followAPI, GetUsersType, FollowType } from "../api/api";
import { UsersType } from "../types/types";
import { AppStateType, InferActionType, BaseThunkType } from "./redux_store";

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

export const actions = {
    followUser: (userId: number, followBool: boolean) => ({ type: FOLLOW, userId, followBool } as const),
    setUsers: (users: Array<UsersType>, totalCount: number) => ({ type: SET_USERS, users, totalCount } as const),
    toggleIsFetching: (isFetching: boolean) => ({ type: TOGGLE_IS_FETCHING, isFetching } as const),
    toggleIsFetchingFollow: (isFetching: boolean, userId: number) => ({ type: TOGGLE_IS_FETCHING_FOLLOW, isFetching, userId } as const),
    changeCurrentPage: (pageNumber: number)  => ({type: CHANGE_CURRENT_PAGE, pageNumber} as const)
}

export const getUsers = (pageNumber: number, itemsOnPage: number): ThunkType => {
    return (dispatch, getState: () => AppStateType) => {
        dispatch(actions.toggleIsFetching(true));
        usersAPI.getUsers(pageNumber, itemsOnPage)
        .then((response: GetUsersType) => {
            dispatch(actions.setUsers(response.items, response.totalCount));
            dispatch(actions.changeCurrentPage(pageNumber));
            dispatch(actions.toggleIsFetching(false));
        })
    }
}

export const followUnFollow = (userId: number, followed: boolean): ThunkType => {
    return (dispatch, getState: () => AppStateType) => {
        dispatch(actions.toggleIsFetchingFollow(true, userId));
        if (!followed) {
           followAPI.follow(userId)
                .then((response: FollowType) => {
                    dispatch(actions.toggleIsFetchingFollow(false, userId));
                    if (response.resultCode === 0) {
                        dispatch(actions.followUser(userId, true))
                    }
                })
        } else {
            followAPI.unFollow(userId)
                .then((response: FollowType) => {
                    dispatch(actions.toggleIsFetchingFollow(false, userId));
                    if (response.resultCode === 0) {
                        dispatch(actions.followUser(userId, false))
                    }
                })
        }
    }
}

export default users_reducer

export type InitialStateType = typeof initialState;
type ActionsType = InferActionType<typeof actions>
type ThunkType = BaseThunkType<ActionsType> 