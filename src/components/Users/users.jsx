import React from 'react'
import s from './users.module.css'
import axios from 'axios'
import userPhoto from '../../assets/img/user.avif'

const Users = props => {
	if (props.users.length === 0) {
		axios
			.get('https://social-network.samuraijs.com/api/1.0/users')
			.then(Response => {
				props.setUsers(Response.data.items)
			})

		// props.setUsers([
		// 	{
		// 		id: 1,
		// 		photoUrl:
		// 			'https://img.freepik.com/premium-photo/graphic-designer-digital-avatar-generative-ai_934475-9292.jpg',
		// 		followed: false,
		// 		fullName: 'Yury',
		// 		status: 'I am a boss',
		// 		location: { city: 'Ivanovo', country: 'Russia' },
		// 	},
		// 	{
		// 		id: 2,
		// 		photoUrl:
		// 			'https://img.freepik.com/premium-photo/graphic-designer-digital-avatar-generative-ai_934475-9292.jpg',
		// 		followed: false,
		// 		fullName: 'Roma',
		// 		status: 'I am a boss too',
		// 		location: { city: 'Moscow', country: 'Russia' },
		// 	},
		// 	{
		// 		id: 3,
		// 		photoUrl:
		// 			'https://img.freepik.com/premium-photo/graphic-designer-digital-avatar-generative-ai_934475-9292.jpg',
		// 		followed: true,
		// 		fullName: 'Sasha',
		// 		status: 'I am a boss too',
		// 		location: { city: 'Minsk', country: 'Belarus' },
		// 	},
		// ])
	}

	return props.users.map(u => (
		<div key={u.id}>
			<span>
				<div>
					<img
						className={s.userPhoto}
						src={u.photos.small != null ? u.photos.small : userPhoto}
					/>
				</div>
			</span>
			<span>
				<div>
					{u.followed ? (
						<button
							onClick={() => {
								props.unfollow(u.id)
							}}
						>
							Unfollow
						</button>
					) : (
						<button
							onClick={() => {
								props.follow(u.id)
							}}
						>
							Follow
						</button>
					)}
				</div>
			</span>
			<span>
				<span>
					<div>{u.name}</div>
					<div>{u.status}</div>
				</span>
				<span>
					<div>{'u.location.country'}</div>
					<div>{'u.location.city'}</div>
				</span>
			</span>
		</div>
	))
}

export default Users
