import { NavLink } from 'react-router-dom'
import s from './Header.module.css'

type HeaderPropsType = {
	isAuth: boolean
	login: string | null
	logout: () => void
}

const Header = ({ isAuth, login, logout }: HeaderPropsType) => {
	return (
		<header className={s.header}>
			лого
			<div className={s.loginBlock}>
				{isAuth ? (
					<div>
						{login} - <button onClick={logout}>Log out</button>
					</div>
				) : (
					<NavLink to={'/login'}>Login</NavLink>
				)}
			</div>
		</header>
	)
}

export default Header
