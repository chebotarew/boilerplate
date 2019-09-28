import { all } from 'redux-saga/effects'

import { saga as auth } from './auth.saga'

export const sagas = function* sagas() {
	yield all([auth()])
}
