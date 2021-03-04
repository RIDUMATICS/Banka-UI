import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Link, NavLink } from 'react-router-dom';

const Profile = (props) => (
  <DashboardLayout>
    <div className="">
      <h2 className="capitalize text-2xl font-semibold">dashboard</h2>
      <div className="py-7 flex flex-col md:flex-row md:justify-between">
        <div className="order-2 md:order-1 md:flex-1 ">
          <h3 className="bg-secondary text-white p-4 rounded-t-3xl font-semibold">
            Bio Data
          </h3>
          <ul className="capitalize bg-white p-4 gap-y-4">
            <li className="grid grid-cols-1 xl:grid-cols-2 border-b py-3">
              <p className="font-semibold">first name</p>
              <span className="pt-2 xl:p-0">{props.user.firstName}</span>
            </li>
            <li className="grid grid-cols-1 xl:grid-cols-2 border-b py-3">
              <p className="font-semibold">last name</p>
              <span className="pt-2 xl:p-0">{props.user.lastName}</span>
            </li>

            <li className="grid grid-cols-1 xl:grid-cols-2 border-b py-3">
              <p className="font-semibold">Email</p>
              <span className="pt-2 xl:p-0 pr-2">{props.user.email}</span>
            </li>
            <li className="grid grid-cols-1 xl:grid-cols-2 border-b py-3">
              <p className="font-semibold">Phone</p>
              <span className="pt-2 xl:p-0">{props.user.phoneNumber}</span>
            </li>
            <li className="grid grid-cols-1 xl:grid-cols-2 border-b py-3">
              <p className="font-semibold">Type</p>
              <span className="pt-2 xl:p-0">{props.user.type}</span>
            </li>
            {/* <li className="grid grid-cols-1 lg:grid-cols-2 border-b py-3">
              <p className="font-semibold">Enable 2FA</p>
              <span className="pt-2 sm:p-0">
                {props.user.enable2FA ? 'Yes' : 'No'}
              </span>
            </li> */}
            <li className="sm:flex justify-end py-3">
              <NavLink
                to="/dashboard/settings"
                className="text-primary hover:border-b border-primary block py-2"
              >
                Update Info
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="md:max-w-xs mb-7 md:ml-5 md:order-2 ">
          <p className="bg-white text-secondary p-4 rounded-t-3xl font-semibold">
            Profile Image
          </p>
          <div className="rounded-b-3xl overflow-hidden w-full bg-white shadow-4xl">
            <img
              src={props.user.profileImage}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
);

export default Profile;
