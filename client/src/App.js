import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from './components/Main.js'
import NotFound from './components/NotFound.js'

const App = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={Main} />

                <Route path="/auth/login">
                    <div>fhrmdls</div>
                </Route>

                <Route path='*' component={NotFound} />
            </Switch>

        </div>
    );
};

export default App;