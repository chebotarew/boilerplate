import { handleActions } from 'redux-actions'
import { ActionTypes } from '../constants/ActionTypes.constant'

export const initialState = {
	count: 1,
}

const red = handleActions(
	{
		[ActionTypes.auth.setUser]: (state, action) => ({
			...state,
			count: state.count + 1,
		}),
	},
	initialState
)

export const reducer = red
