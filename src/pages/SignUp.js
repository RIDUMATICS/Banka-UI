import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import 'react-phone-number-input/style.css';
import PhoneInput, { parsePhoneNumber } from 'react-phone-number-input';
import { useDispatch, useSelector } from 'react-redux';
import { VscChromeClose } from 'react-icons/vsc';
import { AiOutlineCloudUpload, AiOutlineMail } from 'react-icons/ai';
import { registerUser } from '../actions/authActions';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { RiLockPasswordLine } from 'react-icons/ri';
import LoadingButton from '../components/LoadingButton';

const CustomInput = (props) => (
  <label className="flex items center border w-full md:w-96 border-secondary rounded-md overflow-hidden mb-4">
    <span className="bg-gray-100 border-r border-secondary p-2 rounded-l-md">
      {props.icon}
    </span>
    <input
      type={props.type}
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      placeholder={props.placeholder}
      required={props.required}
      className="border-none outline-none focus:border-none focus:outline-none w-full"
    />
  </label>
);

const SignUp = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // const [enable2FA, setEnable2FA] = useState(false);

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.isAuthenticated) props.history.push('/dashboard');
  });

  const handleSubmit = async () => {
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
    // data.append('enable2FA', enable2FA);

    await dispatch(registerUser(data, props.history));
  };

  return (
    <main>
      <header className="bg-primary py-4 fixed top-0 left-0 right-0">
        <div className="px-4 flex items-center justify-between text-white">
          <h1 className="text-2xl font-semibold capitalize lg:mr-10">Banka.</h1>
          <NavLink to="/">
            <VscChromeClose className="text-2xl " />
          </NavLink>
        </div>
      </header>
      <section className="bg-primary min-h-screen md:bg-gray-200 md:text-secondary text-white flex flex-col pt-16 md:flex-row">
        <div className="container p-8 md:w-4/12">
          <h2 className="text-4xl font-bold mb-2 mt-4">Sign Up.</h2>
          <p>Become part of Banka and start saving money</p>
        </div>
        <div className="bg-white text-secondary flex-1 rounded-t-4xl md:rounded-none">
          <div className="container flex flex-col w-full">
            <div>
              <p className="mt-20 mb-10 text-center font-medium text-4xl">
                Welcome
              </p>
              <form className="flex flex-col items-center">
                <CustomInput
                  icon={
                    <BsFillPersonLinesFill className="text-2xl text-primary" />
                  }
                  type="text"
                  value={firstName}
                  onChange={setFirstName}
                  required={true}
                  placeholder="First Name"
                />

                <CustomInput
                  icon={
                    <BsFillPersonLinesFill className="text-2xl text-primary" />
                  }
                  type="text"
                  value={lastName}
                  onChange={setLastName}
                  required={true}
                  placeholder="Last Name"
                />

                <PhoneInput
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={(phone) => setPhone(phone)}
                />

                <CustomInput
                  icon={<AiOutlineMail className="text-2xl text-primary" />}
                  type="email"
                  value={email}
                  onChange={setEmail}
                  required={true}
                  placeholder="Email"
                />

                <CustomInput
                  icon={
                    <RiLockPasswordLine className="text-2xl text-primary" />
                  }
                  type="password"
                  value={password}
                  onChange={setPassword}
                  required={true}
                  placeholder="Password"
                />
                <span className="text-xs -mt-4 mb-4 w-full md:w-96 py-1 text-gray-500">
                  password must be at least 8 characters long
                </span>
                <CustomInput
                  icon={
                    <RiLockPasswordLine className="text-2xl text-primary" />
                  }
                  type="password"
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                  required={true}
                  placeholder="Confirm password"
                />

                <label className="w-full md:w-96 mb-4">
                  <span className="border border-primary p-2 rounded-md flex items-center justify-center font-medium">
                    {profileImage === '' && (
                      <AiOutlineCloudUpload className="text-2xl text-primary mr-2" />
                    )}
                    {profileImage === ''
                      ? 'Upload Profile Image'
                      : profileImage.name}
                  </span>
                  <input
                    type="file"
                    accept="image/x-png,image/jpeg"
                    className="hidden"
                    onChange={(e) => setProfileImage(e.target.files[0])}
                  />
                </label>
                {/* <ToggleButton
                  label="Enable 2FA"
                  checked={enable2FA}
                  onChange={setEnable2FA}
                /> */}

                <LoadingButton
                  onClick={handleSubmit}
                  className="cursor-pointer uppercase w-full text-lg hover:shadow-3xl focus:outline-none font-normal subpixel-antialiased my-7 md:max-w-sm mx-auto text-center bg-primary py-4 disabled:opacity-50 text-white flex justify-center items-center"
                >
                  Sign up
                </LoadingButton>
              </form>
              <p className="text-center mb-6">
                Already have an account?
                <NavLink
                  to="/login"
                  className="text-primary cursor-pointer ml-1"
                >
                  Login here
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SignUp;
