import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RootPage from './pages/Root'
import SignupPage from './pages/Signup'
import LoginPage from './pages/Login'
import NotfoundPage from './pages/Notfound'
import './App.css'

const App = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={RootPage} />

                <Route path="/auth/login" component={LoginPage} />
                <Route path="/auth/signup" component={SignupPage} />

                <Route path='*' component={NotfoundPage} />
            </Switch>

        </div>
    );
};

export default App;