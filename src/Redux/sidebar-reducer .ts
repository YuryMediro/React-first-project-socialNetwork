import { InferActionsType } from './redux-store'

let initialState = {}

type InitialStateType = typeof initialState

type ActionsTypes = InferActionsType<typeof actions>

const sidebarReducer = (
	state = initialState,
	action: ActionsTypes
): InitialStateType => {
	return state
}

export const actions = {}

export default sidebarReducer
