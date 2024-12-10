import { actions } from '../../../Redux/profile-reducer'
import {
	getNewPostText,
	getPosts,
} from '../../../Redux/selectors/myPosts-selectors'
import MyPosts from './MyPosts'
import { connect } from 'react-redux'

let mapStateToProps = state => {
	return {
		posts: getPosts(state),
		newPostText: getNewPostText(state),
	}
}
let mapDispatchToProps = dispatch => {
	return {
		addPost: newPostText => {
			dispatch(actions.addPostActionCreator(newPostText))
		},
	}
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer
