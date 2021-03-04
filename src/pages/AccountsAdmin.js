import React, { useEffect } from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';
import DashboardLayout from '../components/DashboardLayout';
import { getAllAccounts } from '../actions/accountActions';
import dateFormat from '../utils/dateFormat';


const Accounts = (props) => {
  const auth = useSelector((state) => state.auth);
  const accounts = useSelector((state) => state.accounts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAccounts());
  }, [dispatch]);

  return !auth.user.isAdmin ? (
    <Redirect to="/dashboard/accounts/user" />
  ) : (
    <DashboardLayout>
      <div>
        <h2 className="capitalize text-2xl font-semibold mb-5">Accounts</h2>
        <div className="overflow-x-auto">
          <table
            className="table-auto text-left border p-4 w-full bg-white"
            cellSpacing="0"
          >
            <thead>
              <tr>
                <th className="border p-4">Account Name</th>
                <th className="border p-4">Account Number</th>
                <th className="border p-4">Type</th>
                <th className="border p-4">Created</th>
                <th className="border p-4">Status</th>
                <th className="border p-4" />
              </tr>
            </thead>
            <tbody>
              {accounts.map(
                ({ accountNumber, user, type, status, createdOn }, index) => (
                  <tr key={accountNumber}>
                    <th className="border p-4 font-normal">{`${user.firstName} ${user.lastName}`}</th>
                    <th className="border p-4 font-normal">{accountNumber}</th>
                    <th className="border p-4 font-normal capitalize">{type}</th>
                    <th className="border p-4 font-normal">
                      {dateFormat(createdOn)}
                    </th>
                    <th className="border p-4 font-normal capitalize flex items-center">
                      <span className={classnames("w-3 h-3 rounded-full mr-2", {
                        'bg-red-700' : status === 'dormant',
                        'bg-gray-700' : status === 'draft',
                        'bg-green-700' : status === 'active'
                      })}></span>
                      <p>{status}</p>
                    </th>
                    <th className="border p-4 font-normal">
                      <NavLink
                        to={`/dashboard/accounts/${accountNumber}`}
                        className="text-primary hover:border-b-2 border-primary"
                      >
                        Details
                      </NavLink>
                    </th>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Accounts;
