import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useQuery } from "@apollo/react-hooks";

import Landing from '../components/Landing';
import NoAuthLanding from '../components/NoAuthLanding';

import CURRENT_USER from "../components/Auth/CurrentUser";

const Routes = () => {
  const { data, loading } = useQuery(CURRENT_USER);
  if (loading) return <p>Loading..</p>;
  return (
    <Router>
      <Switch>
        // then we hook into the data to pass the currentUser and it's data through 
        {data && data.currentUser ? (
          <Route
            exact
            path="/"
            render={() => <Landing currentUser={data.currentUser} />}
          />
        ) : (
            <Route path="/" render={NoAuthLanding} />
          )}
      </Switch>
    </Router>
  );
};

export default Routes