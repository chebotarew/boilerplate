import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducers, { initialState } from '../reducers'
import { sagas } from '../sagas/index.saga'

const sagaMiddleware = createSagaMiddleware()

export const configureStore = () => {
	const middlewares = compose(applyMiddleware(sagaMiddleware))
	const store = createStore(reducers, initialState, middlewares)
	sagaMiddleware.run(sagas)
	return store
}
