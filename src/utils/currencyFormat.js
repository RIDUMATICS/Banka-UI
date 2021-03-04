function currencyFormat(amount) {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'NGN',
      currencyDisplay: 'narrowSymbol',
    });
    const formattedAmount = formatter.format(amount).split('.')[0]; // remove the kobo part
    return formattedAmount;
  }

  export default currencyFormat
