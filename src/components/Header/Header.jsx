import { NavLink } from 'react-router-dom'
import s from './Header.module.css'

const Header = props => {
	return (
		<header className={s.header}>
			лого
			<div className={s.loginBlock}>
				{props.isAuth ? props.login : <NavLink to={'/login'}>Login</NavLink>}
				{/* если мы авторизованы, то мы покажем login, если нет покажем ссылку на
				авторизацию */}
			</div>
		</header>
	)
}

export default Header
