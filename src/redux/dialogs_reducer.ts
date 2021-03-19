import { InferActionType } from './redux_store';

type DialogUsersType = {
    id: string
    name: string
}
type MessageDataType = {
    id: string
    message: string
}
let initialState = {
    dialogUsers: [
        { id: '1', name: 'Artem' },
        { id: '2', name: 'Yulia' },
        { id: '3', name: 'Yaric' },
        { id: '4', name: 'Oleg'  },
    ] as Array<DialogUsersType>,
    messageData: [
        { id: '1', message: 'Hi, how are you?' },
        { id: '2', message: 'I\'m good, thanks' },
    ] as Array<MessageDataType>,
    newMessageText: ''
};

export type DialogsInitialStateType = typeof initialState

const dialogs_reducer = (state: DialogsInitialStateType = initialState, action: ActionType): DialogsInitialStateType => {
    switch(action.type){
        case 'DIALOGS_ADD_MESSAGE':{
            let messageData = {
                id: '5',
                message: action.messageBody
            }
            return {
                ...state,
                messageData: [...state.messageData, messageData],
                newMessageText: ''
            }
        }
        default: return state;
    }
}

type ActionType = InferActionType<typeof actions>
export const actions = {
    addMessageActionCreator: (messageBody: string) =>(
        {type: 'DIALOGS_ADD_MESSAGE', messageBody})
}

export default dialogs_reducer