import react, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { transferAccount } from '../../actions/accountActions';
import currencyFormat from '../../utils/currencyFormat';
import Modal from './Modal';

const TransferModal = ({
  isShowModal,
  closeModal,
  senderAcctNumber,
  amount,
  receiver,
}) => {
  const dispatch = useDispatch();
  const [ password, setPassword ] = useState('');

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    await dispatch(transferAccount(senderAcctNumber, receiver.accountNumber, password, amount));
    closeModal();
  };

  return isShowModal ? (
    <Modal title="Transfer" headerBg="bg-primary" closeModal={closeModal}>
      <form className="flex flex-col">
        <p className="text-center">
          {`You are sending ${currencyFormat(
            amount
          )} to ${receiver.user.lastName.toUpperCase()} ${receiver.user.firstName.toUpperCase()} in Banka. Enter your password to confirm.`}
        </p>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" className="mt-4 focus:outline-none focus:ring-2 focus:ring-primary"/>
        <div className="flex justify-between">
          <button onClick={() => closeModal()}
           className=" border-primary text-primary hover:border-b mt-5 p-1 text-sm capitalize font-medium">
            cancel
          </button>
          <button
            onClick={onsubmitHandler}
            className="border border-primary text-primary hover:bg-primary hover:text-white mt-5 px-2 text-sm uppercase font-medium"
          >
            confirm
          </button>
        </div>
      </form>
    </Modal>
  ) : null;
};

export default TransferModal;
