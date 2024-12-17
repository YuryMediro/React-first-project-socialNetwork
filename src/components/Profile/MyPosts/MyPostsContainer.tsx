import { actions } from '../../../Redux/profile-reducer'
import { AppDispatch } from '../../../Redux/redux-store'
import {
	getNewPostText,
	getPosts,
} from '../../../Redux/selectors/myPosts-selectors'
import { MyPosts } from './MyPosts'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

export const MyPostsContainer = () => {
	const useAppDispatch: () => AppDispatch = useDispatch
	const dispatch = useAppDispatch()
	const posts = useSelector(getPosts)
	const newPostText = useSelector(getNewPostText)

	const addPost = (newPostText: string) => {
		dispatch(actions.addPostActionCreator(newPostText))
	}
	return <MyPosts addPost={addPost} posts={posts} newPostText={newPostText} />
}
