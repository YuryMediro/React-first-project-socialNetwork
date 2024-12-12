import s from './Post.module.css'

type PostPropsType = {
	message: string
	likesCount: number
}

const Post = ({ message, likesCount }: PostPropsType) => {
	return (
		<div className={s.item}>
			{message}
			<div>
				<span>like</span> {likesCount}
			</div>
		</div>
	)
}

export default Post
