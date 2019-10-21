import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Landing from '../components/Landing';
import NoAuthLanding from '../components/NoAuthLanding';

// Now we can setup our routes to be aware of our authentication
// and render based off of someone being logged in or not

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route
                    exact
                    path="/"
                    render={NoAuthLanding}
                />
            </Switch>
        </Router>
    )
}

export default Routes