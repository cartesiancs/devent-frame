import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from './components/Main.js'
import NotFound from './components/NotFound.js'
import Login from './components/Login.js'
import Signup from './components/Signup.js'

const App = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={Main} />

                <Route path="/auth/login" component={Login} />
                <Route path="/auth/signup" component={Signup} />

                <Route path='*' component={NotFound} />
            </Switch>

        </div>
    );
};

export default App;