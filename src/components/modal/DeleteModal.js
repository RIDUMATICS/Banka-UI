import react from 'react';
import { useDispatch } from 'react-redux';
import Modal from './Modal';
import { deleteAccount } from '../../actions/accountActions';
import LoadingButton from '../LoadingButton';

const DeleteModal = ({ isShowModal, closeModal, accountNumber, history }) => {
  const dispatch = useDispatch();

  const onsubmitHandler = async () => {
    await dispatch(deleteAccount(accountNumber, history));
    closeModal();
  };

  return isShowModal ? (
    <Modal title="Delete Account" headerBg="bg-red-600" closeModal={closeModal}>
      <form className="flex flex-col" onSubmit={onsubmitHandler}>
        <p className="text-center">
          This action cannot be undone. This will permanently delete this
          account
        </p>
        <LoadingButton
          onClick={onsubmitHandler}
          className="focus:outline-none disabled:opacity-50 bg-red-600 text-white mt-5 py-2 text-lg uppercase font-medium"
        >
          delete
        </LoadingButton>
      </form>
    </Modal>
  ) : null;
};

export default DeleteModal;
