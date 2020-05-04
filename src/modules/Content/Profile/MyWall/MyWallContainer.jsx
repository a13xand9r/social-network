import { addPostActionCreator } from '../../../../redux/profile_reducer';
import MyWall from './MyWall';
import { connect } from 'react-redux';
import { reset } from 'redux-form';

const mapStateToProps = (state) => {
  return {
    posts:            state.profilePage.postData,
    newMessageText:   state.profilePage.newMessageText 
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: (form) => {
      dispatch(addPostActionCreator(form))
      dispatch(reset('wallPost'))
    },
  }
}
const MyWallContainer = connect(mapStateToProps, mapDispatchToProps)(MyWall);

export default MyWallContainer;