import React from 'react'
import s from './users.module.css'
import axios from 'axios'
import userPhoto from '../../assets/img/user.avif'

class Users extends React.Component {
	componentDidMount() {
		axios
			.get('https://social-network.samuraijs.com/api/1.0/users')
			.then(Response => {
				this.props.setUsers(Response.data.items)
			})
	}

	render() {
		return (
			<div>
				{this.props.users.map(u => (
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
											this.props.unfollow(u.id)
										}}
									>
										Unfollow
									</button>
								) : (
									<button
										onClick={() => {
											this.props.follow(u.id)
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
				))}
			</div>
		)
	}
}

export default Users
