import { combineReducers } from 'redux'
import { reducer as root, initialState as rootState } from './root.reducer'
import { reducer as auth, initialState as authState } from './auth.reducer'

export const initialState = {
	root: rootState,
	auth: authState,
}

export default combineReducers({
	root,
	auth,
})
