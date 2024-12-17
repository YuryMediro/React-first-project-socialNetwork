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

// Комбинируем редьюсеры
let rootReducers = combineReducers({
	profilePage: profileReducer,
	dialogsPage: dialogsReducer,
	sidebar: sidebarReducer,
	usersPage: usersReducer,
	auth: authReducer,
	form: formReducer,
	app: appReducer,
})

// Типы состояния приложения
export type AppStateType = ReturnType<typeof rootReducers> //тип всего приложения STATE
export type AppDispatch = typeof store.dispatch //Типизация useDispatch
// Типизация для actions
export type InferActionsType<T> = T extends {
	[keys: string]: (...args: any[]) => infer U
}
	? U
	: never // это надо для action

// Типизация для thunk
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<
	R,
	AppStateType,
	unknown,
	A
>

// Создаём store
// const store = configureStore({
//   reducer: rootReducer,
// }); Redux-toolkit
//@ts-ignore
const store = legacy_createStore(rootReducers, applyMiddleware(thunk))

// Расширяем тип Window
declare global {
	interface Window {
		store: typeof store
	}
}

window.store = store

export default store
