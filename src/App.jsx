import React from 'react'
import {connect} from 'react-redux'
import {
    add_todo
} from './store/action.js'
import './pages/index.css'
class App extends React.Component {
    constructor () {
        super()
        this.state = {
            text: 1
        }
    }
    componentWillMount() {
        console.log('componentWillMount render 钱')
        // setInterval( () => {
        //     let text = this.state.text + 1
        //     this.setState({
        //         text
        //     })
        // }, 4000)
    }
    componentDidMount() {
        console.log('componentDidMount')
        console.log(this.props)
    }
    componentWillUpdate() {
        console.log('componentWillUpdate')
    }
    handAdd () {
        var val = this.input.value
        console.log(val)
        this.props.dispatch(add_todo(val))
        this.input.value = ''
    }
    render () {
        return (
            <div>
                this is App
                <a href="/b">/b</a>
                <a href="/a">/a</a>
                <p>{this.state.text}</p>
                <input type="text" name="" id="" ref={(input) => this.input = input}/>
                <button onClick={this.handAdd.bind(this)}>点击增加</button>
                <ul>
                    {this.props.todos.map((item, ind) => {
                        return <li key={ind}>{item}</li>
                    })}
                </ul>
                <div className="routes">{this.props.children}</div>
            </div>
        )
    }
}

const select = (state) =>({
    todos: state.todos
})

export default connect(select)(App)