import { actions, DialogsInitialStateType } from '../../../redux/dialogs_reducer';
import { connect } from 'react-redux';
import Dialogs from './Dialogs';
import { compose, Dispatch } from 'redux';
import { withAuthRedirect } from '../../../HOC/withAuthRedirect';
import { withRouter } from 'react-router-dom';
import { reset } from 'redux-form';
import { AppStateType } from '../../../redux/redux_store';

type StateToPropsType = {
    dialogsPage: DialogsInitialStateType
}
type DispatchToPropsType = {
    sendMessage: (messageBody: string) => void
}

const mapStateToProps = (state: AppStateType): StateToPropsType => {
    return{
        dialogsPage: state.dialogsPage
    }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchToPropsType => {
    return{
        sendMessage: (messageBody)  => {
            dispatch(actions.addMessageActionCreator(messageBody))
            dispatch(reset('dialogMessage'))
        }
    }
}

export default compose(
    connect<StateToPropsType, DispatchToPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps),
    withRouter,
    withAuthRedirect
)(Dialogs) as React.ComponentType