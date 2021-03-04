import react, { useEffect, useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import AmountInput from '../components/AmountInput';
import { getAccounts, verifyAccount } from '../actions/accountActions';
import { useDispatch, useSelector } from 'react-redux';
import TransferModal from '../components/modal/TransferModal';
import { useModal } from '../utils/customHooks';
import LoadingButton from '../components/LoadingButton';

const Transfer = () => {
  const [amount, setAmount] = useState(0);
  const [senderAcctNumber, setSenderAcctNumber] = useState('');
  const [recevierAcctNumber, setReceiverAcctNumber] = useState('');
  const [receiverDetails, setReceiverDetails] = useState('');
  const [isShowTransferModal, toggleTransferModal] = useModal();
  const accounts = useSelector((state) => state.accounts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAccounts());
  }, [dispatch]);

  const verifyAccountHandler = async () => {
    const resp = await dispatch(verifyAccount(recevierAcctNumber));
    if(resp){
      setReceiverDetails(resp.data);
      toggleTransferModal();
    }
  };

  return (
    <>
      <TransferModal
        isShowModal={isShowTransferModal}
        closeModal={toggleTransferModal}
        senderAcctNumber={senderAcctNumber}
        amount={amount}
        receiver={receiverDetails}
      />
      <DashboardLayout>
        <div className="flex flex-col items-center">
          <h2 className="capitalize text-2xl font-semibold mb-5">Accounts</h2>
          <form
            className="bg-white w-full md:w-96 p-6 shadow-inner"
            onSubmit={verifyAccountHandler}
          >
            <label className="pb-4 flex flex-col">
              <span>Account</span>
              <select
                className="capitalize"
                value={senderAcctNumber}
                required
                onChange={(e) => setSenderAcctNumber(e.target.value)}
              >
                <option value="" disabled>
                  Select Account Number
                </option>
                {accounts.map(({ accountNumber, type }, i) => (
                  <option value={accountNumber} key={i}>
                    {accountNumber} - {type}
                  </option>
                ))}
              </select>
            </label>
            <label className="pb-4 flex flex-col">
              <span>Receiver Account</span>
              <input
                value={recevierAcctNumber}
                onChange={(e) => setReceiverAcctNumber(e.target.value)}
                type="number"
                required
                placeholder="receiver account number"
              />
            </label>
            <label className="flex flex-col pb-4">
              <span>Amount</span>
              <AmountInput getAmount={(amount) => setAmount(amount)} />
            </label>
            <LoadingButton
              onClick={verifyAccountHandler}
              className="cursor-pointer uppercase w-full text-lg hover:shadow-3xl focus:outline-none font-normal subpixel-antialiased my-7 md:max-w-sm mx-auto text-center bg-primary py-4 disabled:opacity-50 text-white flex justify-center items-center"
            >
              submit
            </LoadingButton>
          </form>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Transfer;
