import { addMessageActionCreator } from '../../../redux/dialogs_reducer';
import { connect } from 'react-redux';
import Dialogs from './Dialogs';
import { compose } from 'redux';
import { withAuthRedirect } from '../../../HOC/withAuthRedirect';
import { withRouter } from 'react-router-dom';
import { reset } from 'redux-form';

const mapStateToProps = (state) => {
    return{
        dialogsPage: state.dialogsPage
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        sendMessage: (messageBody) => {
            dispatch(addMessageActionCreator(messageBody))
            dispatch(reset('dialogMessage'))
        }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    withAuthRedirect
)(Dialogs)