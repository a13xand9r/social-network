import { usersAPI, followAPI } from "../api/api";

const FOLLOW                       = 'FOLLOW';
const SET_USERS                    = 'SET_USERS';
const TOGGLE_IS_FETCHING           = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FETCHING_FOLLOW    = 'TOGGLE_IS_FETCHING_FOLLOW';
const CHANGE_CURRENT_PAGE          = 'CHANGE_CURRENT_PAGE';

let initialState = {
    users: [],
    //pagesCount: 1,
    itemsOnPage: 30,
    currentPage: 1,
    totalUsers: 0,
    isFetching: false,
    FetchingFollowDisable: []
};

const friends_reducer = (state = initialState, action) => {
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

export const followUser             = (userId, followBool) => ({type: FOLLOW, userId, followBool});
export const setUsers               = (users, totalCount)  => ({type: SET_USERS, users, totalCount});
export const toggleIsFetching       = (isFetching)         => ({type: TOGGLE_IS_FETCHING, isFetching});
export const toggleIsFetchingFollow = (isFetching, userId) => ({type: TOGGLE_IS_FETCHING_FOLLOW, isFetching, userId});
export const changeCurrentPage      = (pageNumber)         => ({type: CHANGE_CURRENT_PAGE, pageNumber});

export const getUsers = (pageNumber, itemsOnPage) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        usersAPI.getUsers(pageNumber, itemsOnPage)
        .then(response => {
            dispatch(setUsers(response.items, response.totalCount));
            dispatch(changeCurrentPage(pageNumber));
            dispatch(toggleIsFetching(false));
        })
    }
}

export const followUnFollow = (userId, followed) => {
    return (dispatch) => {
        dispatch(toggleIsFetchingFollow(true, userId));
        if (!followed) {
           followAPI.follow(userId)
                .then(response => {
                    dispatch(toggleIsFetchingFollow(false, userId));
                    if (response.resultCode === 0) {
                        dispatch(followUser(userId, true))
                    }
                })
        } else {
            followAPI.unFollow(userId)
                .then(response => {
                    dispatch(toggleIsFetchingFollow(false, userId));
                    if (response.resultCode === 0) {
                        dispatch(followUser(userId, false))
                    }
                })
        }
    }
}

export default friends_reducer