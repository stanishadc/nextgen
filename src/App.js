import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from "history";
import SignIn from './Public/SignIn';
import Register from './Public/Register';
import { UserRoutes } from './UserRoutes';
import UserServices from './Users/UServices';
import UserServiceDetails from './Users/UServiceDetails';
import { AdminRoutes } from './AdminRoutes';
import AdminServices from './Admin/AServices';
import AdminServiceDetails from './Admin/AServiceDetails';
import { ExecutiveRoutes } from './ExecutiveRoutes';
import ExecutiveServices from './Executive/EServices';
import ExecutiveServiceDetails from './Executive/EServiceDetails';
import pagination from './Common/Pagination';
export const history = createBrowserHistory();
export default class App extends Component {
  render() {
    return (
      <div>
        <Router history={history}>
          <Switch>
            <Route exact path='/' component={SignIn} />
            <Route path='/signin' component={SignIn} />
            <Route path='/register' component={Register} />
            
            <UserRoutes path='/users/services' component={UserServices} />
            <UserRoutes path='/users/service/details/:id' component={UserServiceDetails} />

            <AdminRoutes path='/admin/services' component={AdminServices} />
            <AdminRoutes path='/admin/service/details/:id' component={AdminServiceDetails} />

            <ExecutiveRoutes path='/executive/services' component={ExecutiveServices} />
            <ExecutiveRoutes path='/executive/service/details/:id' component={ExecutiveServiceDetails} />
          </Switch>
        </Router>
      </div>
    );
  }
}