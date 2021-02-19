import React, { useEffect } from 'react';
import DashboardLayout from './DashboardLayout';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTable } from '@fortawesome/free-solid-svg-icons';
import { getAllAccounts } from './../actions/accountActions';
import { Redirect, NavLink } from 'react-router-dom';

const Accounts = () => {
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
      <div className="content-wrapper my-5 py-4">
        <div className="container-fluid">
          <div className="card mb-3">
            <div className="card-header">
              <FontAwesomeIcon icon={faTable} /> Accounts
            </div>
            <div className="card-body">
              <div className="row p-2">
                <div className="col-12">
                  <form className="form-inline">
                    Show
                    <select
                      className="form-control mx-2"
                      id="exampleFormControlSelect1"
                    >
                      <option>10</option>
                      <option>20</option>
                      <option>30</option>
                      <option>40</option>
                      <option>50</option>
                    </select>
                    Transactions
                  </form>
                </div>
              </div>
              <div className="table-responsive">
                <table
                  className="table table-bordered"
                  id="dataTable"
                  width="100%"
                  cellspacing="0"
                >
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Account Name</th>
                      <th>Account Number</th>
                      <th>Type</th>
                      <th>Created</th>
                      <th>Status</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {accounts.map(
                      (
                        { accountNumber, user, type, status, createdOn },
                        index
                      ) => (
                        <tr key={accountNumber}>
                          <th>{index + 1}</th>
                          <th>{`${user.firstName} ${user.lastName}`}</th>
                          <th>{accountNumber}</th>
                          <th>{type}</th>
                          <th>{createdOn}</th>
                          <th>{status}</th>
                          <th>
                            <NavLink
                              to={`/dashboard/accounts/${accountNumber}`}
                              className="btn btn-primary"
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
            <div className="card-footer small text-muted">
              Updated yesterday at 11:59 PM
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Accounts;
