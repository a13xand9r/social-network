import profile_reducer from "./redux/profile_reducer";
import dialogs_reducer from "./redux/dialogs_reducer";

let store = {
    _subscriber(){
        alert('no subscribers yet');
    },
    _state: {
        profilePage: {
            users: [
                { name: "Новиков Александр" },
                { name: "Кретова Юлия" }
            ],
            postData: [
                { id: '1', message: 'Whats up!', like: '3' },
                { id: '2', message: 'hey, YO, how are you doing', like: '0' },
                { id: '3', message: 'Happy birthday to you broooooooooooooooooooooo', like: '20' },
            ],
            newMessageText: ''
        },
        dialogsPage: {
            dialogUsers: [
                { id: '1', name: 'Artem' },
                { id: '2', name: 'Yulia' },
                { id: '3', name: 'Yaric' },
                { id: '4', name: 'Oleg' },
            ],
            messageData: [
                { id: '1', message: 'Hi, how are you?' },
                { id: '2', message: 'I\'m good, thanks' },
            ],
            newMessageText: ''
        }
    },
    subscribe(observer){
        this._subscriber = observer;
    },
    getState(){
        return this._state;
    },
    dispatch(action){
        this._state.profilePage = profile_reducer(action, this._state.profilePage);
        this._state.dialogsPage = dialogs_reducer(action, this._state.dialogsPage);
        this._subscriber(this);
    }
}

export default store;