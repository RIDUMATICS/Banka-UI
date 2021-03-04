import react, { useState } from 'react';
import classnames from 'classnames';
import { BsArrowBarUp, BsArrowBarDown } from 'react-icons/bs';
import dateFormat from '../utils/dateFormat';
import currencyFormat from '../utils/currencyFormat';
import { RiArrowDropDownLine } from 'react-icons/ri';

const TransactionItem = ({ transaction }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="">
      <div className="bg-white py-5 px-4 flex items-start">
        <div
          className={classnames('inline-block p-3', {
            'bg-red-200 text-red-700': transaction.type === 'Debit',
            'bg-green-200 text-green-700': transaction.type === 'Credit',
          })}
        >
          {transaction.type === 'Debit' ? (
            <BsArrowBarUp className="text-3xl" />
          ) : (
            <BsArrowBarDown className="text-3xl" />
          )}
        </div>
        <div className="flex-1 mx-5">
          <p className="font-semibold">{transaction.desc}</p>
          <p className="text-gray-400">{dateFormat(transaction.createdOn)}</p>
        </div>
        <div className="flex flex-col justify-between">
          <p
            className={classnames('text-lg mb-2', {
              'text-red-400': transaction.type === 'Debit',
              'text-green-400': transaction.type === 'Credit',
            })}
          >
            {currencyFormat(transaction.amount)}
          </p>
          <button
            onClick={() => setShowMore(!showMore)}
            className="flex items-center text-primary text-sm justify-end focus:outline-none"
          >
            <RiArrowDropDownLine /> {!showMore ? 'more' : 'less'}
          </button>
        </div>
      </div>
      <div
        className={classnames(
          'grid grid-cols-1 md:grid-cols-3 bg-white border-t justify-between overflow-hidden',
          {
            'max-h-0': !showMore,
            'max-h-96 p-4': showMore,
          }
        )}
      >
        <p>
          Previous Balance:
          <span> {currencyFormat(transaction.oldBalance)}</span>
        </p>
        <p>
          New Balance:
          <span> {currencyFormat(transaction.newBalance)}</span>
        </p>
      </div>
    </div>
  );
};

export default TransactionItem;
