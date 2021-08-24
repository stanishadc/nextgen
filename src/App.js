import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from "history";
import SignIn from './Public/SignIn';
import Register from './Public/Register';
import { CustomerRoutes } from './CustomerRoutes';
import CustomerServices from  './Customer/CServices';
import CustomerServiceDetails from  './Customer/CServiceDetails';
import { AdminRoutes } from './AdminRoutes';
import AdminServices from  './Admin/AServices';
import AdminServiceDetails from  './Admin/AServiceDetails';
import { ExecutiveRoutes } from './ExecutiveRoutes';
import ExecutiveServices from  './Executive/EServices';
import ExecutiveServiceDetails from  './Executive/EServiceDetails';

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
            <Route path='/customer/services' component={CustomerServices} />
            <CustomerRoutes path='/customer/service/details' component={CustomerServiceDetails} />

            <AdminRoutes path='/admin/services' component={AdminServices} />
            <AdminRoutes path='/admin/service/details' component={AdminServiceDetails} />

            <ExecutiveRoutes path='/executive/services' component={ExecutiveServices} />
            <ExecutiveRoutes path='/executive/service/details' component={ExecutiveServiceDetails} />

            <Route path="*" component={() => "404 NOT FOUND"}></Route>
            
          </Switch></Router>
      </div>
    );
  }
}
