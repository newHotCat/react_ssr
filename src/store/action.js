export const ADD_TODO = 'ADD_TODO'
export function add_todo (text) {
    console.log('123', text)
    return  {
        type: ADD_TODO,
        text
    }
}