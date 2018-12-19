import React from 'react'
import {connect} from 'react-redux'
class App extends React.Component {
    constructor () {
        super()
        this.state = {
            text: 1
        }
    }
    componentWillMount() {
        console.log('componentWillMount render 钱')
        setInterval( () => {
            let text = this.state.text + 1
            this.setState({
                text
            })
        }, 4000)
    }
    componentDidMount() {
        console.log('componentDidMount')
        console.log(this.props)
    }
    componentWillUpdate() {
        console.log('componentWillUpdate')
    }
    render () {
        return (
            <div>
                this is App
                <a href="/b">/b</a>
                <a href="/a">/a</a>
                <p>{this.state.text}</p>
                <div className="routes">{this.props.children}</div>
            </div>
        )
    }
}

const select = (state) => {
    console.log(state)
}

export default connect(select)(App)