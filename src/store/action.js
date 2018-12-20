export const ADD_TODO = 'ADD_TODO'
export function add_todo (text) {
    // let t = await get(text)
    return  {
        type: ADD_TODO,
        text
    }
}

// function get(text) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve('我是异步数据    ::::' + text)
//         }, 5000)
//     })
// }