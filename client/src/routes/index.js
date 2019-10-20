import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NoAuthLanding from '../components/NoAuthLanding';

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