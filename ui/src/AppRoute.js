import React from 'react';
import {
  HashRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import AccountAdd from './component/AccountAdd';
import AccountList from './component/AccountList';
import Menu from './component/Menu';

export const AppRoute = (props) => {
    
      return (
      <div>
        <Router>
          <Switch>
            <Route exact path='/' >
              <Menu />
              <AccountList />
            </Route>
            <Route exact path='/add' >
              <Menu />
              <AccountAdd />
            </Route>
          </Switch>
        </Router>
      </div>
      )

  };
  