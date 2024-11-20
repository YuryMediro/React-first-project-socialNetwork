import React from 'react'
import s from './users.module.css'
import userPhoto from '../../assets/img/user.avif'
import { NavLink } from 'react-router-dom'

let User = ({ user, followingInProgress, unfollow, follow }) => {
	return (
		<div>
			<span>
				<div>
					<NavLink to={'/profile/' + user.id}>
						<img
							className={s.userPhoto}
							src={user.photos.small != null ? user.photos.small : userPhoto}
						/>
					</NavLink>
				</div>
			</span>
			<span>
				<div>
					{user.followed ? (
						<button
							disabled={followingInProgress.some(id => id === user.id)} //вешаем атрибут если в пропсах followingInProgress будет true кнопа будет заблокирована
							//метод some если в массиве хоть одна id = id пользователя, то тогда она блокируется
							onClick={() => {
								unfollow(user.id)
							}}
						>
							Unfollow
						</button>
					) : (
						<button
							disabled={followingInProgress.some(id => id === user.id)} //вешаем атрибут если в пропсах followingInProgress будет true кнопа будет заблокирована
							//метод some если в массиве хоть одна id = id пользователя, то тогда она блокируется
							onClick={() => {
								follow(user.id)
							}}
						>
							Follow
						</button>
					)}
				</div>
			</span>
			<span>
				<span>
					<div>{user.name}</div>
					<div>{user.status}</div>
				</span>
				<span>
					<div>{'u.location.country'}</div>
					<div>{'u.location.city'}</div>
				</span>
			</span>
		</div>
	)
}

export default User
