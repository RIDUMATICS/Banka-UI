import React, { Fragment, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { updateDetails } from '../../actions/authActions';
import '../style/UpdateDetails.css';

const UpdateDetails = (props) => {
  const [editFirstName, setEditFirstName] = useState(false);
  const [editLastName, setEditLastName] = useState(false);
  const [enable2FA, setEnable2FA] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const data = { firstName, lastName, enable2FA };
    await dispatch(updateDetails(data));
    props.history.push('/dashboard');
  };

  useEffect(() => {
    setFirstName(auth.user.firstName);
    setLastName(auth.user.lastName);
    setEnable2FA(auth.user.enable2FA);
  }, [auth]);

  return (
    <Fragment>
      <h1>Update Details</h1>
      <p>
        It's a good idea to use a strong password that you're not using
        elsewhere
      </p>
      <form onSubmit={onSubmitHandler}>
        <div class="form-group row px-3">
          <label
            for="firstName"
            className="col-sm-2 col-form-label order-1 p-0"
          >
            First Name
          </label>
          <div className="col-sm-3 order-3 order-sm-2 p-0">
            <input
              type="text"
              readonly={editFirstName}
              className={classnames(
                '',
                { 'form-control-plaintext': !editFirstName },
                { 'form-control': editFirstName }
              )}
              id="firstName"
              name="firstName"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />
          </div>
          {editFirstName ? (
            <span className="order-2 order-sm-3">
              <button
                className="btn btn-outline-secondary ml-md-2"
                onClick={() => setEditFirstName(false)}
              >
                Cancel
              </button>
            </span>
          ) : (
            <span className="p-2 order-2 order-sm-3">
              <FontAwesomeIcon
                icon={faPen}
                onClick={() => setEditFirstName(true)}
              />
            </span>
          )}
        </div>
        <div class="form-group row px-3">
          <label for="lastName" class="col-sm-2 col-form-label order-1 p-0">
            Last Name
          </label>
          <div class="col-sm-3 order-3 p-0">
            <input
              type="text"
              readonly={editLastName}
              className={classnames(
                '',
                { 'form-control-plaintext': !editLastName },
                { 'form-control': editLastName }
              )}
              id="lastName"
              name="lastName"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            />
          </div>
          {editLastName ? (
            <span className="order-2 order-sm-3">
              <button
                className="btn btn-outline-secondary ml-md-2"
                onClick={() => setEditLastName(false)}
              >
                Cancel
              </button>
            </span>
          ) : (
            <span className="p-2 order-2 order-sm-3">
              <FontAwesomeIcon
                icon={faPen}
                onClick={() => setEditLastName(true)}
              />
            </span>
          )}
        </div>
        <div className="form-group row col-lg-12 col-md-12">
          <div className="custom-control custom-switch">
            <input
              type="checkbox"
              class="custom-control-input"
              id="customSwitch"
              name="enable2FA"
              checked={enable2FA}
              onChange={(e) => setEnable2FA(e.target.checked)}
            />
            <label className="custom-control-label" htmlFor="customSwitch">
              Enable 2 factor authentication
            </label>
          </div>
        </div>
        <button type="submit" class="btn btn-primary">
          Update
        </button>
      </form>
    </Fragment>
  );
};

export default UpdateDetails;
