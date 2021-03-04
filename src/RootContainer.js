import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/Profile';
import Accounts from './pages/Accounts';
import Transactions from './pages/Transactions';
import AccountsAdmin from './pages/AccountsAdmin';
import AccountDetails from './pages/AccountDetails';
import Settings from './pages/Settings'
import Alert from './components/Alert';
import { useSelector } from 'react-redux';
import Transfer from './pages/Transfer';

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
        <PrivateRoute path="/dashboard/transfer" exact component={Transfer} />
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
        <PrivateRoute path="/dashboard/settings" component={Settings} />
      </Switch>
    </Router>
  );
};

export default RootContainer;
