import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import profile_reducer from "./profile_reducer";
import dialogs_reducer from "./dialogs_reducer";
import users_reducer from "./users_reducer";
import initial_reducer from "./initial_reducer";
import auth_reducer from "./auth_reducer";
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';

let reducers = combineReducers({
    profilePage: profile_reducer,
    dialogsPage: dialogs_reducer,
    usersPage  : users_reducer,
    auth       : auth_reducer,
    initial    : initial_reducer,
    form       : formReducer
});

type ReducerType = typeof reducers
export type AppStateType = ReturnType<ReducerType>

// @ts-ignore comment
const composeEnhancers = window.__REDUX_DEVOTES_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunkMiddleware)
    ));
    
//const store = createStore(reducer, /* preloadedState, */ compose(
//let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;