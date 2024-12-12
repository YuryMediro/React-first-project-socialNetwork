import { PostsType } from '../../../types/types'
import AddPostForm, {
	AddNewPostFormValuesType,
} from './AddPostForm/AddPostForm'
import s from './MyPosts.module.css'
import Post from './Post/Post'

type MyPostsPropsType = {
	posts: Array<PostsType>
	addPost: (postText: string) => void
}

const MyPosts = ({ posts, addPost }: MyPostsPropsType) => {
	let postsElement = posts.map(p => (
		<Post message={p.message} likesCount={p.likesCount} key={p.id} />
	))

	let onAddPost = (values: AddNewPostFormValuesType) => {
		addPost(values.newPostText)
	}

	return (
		<div className={s.postsBlock}>
			<h3>My post</h3>
			<AddPostForm onSubmit={onAddPost} />
			<div className={s.posts}>{postsElement}</div>
		</div>
	)
}

export default MyPosts
