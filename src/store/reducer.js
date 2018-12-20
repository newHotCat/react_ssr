import { combineReducers} from 'redux'
import {
    ADD_TODO
} from './action.js'

function todos (state = [1], action) {
    switch (action.type) {
        case ADD_TODO:
            return [...state, action.text]
            break;
        default:
            return state
            break;
    }
}

const reducer = combineReducers({
    todos
})

export default reducer;