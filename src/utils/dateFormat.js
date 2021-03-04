const dateFormat = (date) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const formattedDate = new Date(date).toLocaleDateString(undefined, options);
  return formattedDate;
};

export default dateFormat;
