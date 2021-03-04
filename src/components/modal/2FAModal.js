import react, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyToken } from '../../actions/authActions';
import Modal from './Modal';

const TwoFactorAuthModal = ({ isShowModal, closeModal, history }) => {
  const [authyToken, setAuthyToken] = useState('');
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(verifyToken({ authyToken }, history));
  };

  return isShowModal ? (
    <Modal
      title="Two Factor Auth"
      headerBg="bg-primary"
      closeModal={closeModal}
    >
      <form className="flex flex-col" onSubmit={onSubmitHandler}>
        <p className="text-center">
          {`We have sent a temporary verification code to
          ${auth.user.phoneNumber}, Enter the code to verify`}
        </p>
        <input
          type="number"
          value={authyToken}
          onChange={(e) => setAuthyToken(e.target.value)}
          placeholder="Enter token here"
          className="mt-4 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button className="border border-primary text-primary hover:bg-primary hover:text-white mt-5 px-2 text-sm uppercase font-medium">
          confirm
        </button>
      </form>
    </Modal>
  ) : null;
};

export default TwoFactorAuthModal;
