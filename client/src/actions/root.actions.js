import { ActionTypes } from '../constants/ActionTypes.constant'

export const registerAction = payload => ({
	type: ActionTypes.auth.register,
	payload,
})

export const loginAction = payload => ({
	type: ActionTypes.auth.login,
	payload,
})

export const logoutAction = payload => ({
	type: ActionTypes.auth.logout,
	payload,
})

export const sertUserAction = payload => ({
	type: ActionTypes.auth.setUser,
	payload,
})

export const addObject = payload => ({
	type: ActionTypes.object.add,
	payload,
})
