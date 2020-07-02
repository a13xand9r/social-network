import { getAuth } from "./auth_reducer";
import { ThunkAction } from "redux-thunk";
import { AppStateType } from "./redux_store";

const INITIALIZE_SUCCESS = 'INITIALIZE_SUCCESS';

let initialState = {
    initialized: false
};

export type InitialStateType = typeof initialState

const initial_reducer = (state = initialState, action: ActionType): InitialStateType => {
    switch(action.type){
        case INITIALIZE_SUCCESS: {
            return {
                ...state,
                initialized: true
            }
        }
        default: return state;
    }
}

type ActionType = {
    type: typeof INITIALIZE_SUCCESS
}
export const initialSuccess = (): ActionType => ({ type: INITIALIZE_SUCCESS });

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionType>
export const initialApp = (): ThunkType => {
    return async (dispatch) => {
        await dispatch(getAuth())
        dispatch(initialSuccess())

    }
}


export default initial_reducer