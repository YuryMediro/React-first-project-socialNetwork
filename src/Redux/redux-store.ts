import {
	Action,
	applyMiddleware,
	combineReducers,
	legacy_createStore,
} from 'redux'
import profileReducer from './profile-reducer'
import dialogsReducer from './dialogs-reducer'
import sidebarReducer from './sidebar-reducer '
import usersReducer from './users-reducer'
import authReducer from './auth-reducer'
import { ThunkAction, thunk } from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import appReducer from './app-reducer'

let rootReducers = combineReducers({
	profilePage: profileReducer,
	dialogsPage: dialogsReducer,
	sidebar: sidebarReducer,
	usersPage: usersReducer,
	auth: authReducer,
	form: formReducer,
	app: appReducer,
})

type RootReducersType = typeof rootReducers // (globalState: AppStateType) => AppStateType
export type AppStateType = ReturnType<RootReducersType> //тип всего приложения STATE

export type InferActionsType<T> = T extends {
	[keys: string]: (...args: any[]) => infer U
}
	? U
	: never // это надо для action

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<
	R,
	AppStateType,
	unknown,
	A
>

//@ts-ignore
const store = legacy_createStore(rootReducers, applyMiddleware(thunk))

// window.store = store

export default store
