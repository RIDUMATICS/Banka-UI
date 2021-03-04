import React, { useState } from 'react';
import classnames from 'classnames';
import { VscChromeClose } from 'react-icons/vsc';

const Modal = (props) => {
  return (
    <div>
      <div
        onClick={() => props.closeModal()}
        className="fixed left-0 right-0 top-20 z-50 flex justify-center p-1"
      >
        <div
          className="bg-white w-96 rounded-md overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className={`${
              props.headerBg || 'bg-primary'
            } text-white p-4 shadow-xl flex justify-between items-center`}
          >
            <p className="font-semibold text-xl">{props.title}</p>
            <VscChromeClose
              className="text-3xl cursor-pointer"
              onClick={() => props.closeModal()}
            />
          </div>
          <div className="px-3 py-7">{props.children}</div>
        </div>
      </div>
      <div className="absolute inset-0 z-40 opacity-80 bg-gray-700"></div>
    </div>
  );
};

export default Modal;
