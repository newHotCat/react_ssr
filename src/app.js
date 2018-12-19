import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import { Route, Link, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom'
import {Provider} from 'react-redux'
import * as _ from 'lodash'
import store from './store/reducer.jsx'
console.log("At page 'A' :", _);
const Routes = () => (
    <Router>
      <App>
        <Switch>
            <Route exact path="/" render={() =><Redirect to={{pathname: '/b'}}></Redirect>}></Route>
            <Route path="/a" render={(match) =>( <h1>1234234{console.log(match, match.staticContext)}</h1>)}></Route>
            <Route component={NoMatch} />
        </Switch>
      </App>
    </Router>
)

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
// if (!window.__init_server) {
  ReactDOM.render(
    <Provider store={store}>
    <Routes/> 
    </Provider>, document.getElementById('root'))
// }
