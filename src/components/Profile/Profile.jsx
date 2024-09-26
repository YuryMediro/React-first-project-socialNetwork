import MyPosts from './MyPosts/MyPosts'
import s from './Profile.module.css'

const Profile = () => {
	return (
		<div className={s.content}>
			<div>лого</div>
			<div>ava + desc</div>
			<MyPosts />
		</div>
	)
}

export default Profile
