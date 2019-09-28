import { ActionTypes } from '../constants/ActionTypes.constant'
import { takeEvery, call, put } from 'redux-saga/effects'
import { registerApi, loginApi } from '../api/auth.api'
import { sertUserAction } from '../actions/auth.actions'

export function* registerUser(action) {
	try {
		const res = yield call(registerApi, action.payload)
		yield put(sertUserAction(res))
	} catch (e) {
		console.log(e)
	}
}
export function* loginUser(action) {
	try {
		// const res = yield call(loginApi, action.payload)
		const user = {
			role: 'employee',
			firstName: 'Иван',
			lastName: 'Иванов',
		}
		yield put(sertUserAction(user))
	} catch (e) {
		console.log(e)
	}
}

export const saga = function* saga() {
	yield takeEvery(ActionTypes.auth.register, registerUser)
	yield takeEvery(ActionTypes.auth.login, loginUser)
}
