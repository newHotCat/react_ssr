import {createStore, combineReducers} from 'redux'
import {
    ADD_TODO
} from './action.jsx'

function todos (state = [], action) {
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
const store = createStore(reducer)
export default store;