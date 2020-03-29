import { BrowserRouter,Route, Switch } from 'react-router-dom';
import React from 'react';

import Login from './pages/login';
import Register from './pages/register';
import Profile from './pages/profile';
import NewIncident from './pages/new-incident';

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}></Route>
                <Route path="/register" component={Register}></Route> 
                <Route path="/profile" component={Profile}></Route> 
                <Route path="/incident/new" component={NewIncident}></Route> 
            </Switch>
        </BrowserRouter>
    );
}
