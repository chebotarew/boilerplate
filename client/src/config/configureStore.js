import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducers, { initialState } from '../reducers'
import { sagas } from '../sagas/index.saga'

const sagaMiddleware = createSagaMiddleware()

export const configureStore = () => {
	let devTools = null
	if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
		devTools = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : null
	}
	const middlewares = devTools ? compose(
		applyMiddleware(sagaMiddleware), devTools,
	) : compose(applyMiddleware(sagaMiddleware))

	const store = createStore(reducers, initialState, middlewares)
	sagaMiddleware.run(sagas)
	return store
}
