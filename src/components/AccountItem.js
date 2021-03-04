import React from 'react';
import classnames from 'classnames';
import currencyFormat from '../utils/currencyFormat';
import dateFormat from '../utils/dateFormat';

const AccountItem = ({ account, showTransaction }) => (
  <div className="bg-white rounded-md overflow-hidden">
    <h2 className="bg-secondary text-white font-semibold text-xl text-center p-4">
      Account Information
    </h2>
    <ul>
      <li className="grid grid-cols-1 xl:grid-cols-2 border-b p-3">
        <p className="font-semibold">Account Number: </p>
        <span className="pt-2 xl:p-0">{account.accountNumber}</span>
      </li>
      <li className="grid grid-cols-1 xl:grid-cols-2 border-b p-3">
        <p className="font-semibold">Account Balance: </p>
        <span className="pt-2 xl:p-0">{currencyFormat(account.balance)}</span>
      </li>
      <li className="grid grid-cols-1 xl:grid-cols-2 border-b p-3">
        <p className="font-semibold">Account Type: </p>
        <span className="pt-2 xl:p-0">{account.type}</span>
      </li>
      <li className="grid grid-cols-1 xl:grid-cols-2 border-b p-3">
        <p className="font-semibold">Account Status: </p>
        <span className="pt-2 xl:p-0 flex items-center">
          <div
            className={classnames('w-3 h-3 rounded-full mr-2', {
              'bg-red-700': account.status === 'dormant',
              'bg-gray-700': account.status === 'draft',
              'bg-green-700': account.status === 'active',
            })}
          ></div>
          <p>{account.status}</p>
        </span>
      </li>
      <li className="grid grid-cols-1 xl:grid-cols-2 border-b p-3">
        <p className="font-semibold">Created On: </p>
        <span className="pt-2 xl:p-0">{dateFormat(account.createdOn)}</span>
      </li>
      <li className=" border-b p-3 text-right">
        <button
          className="text-primary"
          onClick={() => showTransaction(account.accountNumber)}
        >
          View Transactions
        </button>
      </li>
    </ul>
  </div>
);

export default AccountItem;
