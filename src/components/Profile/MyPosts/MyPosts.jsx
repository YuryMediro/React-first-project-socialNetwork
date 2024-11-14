import React from 'react'
import s from './MyPosts.module.css'
import Post from './Post/Post'
import { Field, reduxForm } from 'redux-form'

const MyPosts = props => {
	let postsElement = props.posts.map(p => (
		<Post message={p.message} likesCount={p.likesCount} key={p.id} />
	))

	let newPostElement = React.createRef()

	let onAddPost = values => {
		props.addPost(values.newPostText)
	}

	return (
		<div className={s.postsBlock}>
			<h3>My post</h3>
			<AddPostFormRedux onSubmit={onAddPost} />
			<div className={s.posts}>{postsElement}</div>
		</div>
	)
}

const AddNewPostForm = props => {
	return (
		<form onSubmit={props.handleSubmit}>
			<div>
				<Field component={'textarea'} name='newPostText' />
			</div>
			<div>
				<button>Add post</button>
			</div>
		</form>
	)
}

const AddPostFormRedux = reduxForm({ form: 'ProfileAddNewPostForm' })(
	AddNewPostForm
)

export default MyPosts
