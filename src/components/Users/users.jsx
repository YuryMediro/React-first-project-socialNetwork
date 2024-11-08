import React from 'react'
import s from './users.module.css'
import userPhoto from '../../assets/img/user.avif'
import { NavLink, Navigate } from 'react-router-dom'

let Users = props => {
	let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

	let pages = []
	for (let i = 1; i <= pagesCount; i++) {
		if (pages.length < 14) {
			pages.push(i)
		}
	}
	
	return (
		<div>
			<div>
				{pages.map(p => {
					return (
						<span
							className={props.currentPage === p && s.selectedPage}
							onClick={e => {
								props.onPageChanged(p)
							}}
						>
							{p}
						</span>
					)
				})}
			</div>
			{props.users.map(u => (
				<div key={u.id}>
					<span>
						<div>
							<NavLink to={'/profile/' + u.id}>
								<img
									className={s.userPhoto}
									src={u.photos.small != null ? u.photos.small : userPhoto}
								/>
							</NavLink>
						</div>
					</span>
					<span>
						<div>
							{u.followed ? (
								<button
									disabled={props.followingInProgress.some(id => id === u.id)} //вешаем атрибут если в пропсах followingInProgress будет true кнопа будет заблокирована
									//метод some если в массиве хоть одна id = id пользователя, то тогда она блокируется
									onClick={() => {
										props.unfollow(u.id)
									}}
								>
									Unfollow
								</button>
							) : (
								<button
									disabled={props.followingInProgress.some(id => id === u.id)} //вешаем атрибут если в пропсах followingInProgress будет true кнопа будет заблокирована
									//метод some если в массиве хоть одна id = id пользователя, то тогда она блокируется
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
			))}
		</div>
	)
}

export default Users
