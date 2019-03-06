import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import rootReducer from './root'

/*
	create object history 
*/
export const history = createHistory()

const initialState = {}
const enhancers = []

/*
	declare all middleware
*/
const middleware = [
	/*
		bind redux-thunk
	*/
	thunk,

	/*
		bind react-router-redux
	*/
	routerMiddleware(history)
]

/*
	in development environtment we use devtool for debug redux
*/
if (process.env.NODE_ENV === 'development') {
	const devToolsExtension = window.devToolsExtension

	if (typeof devToolsExtension === 'function') {
		enhancers.push(devToolsExtension())
	}
}

/*
	unite all middleware here
*/
const composedEnhancers = compose(
	applyMiddleware(...middleware),
	...enhancers
)

const store = createStore(
	rootReducer,
	initialState,
	composedEnhancers
)

export default store