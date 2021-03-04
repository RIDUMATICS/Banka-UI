import React, { useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { getTransactions } from '../actions/transactionAction';
import TransactionItem from '../components/TransactionItem';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdReturnLeft, IoMdReturnRight } from 'react-icons/io';

const Transactions = (props) => {
  const dispatch = useDispatch();
  const { transactionId } = props.match.params;
  const transactions = useSelector((state) => state.transactions);
  useEffect(() => {
    dispatch(getTransactions(transactionId));
  }, [transactionId, dispatch]);

  return (
    <DashboardLayout>
      <button onClick={() => props.history.goBack()} className="flex items-center text-lg focus:outline-none">
        <IoMdReturnLeft /> Back
      </button>
      <h2 className="capitalize text-2xl font-semibold mb-5">Transactions</h2>
      <div className="divide-y-2 divide-gray-100">
        {transactions.map((transaction, index) => (
          <TransactionItem key={index} transaction={transaction} />
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Transactions;
