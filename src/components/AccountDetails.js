import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import DashboardLayout from './DashboardLayout';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTable } from '@fortawesome/free-solid-svg-icons';
import {
  getAccountDetails,
  creditAccount,
  debitAccount,
  updateAccountStatus,
  deleteAccount,
} from './../actions/accountActions';
import Modal from './Modal';

const AccountDetails = (props) => {
  const [status, setStatus] = useState('');
  const [amount, setAmount] = useState(0);
  const [showUpdateModel, setShowUpdateModel] = useState(false);
  const [showDebitModel, setShowDebitModel] = useState(false);
  const [showCreditModel, setShowCreditModel] = useState(false);
  const [showDeleteModel, setShowDeleteModel] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const account = useSelector((state) => state.account);
  const { accountNumber } = props.match.params;

  useEffect(() => {
    dispatch(getAccountDetails(accountNumber));
  }, [accountNumber, dispatch]);

  const creditAccountHandler = async () => {
    await dispatch(creditAccount(accountNumber, amount));
    await dispatch(getAccountDetails(accountNumber));
    closeModal();
  };

  const debitAccountHandler = async () => {
    await dispatch(debitAccount(accountNumber, amount));
    await dispatch(getAccountDetails(accountNumber));
    closeModal();
  };

  const updateAccountHandler = async () => {
    await dispatch(updateAccountStatus(accountNumber, status, props.history));
    closeModal();
  };

  const deleteAccountHandler = async () => {
    await dispatch(deleteAccount(accountNumber, props.history));
  };

  const closeModal = () => {
    setStatus('');
    setAmount(0);
    setShowUpdateModel(false);
    setShowCreditModel(false);
    setShowDebitModel(false);
    setShowDeleteModel(false);
  };
  return (
    <DashboardLayout>
      {auth.isLoading && (
        <Loader
          type="BallTriangle"
          color="#00BFFF"
          height={100}
          width={100}
          className="loader"
        />
      )}
      <Modal
        display={showDebitModel}
        title="Debit Account"
        closeModal={closeModal}
      >
        <div class="col-auto">
          <label class="sr-only" htmlFor="inlineFormInputGroup">
            Amount
          </label>
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <div class="input-group-text">Amount</div>
            </div>
            <input
              type="number"
              class="form-control"
              id="inlineFormInputGroup"
              placeholder="amount"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <button
            className="btn btn-primary float-right mx-2"
            onClick={debitAccountHandler}
          >
            Confirm
          </button>
          <button
            className="btn btn-secondary float-right"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </Modal>

      <Modal
        display={showCreditModel}
        title="Credit Account"
        closeModal={closeModal}
      >
        <div class="col-auto">
          <label class="sr-only" htmlFor="inlineFormInputGroup">
            Amount
          </label>
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <div class="input-group-text">Amount</div>
            </div>
            <input
              type="number"
              class="form-control"
              id="inlineFormInputGroup"
              placeholder="amount"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <button
            className="btn btn-primary float-right mx-2"
            onClick={creditAccountHandler}
          >
            Confirm
          </button>
          <button
            className="btn btn-secondary float-right"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </Modal>

      <Modal
        display={showUpdateModel}
        title="Update Account Status"
        closeModal={closeModal}
      >
        <div class="col-auto">
          <label class="sr-only" htmlFor="inlineFormInputGroup">
            Status
          </label>
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <div class="input-group-text">Status</div>
            </div>
            <select
              class="form-control"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="" disabled>
                select account status
              </option>
              <option value="dormant">dormant</option>
              <option value="active">active</option>
            </select>
          </div>
          <button
            className="btn btn-primary float-right mx-2"
            onClick={updateAccountHandler}
          >
            Confirm
          </button>
          <button
            className="btn btn-secondary float-right"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </Modal>

      <Modal
        display={showDeleteModel}
        title="Are you absolutely sure?"
        closeModal={closeModal}
      >
        <div class="col-auto">
          <p>
            This action cannot be undone. This will permanently delete this
            account
          </p>
          <button
            className="btn btn-primary float-right mx-2"
            onClick={deleteAccountHandler}
          >
            Confirm
          </button>
          <button
            className="btn btn-secondary float-right"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </Modal>

      <div className="content-wrapper">
        <div className="container-fluid">
          <div className="row p-2">
            <button
              className="col- btn btn-primary m-2"
              onClick={() => setShowUpdateModel(!showUpdateModel)}
            >
              Update Account Status
            </button>
            <button
              className="col- btn btn-primary m-2"
              onClick={() => setShowDebitModel(!showDebitModel)}
            >
              Debit Account
            </button>
            <button
              className="col- btn btn-primary m-2"
              onClick={() => setShowCreditModel(!showCreditModel)}
            >
              Credit Account
            </button>
            <button
              className="col- btn btn-danger m-2"
              onClick={() => setShowDeleteModel(!showDeleteModel)}
            >
              Delete Account
            </button>
          </div>

          <div class="card mb-3">
            <div class="card-header">
              <FontAwesomeIcon icon={faTable} /> Accounts
            </div>
            <div class="card-body">
              <div className="row p-2">
                <div className="col-md-2 col-md-offset-1">
                  <p>Account Name: </p>
                  <p>
                    {account.user &&
                      `${account.user.firstName} ${account.user.lastName}`}
                  </p>
                </div>
                <div className="col-md-2">
                  <p>Account Number: </p>
                  <p>{account.accountNumber}</p>
                </div>
                <div className="col-md-2">
                  <p>Account Balance: </p>
                  <p>&#8358; {account.balance}</p>
                </div>
                <div className="col-md-2">
                  <p>Status: </p>
                  <p>{account.status}</p>
                </div>
                <div className="col-md-2">
                  <p>Created: </p>
                  <p>{account.createdOn}</p>
                </div>
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
              {!account.transactions || account.transactions <= 0 ? (
                <div class="alert alert-primary" role="alert">
                  Oh! No There are no transactions history on this account at
                  this time
                </div>
              ) : (
                <div class="table-responsive">
                  <table
                    class="table table-bordered"
                    id="dataTable"
                    width="100%"
                    cellspacing="0"
                  >
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Transaction</th>
                        <th>Amount</th>
                        <th>Old Balance</th>
                        <th>Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {account.transactions
                        .reverse()
                        .map(
                          ({
                            createdOn,
                            type,
                            amount,
                            oldBalance,
                            newBalance,
                          }) => (
                            <tr>
                              <th>{createdOn}</th>
                              <th>{type}</th>
                              <th>{amount}</th>
                              <th>{oldBalance}</th>
                              <th>{newBalance}</th>
                            </tr>
                          )
                        )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            <div class="card-footer small text-muted">
              Updated yesterday at 11:59 PM
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AccountDetails;
