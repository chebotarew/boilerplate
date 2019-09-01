import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducers, { initialState } from '../reducers/index'
// import sagas from '../sagas/index.saga'

const sagaMiddleware = createSagaMiddleware()

export const configureStore = () => {
    const middlewares = compose(
        // applyMiddleware(sagaMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
    )
    const store = createStore(reducers, initialState, middlewares)
    // sagaMiddleware.run(sagas)
    return store
}
