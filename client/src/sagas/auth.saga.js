import { ActionTypes } from '../constants/ActionTypes.constant'
import { takeEvery, call, put } from 'redux-saga/effects'
import { registerApi } from '../api/auth.api'

export function* registerUser(action) {
	try {
		const res = yield call(registerApi, action.payload)
		console.log(res)
		// yield put(setUserData(res.data))
		console.log(action)
	} catch (e) {
		console.log(e)
	}
}

export const saga = function* saga() {
	yield takeEvery(ActionTypes.auth.register, registerUser)
}
