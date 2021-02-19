import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'react-phone-number-input/style.css';
import Loader from 'react-loader-spinner';
import PhoneInput, { parsePhoneNumber } from 'react-phone-number-input';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from './../actions/authActions';

const SignUp = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [enable2FA, setEnable2FA] = useState(false);

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.isAuthenticated) props.history.push('/dashboard');
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    let countryCode;
    let number;

    if (phone && phone.trim().length) {
      countryCode = parsePhoneNumber(phone).countryCallingCode;
      number = parsePhoneNumber(phone).number;
    }
    const data = new FormData();
    data.append('firstName', firstName);
    data.append('lastName', lastName);
    data.append('email', email);
    data.append('profileImage', profileImage);
    data.append('phoneNumber', number);
    data.append('countryCode', countryCode);
    data.append('password', password);
    data.append('confirmPassword', confirmPassword);
    data.append('enable2FA', enable2FA);

    dispatch(registerUser(data, props.history));
  };

  return (
    <section className="row mx-0" id="login-section">
      {auth.isLoading && (
        <Loader
          type="BallTriangle"
          color="#00BFFF"
          height={100}
          width={100}
          className="loader"
        />
      )}
      <div className="col-lg-6 login-img" />
      <div className="col-lg-6 d-flex flex-column">
        <div className="container my-auto login-content">
          <h2 className="pb-2 text-center"> KUDI </h2>
          <h3 className="text-center"> Open up your Kudi account now </h3>
          <p className="text-center ">
            Already signed up ?<Link to="/login"> Log in </Link>
          </p>
          <form className="px-md-5 pt-2 row signup" onSubmit={handleSubmit}>
            <div className="form-group p-0 px-sm-3 col-lg-6 col-md-6">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="form-control"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-group p-0 px-sm-3 col-lg-6 col-md-6">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="form-control"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="form-group p-0 px-sm-3 col-lg-12 col-md-12">
              <input
                type="email"
                name="email"
                placeholder="Your email address"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group p-0 px-sm-3 col-lg-12 col-md-12">
              <PhoneInput
                placeholder="Enter phone number"
                name="phone"
                value={phone}
                onChange={(phone) => setPhone(phone)}
              />
            </div>
            <div className="form-group p-0 px-sm-3 col-lg-12 col-md-12">
              <input
                type="file"
                name="profileImage"
                placeholder="Profile Image"
                onChange={(e) => setProfileImage(e.target.files[0])}
                className="form-control-file"
              />
            </div>
            <div className="form-group p-0 px-sm-3 col-lg-12 col-md-12">
              <input
                type="password"
                name="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="password"
                className="form-control"
              />
              <small id="passwordHelpBlock" className="form-text text-muted">
                password must be at least 8 characters long; must contain at
                least one lowercase letter, one uppercase letter, one numeric
                digit, and one special character
              </small>
            </div>
            <div className="form-group p-0 px-sm-3 col-lg-12 col-md-12">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="confirmPassword"
                className="form-control"
              />
            </div>
            <div className="form-group p-0 px-sm-3 col-lg-12 col-md-12">
              <div className="custom-control custom-switch">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  name="enable2FA"
                  id="customSwitch"
                  checked={enable2FA}
                  onChange={(e) => setEnable2FA(e.target.checked)}
                />
                <label className="custom-control-label" htmlFor="customSwitch">
                  Enable 2 factor authentication
                </label>
              </div>
            </div>
            <button type="submit" className="btn btn-primary mx-sm-3 mb-4">
              Register
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
