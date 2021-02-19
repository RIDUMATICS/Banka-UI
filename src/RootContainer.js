import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import PrivateRoute from './components/PrivateRoute';
import Profile from './components/Profile';
import Accounts from './components/Accounts';
import Transactions from './components/Transactions';
import AccountsAdmin from './components/AccountsAdmin';
import AccountDetails from './components/AccountDetails';
import Setting from './components/setting/Setting';
import Alert from './components/Alert';
import { useSelector } from 'react-redux';

const RootContainer = ({ alert }) => {
  const _alert = useSelector((state) => state.alert);

  return (
    <Router>
      {_alert.message && <Alert message={_alert.message} type={_alert.type} />}
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={SignUp} />
      <Switch>
        <PrivateRoute path="/dashboard" exact component={Profile} />
        <PrivateRoute
          path="/dashboard/accounts/user"
          exact
          component={Accounts}
        />
        <PrivateRoute
          path="/dashboard/accounts/:accountNumber"
          exact
          component={AccountDetails}
        />
        <PrivateRoute
          path="/dashboard/accounts"
          exact
          component={AccountsAdmin}
        />
        <PrivateRoute
          path="/dashboard/transactions/:transactionId"
          component={Transactions}
        />
        <PrivateRoute path="/settings" component={Setting} />
      </Switch>
    </Router>
  );
  
}

export default RootContainer;
