import { actions } from '../../../../redux/profile_reducer';
import MyWall from './MyWall';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import { AppStateType } from '../../../../redux/redux_store';
import { PostDataType } from '../../../../types/types';
import { Dispatch } from 'redux';

export type StateToPropsType = {
  posts: Array<PostDataType>
  userSmallPhoto: string | null
  myId: number | null
  myPhoto: string | null
}
export type DispatchToPropsType = {
  addPost: (postText: string, authorId: number | null) => void
  deletePost: (postId: number) => void
  likePost: (postId: number, like: boolean) => void
}

const mapStateToProps = (state: AppStateType): StateToPropsType => {
  return {
    posts:            state.profilePage.postsData,
    userSmallPhoto:   state.profilePage.profileData.photos.small,
    myId:     state.auth.userId,
    myPhoto:          state.auth.smallPhoto     
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchToPropsType => {
  return {
    addPost: (postText, authorId) => {
      dispatch(actions.addPost(postText, authorId ))
      dispatch(reset('wallPost'))
    },
    deletePost: (postId) => {
      dispatch(actions.deletePost(postId))
    },
    likePost: (postId, like) => {
      dispatch(actions.likePost(postId, like))
    },
  }
}

export default connect<StateToPropsType, DispatchToPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps)(MyWall);