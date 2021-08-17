import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from "history";
import SignIn from './Public/SignIn';
import Register from './Public/Register';

export const history = createBrowserHistory();
export default class App extends Component {
  render() {
   
    return (
      <div>
        <Router history={history}>
          <Switch>
            <Route exact path='/' component={Register} />
            <Route exact path='/signin' component={SignIn} />
            <Route exact path='/register' component={Register} />
            <Route path="*" component={() => "404 NOT FOUND"}></Route>
            
          </Switch></Router>
      </div>
    );
  }
}
