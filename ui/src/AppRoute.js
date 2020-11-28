import React from 'react';
import {
  HashRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import AccountAdd from './component/AccountAdd';
import AccountList from './component/AccountList';

export const AppRoute = (props) => {
    
      return (
      <div>
        <Router>
          <Switch>
            <Route exact path='/' >
              <AccountList />
            </Route>
            <Route exact path='/add' >
              <AccountAdd />
            </Route>
          </Switch>
        </Router>
      </div>
      )

  };
  