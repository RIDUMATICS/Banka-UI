import React from 'react';
import DashboardLayout from '../DashboardLayout';
import ChangePassword from './ChangePassword';
import { Route } from 'react-router-dom';
import UpdateDetails from './UpdateDetails';

const Setting = (props) => (
  <DashboardLayout>
    <div className="content-wrapper">
      <div className="container-fluid">
        <Route path="/settings/change-password" component={ChangePassword} />
        <Route path="/settings/update-details" component={UpdateDetails} />
      </div>
    </div>
  </DashboardLayout>
);

export default Setting;
