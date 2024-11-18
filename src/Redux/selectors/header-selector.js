export const getIsAuth = state => {
	return state.auth.isAuth
}
export const getLogin = state => {
	return state.auth.login //если залогинены, то покажется имя
}
