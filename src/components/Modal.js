import React from 'react';
import classnames from 'classnames';
import './style/Model.css';

const Model = (props) => {
  const hideModel = () => {
    props.closeModal();
  };

  return (
    <div
      className={classnames('modal fade', { show: props.display })}
      id="exampleModalCenter"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-modal="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              {props.title}
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={hideModel}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">{props.children}</div>
          <div className="modal-footer d-block">
            <p className="text-center d-block"> &copy; 2020 Kudi Bank </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Model;
