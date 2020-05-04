import { getAuth } from "./auth_reducer";

const INITIALIZE_SUCCESS = 'INITIALIZE_SUCCESS';

let initialState = {
    initialized: false
};

const initial_reducer = (state = initialState, action) => {
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

export const initialSuccess = () => ({ type: INITIALIZE_SUCCESS });

export const initialApp = () => {
    return (dispatch) => {
        let promise = dispatch(getAuth())
        promise.then(() => {
            dispatch(initialSuccess())
        })
    }
}


export default initial_reducer