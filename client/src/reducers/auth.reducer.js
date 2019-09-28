import { handleActions } from 'redux-actions'
import { ActionTypes } from '../constants/ActionTypes.constant'

export const initialState = {
	isAuthorized: false,
	user: null,
}

const red = handleActions(
	{
		[ActionTypes.auth.setUser]: (state, action) => ({
			...state,
			isAuthorized: true,
			user: action.payload,
		}),
	},
	initialState
)

export const reducer = red
