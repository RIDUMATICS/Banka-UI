import react, { useState } from 'react';
import currencyFormat from '../utils/currencyFormat'

const AmountInput = (props) => {
  const [amount, setAmount] = useState('');

  const onChangeHandler = (e) => {
    const _amount = e.target.value.slice(1).replaceAll(',', '');
    if (!isNaN(_amount)) {
      setAmount(_amount);
      props.getAmount(_amount)
    }
  };

  return (
    <input
      type="amount"
      value={currencyFormat(amount)}
      placeholder="Enter amount"
      onChange={onChangeHandler}
      required
      className="border border-black focus:outline-none p-2 text-lg "
    />
  );
};

export default AmountInput;