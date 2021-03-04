import react, { useEffect, useState } from 'react';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword, updateDetails } from '../actions/authActions.js';
import DashboardLayout from '../components/DashboardLayout.jsx';
import LoadingButton from '../components/LoadingButton.jsx';
import ToggleButton from '../components/ToggleButton.js';

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

const Settings = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [enable2FA, setEnable2FA] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    setFirstName(auth.user.firstName);
    setLastName(auth.user.lastName);
    setEnable2FA(auth.user.enable2FA);
  }, [auth]);

  const updateDetailsHandler = async () => {
    await dispatch(updateDetails({firstName, lastName}));
  }

  const changePasswordHandler = async () => {
    await dispatch(changePassword({ oldPassword, password, confirmPassword }));
  }

  return (
    <DashboardLayout>
      <div>
        <form className="border border-primary relative px-5 py-8">
          <p className="absolute h-8 -top-4 left-5 bg-gray-100 px-2 text-lg font-semibold">
            Update Details
          </p>
          <CustomInput
            icon={<BsFillPersonLinesFill className="text-2xl text-primary" />}
            type="text"
            value={firstName}
            onChange={setFirstName}
            required={true}
            placeholder="First Name"
          />

          <CustomInput
            icon={<BsFillPersonLinesFill className="text-2xl text-primary" />}
            type="text"
            value={lastName}
            onChange={setLastName}
            required={true}
            placeholder="Last Name"
          />
          {/* <ToggleButton
            label="Enable 2FA"
            checked={enable2FA}
            onChange={setEnable2FA}
          /> */}
          <div className="md:flex justify-end">
            <LoadingButton onClick={updateDetailsHandler} className="disabled:opacity-50 bg-primary text-white w-full mt-4 capitalize text-lg font-medium p-1 md:max-w-xs">
              Update Details
            </LoadingButton>
          </div>
        </form>
        <form className="border border-primary relative px-5 py-8 my-10">
          <p className="absolute h-8 -top-4 left-5 bg-gray-100 px-2 text-lg font-semibold">
            Change Password
          </p>
          <CustomInput
            icon={<RiLockPasswordLine className="text-2xl text-primary" />}
            type="password"
            value={oldPassword}
            onChange={setOldPassword}
            required={true}
            placeholder="Enter old password"
          />

          <CustomInput
            icon={<RiLockPasswordLine className="text-2xl text-primary" />}
            type="password"
            value={password}
            onChange={setPassword}
            required={true}
            placeholder="Enter new password"
          />

          <CustomInput
            icon={<RiLockPasswordLine className="text-2xl text-primary" />}
            type="password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            required={true}
            placeholder="Confirm new password"
          />
          <div className="md:flex justify-end">
            <LoadingButton onClick={changePasswordHandler} className="disabled:opacity-50 bg-primary text-white w-full mt-4 capitalize text-lg font-medium p-1 md:max-w-xs">
              Change password
            </LoadingButton>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
