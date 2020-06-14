import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from './screens/Login';
import Contacts from './screens/Contacts';
import RegisterContact from './screens/RegisterContact';
import RegisterUser from './screens/RegisterUser';
import ErrorPage from './screens/ErrorPage';
import {ProtectedRoute} from './ProtectedRoute';

const Routes = () => {
    return (<BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login} /> 
            <Route exact path="/login" component={Login} /> 
            <Route exact path="/users/new" component={RegisterUser} />
            <ProtectedRoute exact path="/contacts" component={Contacts} /> 
            <ProtectedRoute exact path="/contacts/new" component={RegisterContact} />
            
            <Route path={'*'} render={() => <ErrorPage error={"Page Not Found"} />} />
        </Switch>
    </BrowserRouter>);
}
 
export default Routes;
