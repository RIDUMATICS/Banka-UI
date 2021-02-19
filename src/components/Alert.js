import React from 'react';
import './style/Alert.css';

const Alert = (props) => (
  <div className="d-block px-4 alert-box">
    <div className={`alert ${props.type} mb-2 `}>{props.message}</div>
  </div>
);

export default Alert;
