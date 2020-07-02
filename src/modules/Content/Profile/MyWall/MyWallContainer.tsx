import { addPostActionCreator } from '../../../../redux/profile_reducer';
import MyWall from './MyWall';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import { AppStateType } from '../../../../redux/redux_store';
import { PostDataType } from '../../../../types/types';

type StateToPropsType = {
  posts: Array<PostDataType>
  userSmallPhoto: string | null
}
type DispatchToPropsType = {
  addPost: (postText: string) => void
}

const mapStateToProps = (state: AppStateType): StateToPropsType => {
  return {
    posts:            state.profilePage.postData,
    userSmallPhoto:   state.profilePage.profileData.photos.small 
  }
}

const mapDispatchToProps = (dispatch: any): DispatchToPropsType => {
  return {
    addPost: (postText) => {
      dispatch(addPostActionCreator(postText))
      dispatch(reset('wallPost'))
    },
  }
}

export default connect<StateToPropsType, DispatchToPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps)(MyWall);