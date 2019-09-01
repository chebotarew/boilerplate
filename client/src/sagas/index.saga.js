import { takeLatest } from 'redux-saga/effects'
import { TEST_CONSTANT } from '../constants/ActionTypes.constant'

function* testSagas(action) {
    try {
        console.log(action)
    } catch (e) {
        console.error(e)
    }
}

function* sagas() {
    yield takeLatest(TEST_CONSTANT, testSagas)
}

export default sagas
