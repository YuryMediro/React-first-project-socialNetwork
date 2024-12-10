import { getAuthUserData } from './auth-reducer'
import { InferActionsType } from './redux-store'

let initialState = {
	initialized: false,
}

export type InitialStateType = typeof initialState

type ActionsTypes = InferActionsType<typeof actions>

const appReducer = (
	state = initialState,
	action: ActionsTypes
): InitialStateType => {
	switch (action.type) {
		case 'app/INITIALIZED_SUCCESS':
			return {
				...state,
				initialized: true,
			}
		default:
			return state
	}
}

export const actions = {
	initializedSuccess: () =>
		({
			type: 'app/INITIALIZED_SUCCESS',
		} as const),
}

export const initializeApp = () => (dispatch: any) => {
	let promise = dispatch(getAuthUserData())
	Promise.all([promise]).then(() => {
		dispatch(actions.initializedSuccess())
	})
}
export default appReducer
