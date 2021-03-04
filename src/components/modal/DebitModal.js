/* eslint-disable import/no-anonymous-default-export */
import react, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { debitAccount, getAccountDetails } from '../../actions/accountActions';
import AmountInput from '../AmountInput';
import LoadingButton from '../LoadingButton';
import Modal from './Modal';

export default ({ isShowModal, closeModal, accountNumber }) => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);

  const onSubmitHandler = async () => {
    await dispatch(debitAccount(accountNumber, amount));
    await dispatch(getAccountDetails(accountNumber));
    closeModal();
  };

  return (
    isShowModal && (
      <Modal
        title="Debit Account"
        closeModal={closeModal}
        headerBg="bg-green-700"
      >
        <form className="flex flex-col">
          <label className="text-lg font-medium">Amount</label>
          <AmountInput getAmount={(amount) => setAmount(amount)} />
          <LoadingButton
            onClick={onSubmitHandler}
            className="focus:outline-none disabled:opacity-50 bg-green-600 text-white my-4 py-2 text-lg uppercase font-semibold"
          >
            submit
          </LoadingButton>
        </form>
      </Modal>
    )
  );
};
