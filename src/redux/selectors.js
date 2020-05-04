export const getProfilePage = (state) => {
    return state.profilePage
}
export const getUserId = (state) => {
    return state.auth.userId
}
export const getIsAuth = (state) => {
    return state.auth.isAuth
}
export const getIsAuthRequested = (state) => {
    return state.auth.isAuthRequested
}