import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from "history";
import SignIn from './Public/SignIn';
import Register from './Public/Register';
import { UserRoutes } from './UserRoutes';
import UserServices from  './Users/UServices';
import UserServiceDetails from  './Users/UServiceDetails';
import { AdminRoutes } from './AdminRoutes';
import AdminServices from  './Admin/AServices';
import AdminServiceDetails from  './Admin/AServiceDetails';
import { ExecutiveRoutes } from './ExecutiveRoutes';
import ExecutiveServices from  './Executive/EServices';
import ExecutiveServiceDetails from  './Executive/EServiceDetails';
import auth from './UserSecurity/CheckAuth';
export const history = createBrowserHistory();
export default class App extends Component {
   render() {   
    return (
      <div>
        <Router history={history}>
          <Switch>
            <Route exact path='/' component={Register} />
            <Route path='/signin' component={SignIn} />
            <Route path='/register' component={Register} />
            
            <Route path='/users/services' component={UserServices} />
            <Route path='/users/service/details/:id' component={UserServiceDetails} />

            <Route path='/admin/services' component={AdminServices} />
            <Route path='/admin/service/details' component={AdminServiceDetails} />

            <Route path='/executive/services' component={ExecutiveServices} />
            <Route path='/executive/service/details' component={ExecutiveServiceDetails} />
          </Switch></Router>
      </div>
    );
  }
}