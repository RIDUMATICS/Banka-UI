import react, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';
import DashboardLayout from '../components/DashboardLayout';
import { useModal } from '../utils/customHooks';
import CreditModal from '../components/modal/CreditModal';
import DeleteModal from '../components/modal/DeleteModal';
import DebitModal from '../components/modal/DebitModal';
import UpdateModal from '../components/modal/UpdateModal';
import { getAccountDetails } from '../actions/accountActions';
import currencyFormat from '../utils/currencyFormat';
import dateFormat from '../utils/dateFormat';
import { IoMdReturnLeft } from 'react-icons/io';

const AccountDetails = (props) => {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.account);
  const { accountNumber } = props.match.params;
  const [showDeleteModal, toggleDeleteModal] = useModal();
  const [showUpdateModal, toggleUpdateModal] = useModal();
  const [showCreditModal, toggleCreditModal] = useModal();
  const [showDebitModal, toggleDebitModal] = useModal();

  useEffect(() => {
    dispatch(getAccountDetails(accountNumber));
  }, [accountNumber, dispatch]);

  return (
    <div className="relative">
      <DeleteModal
        isShowModal={showDeleteModal}
        closeModal={toggleDeleteModal}
        accountNumber={accountNumber}
        history={props.history}
      />
      <CreditModal
        isShowModal={showCreditModal}
        closeModal={toggleCreditModal}
        accountNumber={accountNumber}
      />
      <DebitModal
        isShowModal={showDebitModal}
        closeModal={toggleDebitModal}
        accountNumber={accountNumber}
      />
      <UpdateModal
        isShowModal={showUpdateModal}
        closeModal={toggleUpdateModal}
        accountNumber={accountNumber}
      />
      <DashboardLayout>
        <div>
          <button
            onClick={() => props.history.goBack()}
            className="flex items-center text-lg focus:outline-none"
          >
            <IoMdReturnLeft /> Back
          </button>
          <div className="lg:flex items-center justify-between mb-4">
            <h2 className="capitalize text-2xl font-semibold mb-5 lg:m-0">
              Accounts Details
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              <button
                onClick={() => toggleDebitModal()}
                className="lg:mx-2 p-2 border text-xs text-green-700 border-green-700 font-medium outline-none focus:outline-none hover:text-white hover:bg-green-700"
              >
                Debit Account
              </button>
              <button
                onClick={() => toggleCreditModal()}
                className="lg:mx-2 p-2 border text-xs text-green-700 border-green-700 font-medium outline-none focus:outline-none hover:text-white hover:bg-green-700"
              >
                Credit Account
              </button>
              <button
                onClick={() => toggleUpdateModal()}
                className="lg:mx-2 p-2 border text-xs text-green-700 border-green-700 font-medium outline-none focus:outline-none hover:text-white hover:bg-green-700"
              >
                Update Account
              </button>
              <button
                onClick={() => toggleDeleteModal()}
                className="lg:mx-2 p-2 border text-xs text-red-700 border-red-700 font-medium outline-none focus:outline-none hover:text-white hover:bg-red-700"
              >
                Delete Account
              </button>
            </div>
          </div>
          <div className="bg-white p-4">
            <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:divide-x xl:flex xl:justify-evenly xl:items-center">
              <li className="p-2">
                <p className="font-semibold text-lg">Account Name: </p>
                <p className="ml-2">
                  {account.user &&
                    `${account.user.firstName} ${account.user.lastName}`}
                </p>
              </li>
              <li className="p-2">
                <p className="font-semibold text-lg">Account Number: </p>
                <p className="ml-2">{account.accountNumber}</p>
              </li>
              <li className="p-2">
                <p className="font-semibold text-lg">Account Balance: </p>
                <p className="ml-2">{currencyFormat(account.balance)}</p>
              </li>
              <li className="p-2">
                <p className="font-semibold text-lg">Status: </p>
                <span className="ml-2 capitalize flex items-center">
                  <span
                    className={classnames('w-3 h-3 rounded-full mr-2', {
                      'bg-red-700': account.status === 'dormant',
                      'bg-gray-700': account.status === 'draft',
                      'bg-green-700': account.status === 'active',
                    })}
                  ></span>
                  <p>{account.status}</p>
                </span>
              </li>
              <li className="p-2">
                <p className="font-semibold text-lg">Created: </p>
                <p className="ml-2">{dateFormat(account.createdOn)}</p>
              </li>
            </ul>
          </div>
          <section className="bg-white my-10 p-5">
            <h3>Transactions</h3>
            <div className="overflow-x-auto">
              <table
                className="table-auto text-left border p-4 w-full"
                cellSpacing="0"
              >
                <thead>
                  <tr>
                    <th className="border p-4">Date</th>
                    <th className="border p-4">Transaction</th>
                    <th className="border p-4">Amount</th>
                    <th className="border p-4">Old Balance</th>
                    <th className="border p-4">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {account.transactions.map(
                    (
                      { createdOn, type, amount, oldBalance, newBalance },
                      index
                    ) => (
                      <tr key={index}>
                        <th className="border p-4 font-normal">
                          {dateFormat(createdOn)}
                        </th>
                        <th className="border p-4 font-normal">{type}</th>
                        <th className="border p-4 font-normal">
                          {currencyFormat(amount)}
                        </th>
                        <th className="border p-4 font-normal">
                          {currencyFormat(oldBalance)}
                        </th>
                        <th className="border p-4 font-normal">
                          {currencyFormat(newBalance)}
                        </th>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default AccountDetails;
