import { AppStateType } from "./redux_store"

export const getProfilePage = (state: AppStateType) => {
    return state.profilePage
}
export const getUserId = (state: AppStateType) => {
    return state.auth.userId
}
export const getIsAuth = (state: AppStateType) => {
    return state.auth.isAuth
}
export const getIsAuthRequested = (state: AppStateType) => {
    return state.auth.isAuthRequested
}