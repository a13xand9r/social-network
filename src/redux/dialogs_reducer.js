const ADD_MESSAGE = 'ADD-MESSAGE';

let initialState = {
    dialogUsers: [
        { id: '1', name: 'Artem' },
        { id: '2', name: 'Yulia' },
        { id: '3', name: 'Yaric' },
        { id: '4', name: 'Oleg' },
    ],
    messageData: [
        { id: '1', message: 'Hi, how are you?' },
        { id: '2', message: 'I\'m good, thanks' },
    ]
};

const dialogs_reducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_MESSAGE:{
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

export const addMessageActionCreator = (messageBody) =>(
    {type: ADD_MESSAGE, messageBody});

export default dialogs_reducer