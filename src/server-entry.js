import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import { Route, Link, StaticRouter as Router, Switch, Redirect} from 'react-router-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './store/reducer'
import {add_todo} from './store/action'

import * as _ from 'lodash'

console.log("At page 'A' :", _);
// const loc = window.location.pathname


function NoMatch({ location }) {
    return (
      <div>
        <h3>
          No match for <code>{location.pathname}</code>
        </h3>
      </div>
    );
}
// console.log(matchRoutes(Routes(), '/'))

function get (req, context) {
    let store = createStore(reducer)
    const Routes = () => (
      <Provider store={store}>
        <Router location={req.url} context={context}>
          <App>
            <Switch>
                <Route exact path="/c" render={() =><Redirect to={{pathname: '/b'}}></Redirect>}></Route>
                <Route exact path="/" render={() =><Redirect to={{pathname: '/b'}}></Redirect>}></Route>
                <Route path="/a" render={(match) =>( <h1>1234234{console.log(match, match.staticContext)}</h1>)}></Route>
                <Route component={NoMatch} />
            </Switch>
          </App>
        </Router>
      </Provider>
    )
    return {Routes, store, add_todo}
}

export default get
