export const ADD_TODO = 'ADD_TODO'
export function add_todo (text) {
    return  {
        tpye: ADD_TODO,
        text
    }
}