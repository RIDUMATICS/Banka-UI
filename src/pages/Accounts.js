import React, { useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { useDispatch, useSelector } from 'react-redux';
import { getAccounts, createAccount } from '../actions/accountActions';
import AccountItem from '../components/AccountItem';
import { Redirect } from 'react-router-dom';
import { useState } from 'react';
import LoadingButton from '../components/LoadingButton';

const Accounts = (props) => {
  const [type, setType] = useState(''); // Account Type [saving || current]
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const accounts = useSelector((state) => state.accounts);

  const onSubmitHandler = async (e) => {
    await dispatch(createAccount({ type }));
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
      <div className="mb-4">
        <h2 className="capitalize text-2xl font-semibold mb-5">Accounts</h2>
        {accounts.length < 2 && (
          <div className="bg-white p-3 my-3 lg:max-w-2xl">
            <h3 className="text-lg font-semibold text-primary">
              Create Account
            </h3>
            <form className="flex flex-col md:flex-row md:py-3 md:items-center capitalize">
              <label className="pt-2">account type</label>
              <select
                value={type}
                className="capitalize focus:outline-none active:outline-none md:mx-3 md:flex-1"
                onChange={(e) => setType(e.target.value)}
              >
                <option disabled value="">
                  select account type
                </option>
                <option value="savings">savings</option>
                <option value="current">current</option>
              </select>
              <LoadingButton
                onClick={onSubmitHandler}
                className="bg-primary disabled:opacity-50 p-3 md:py-2 md:m-0 uppercase text-xl text-white mt-4"
              >
                create
              </LoadingButton>
            </form>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {accounts.map((account) => (
          <AccountItem
            key={account.accountNumber}
            account={account}
            showTransaction={handleShowTransaction}
          />
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Accounts;
