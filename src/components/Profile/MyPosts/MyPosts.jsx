import s from './MyPosts.module.css'
import Post from './Post/Post'

const MyPosts = () => {
	return (
		<div>
			my post
			<div>new post</div>
			<div className={s.posts}>
				<Post />
			</div>
		</div>
	)
}

export default MyPosts
