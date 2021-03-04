import react, { useState } from 'react';

const LoadingButton = (props) => {
  const [loading, setLoading] = useState(false);

  const clickHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    await props.onClick();
    setLoading(false);
  };

  return (
    <button
      type="submit"
      disabled={loading}
      className={props.className}
      onClick={clickHandler}
    >
      {loading ? (
        <div class="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        <span>{props.children}</span>
      )}
    </button>
  );
};

export default LoadingButton;
