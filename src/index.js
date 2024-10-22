import reportWebVitals from './reportWebVitals'
import store from './Redux/state'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))

let renderEntireTree = state => {
	root.render(
		<React.StrictMode>
			<App
				state={state}
				dispatch={store.dispatch.bind(store)} //забиндили метод store, чтобы он сохранился (.bind(store)) иначе будет undefined. Мы это делаем так-как нее вызываем его от имени store
			/>
		</React.StrictMode>
	)
}

renderEntireTree(store.getState())

store.subscribe(renderEntireTree)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
