import { getAuth } from "./auth_reducer";
import { InferActionType, BaseThunkType } from "./redux_store";

let initialState = {
    initialized: false
};

const initial_reducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch(action.type){
        case 'INITIAL_INITIALIZE_SUCCESS': {
            return {
                ...state,
                initialized: true
            }
        }
        default: return state;
    }
}


export const actions = {
    initialSuccess: () => ({ type: 'INITIAL_INITIALIZE_SUCCESS' })
}

export const initialApp = (): ThunkType => {
    return async (dispatch) => {
        await dispatch(getAuth())
        dispatch(actions.initialSuccess())

    }
}

export default initial_reducer

export type InitialStateType = typeof initialState
type ActionsType = InferActionType<typeof actions>
type ThunkType = BaseThunkType<ActionsType>