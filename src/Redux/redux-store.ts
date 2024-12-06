import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import profileReducer from './profile-reducer'
import dialogsReducer from './dialogs-reducer'
import sidebarReducer from './sidebar-reducer '
import usersReducer from './users-reducer'
import authReducer from './auth-reducer'
import { thunk } from 'redux-thunk'
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

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never
export type InferActionsType<T extends { [key: string]: (...args: any[]) => any }> =
	ReturnType<PropertiesTypes<T>> //в типе GetActionsTypes нужно указать
//ограничение\constraint для передаваемого T, указав, что это ОБЯЗАТЕЛЬНО должен
//быть объект, у которого в качестве значения св-ва обязательно функция,
//принимающая что-нибудь и возвращаемая что-нибудь

//@ts-ignore
const store = legacy_createStore(rootReducers, applyMiddleware(thunk))

// window.store = store

export default store
