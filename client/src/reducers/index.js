import { handleActions } from 'redux-actions'
import { TEST_CONSTANT } from '../constants/ActionTypes.constant'

export const initialState = {
    count: 1
}

const reducer = handleActions(
    {
        [TEST_CONSTANT]: (state, action) => ({
            ...state,
            count: state.count + action.payload
        })
    },
    initialState
)

export default reducer
