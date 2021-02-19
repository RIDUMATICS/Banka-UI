import React, { useEffect } from 'react';
import DashboardLayout from './DashboardLayout';
import { useDispatch, useSelector } from 'react-redux';
import { getAccounts, createAccount } from './../actions/accountActions';
import Account from './Account';
import { Redirect } from 'react-router-dom';
import { useState } from 'react';

const Accounts = (props) => {
  const [type, setType] = useState(''); // Account Type [saving || current]
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const accounts = useSelector((state) => state.accounts);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(createAccount({ type }));
  };

  const handleShowTransaction = (accountNumber) => {
    props.history.push(`/dashboard/transactions/${accountNumber}`);
  };

  useEffect(() => {
    dispatch(getAccounts());
  }, [dispatch]);
  return auth.user.isAdmin ? (
    <Redirect to="/dashboard/accounts" />
  ) : (
    <DashboardLayout>
      <div className="content-wrapper">
        <div className="container-fluid">
          <div className="row d-flex justify-content-around">
            {accounts.map((account) => (
              <Account
                key={account.accountNumber}
                account={account}
                showTransaction={handleShowTransaction}
              />
            ))}
            {accounts.length < 2 && (
              <div className="card col-md-" style={{ width: '20rem' }}>
                <div className="card-body">
                  <h5 className="card-title">Create Account</h5>
                  <div className="card-text">
                    <form>
                      <div className="form-group">
                        <label htmlFor="exampleFormControlSelect1">
                          Account Type
                        </label>
                        <select
                          className="form-control"
                          id="exampleFormControlSelect1"
                          defaultValue=""
                          onChange={(e) => setType(e.target.value)}
                        >
                          <option value="" disabled>
                            Select Account Type
                          </option>
                          <option value="savings">Savings</option>
                          <option value="current">Current</option>
                        </select>
                      </div>
                    </form>
                  </div>
                  <button
                    type="button"
                    className="card-link btn btn-primary"
                    onClick={onSubmitHandler}
                  >
                    Create
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Accounts;
