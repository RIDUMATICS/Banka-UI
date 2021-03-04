/* eslint-disable import/no-anonymous-default-export */
import react, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Modal from './Modal';
import { getAccountDetails, creditAccount } from '../../actions/accountActions';
import AmountInput from '../AmountInput';
import LoadingButton from '../LoadingButton';

export default ({ isShowModal, closeModal, accountNumber }) => {
  const dispatch = useDispatch();

  const onSubmitHandler = async () => {
    await dispatch(creditAccount(accountNumber, amount));
    await dispatch(getAccountDetails(accountNumber));
    closeModal();
  };

  const [amount, setAmount ] = useState(0);

  return isShowModal ? (
    <Modal
      title="Credit Account"
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
  ) : null;
};
