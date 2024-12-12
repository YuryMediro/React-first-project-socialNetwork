import { actions } from '../../../Redux/profile-reducer'
import { AppStateType } from '../../../Redux/redux-store'
import {
	getNewPostText,
	getPosts,
} from '../../../Redux/selectors/myPosts-selectors'
import MyPosts from './MyPosts'
import { connect } from 'react-redux'

let mapStateToProps = (state: AppStateType) => {
	return {
		posts: getPosts(state),
		newPostText: getNewPostText(state),
	}
}
// let mapDispatchToProps = dispatch => {
// 	return {
// 		addPost: newPostText => {
// 			dispatch(actions.addPostActionCreator(newPostText))
// 		},
// 	}
// }

const MyPostsContainer = connect(mapStateToProps, {
	addPost: actions.addPostActionCreator,
})(MyPosts)

export default MyPostsContainer
