/* eslint-disable import/no-anonymous-default-export */
import react, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateAccountStatus } from '../../actions/accountActions';
import LoadingButton from '../LoadingButton';
import Modal from './Modal';

export default ({ isShowModal, closeModal, accountNumber, history }) => {
  const [status, setStatus] = useState('');
  const dispatch = useDispatch();

  const onSubmitHandler = async () => {
    await dispatch(updateAccountStatus(accountNumber, status, history));
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
          <select
            type="amount"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border focus:outline-none p-2 text-lg "
          >
            <option value="" disabled>
              select account status
            </option>
            <option value="dormant">dormant</option>
            <option value="active">active</option>
          </select>
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
