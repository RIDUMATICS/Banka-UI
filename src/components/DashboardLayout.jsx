import react, { useState } from 'react';
import classnames from 'classnames';
import { logoutUser } from '../actions/authActions';
import {
  RiDashboardLine,
  RiLogoutCircleLine,
  RiMenuUnfoldLine,
  RiUserSettingsLine,
} from 'react-icons/ri';
import { IoLogoBuffer } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { BiMoney, BiTransfer } from 'react-icons/bi';
import { VscChromeClose } from 'react-icons/vsc';

const DashboardLayout = (props) => {
  const auth = useSelector((state) => state.auth);
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();

  return (
    <main className="min-h-screen">
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-900">
        <div className="relative bg-white flex border-b md:w-1/4 lg:w-1/5 md:border-r ">
          <div className="fixed z-10 bg-white flex md:hidden w-full">
            <button className="p-4 border-r" onClick={() => setShowMenu(true)}>
              <RiMenuUnfoldLine className="text-3xl" />
            </button>
            <div className="flex flex-1 justify-end items-center px-4">
              <button
                onClick={() => dispatch(logoutUser())}
                className="flex items-center text-base mr-2 bg-primary text-white rounded-md px-2 py-1"
              >
                <span className="mr-2">
                  <RiLogoutCircleLine className="outline-none" />
                </span>
                Log out
              </button>
              <div className="w-8 h-8 relative rounded-md">
                <img
                  src={auth.user.profileImage}
                  alt="profile"
                  className="object-cover rounded-md w-full h-full"
                />
                <span className="absolute -right-1 -bottom-1 rounded-full border-2 border-white bg-green-500 w-3 h-3"></span>
              </div>
            </div>
          </div>
          <div
            className={classnames(
              'transition-transform ease-in-out duration-200 fixed z-20 transform md:translate-x-0 bg-white h-full w-full md:w-1/4 lg:w-1/5',
              {
                'translate-x-0': showMenu,
                'translate-x-full': !showMenu,
              }
            )}
          >
            <div className="flex justify-between items-center text-primary border-b p-4 min-h-69 shadow">
              <NavLink
                className="text-3xl font-bold capitalize flex items-center"
                to="/"
              >
                <IoLogoBuffer className="mr-1" />
                Banka.
              </NavLink>
              <button className=" md:hidden" onClick={() => setShowMenu(false)}>
                <VscChromeClose className="text-3xl" />
              </button>
            </div>
            <div className="p-4">
              <ul className="grid grid-cols-1 gap-4 text-lg">
                <li>
                  <NavLink
                    to="/dashboard"
                    activeClassName="active-sideBar"
                    exact
                    className="flex items-center text-gray-400 hover:text-gray-400 px-2 py-1 rounded-md hover:bg-gray-800"
                  >
                    <RiDashboardLine className="mr-2 text-gray-400" /> Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={
                      auth.user.isAdmin
                        ? '/dashboard/accounts'
                        : '/dashboard/accounts/user'
                    }
                    activeClassName="active-sideBar"
                    className="flex items-center text-gray-400 hover:text-gray-400 px-2 py-1 rounded-md hover:bg-gray-800"
                  >
                    <BiMoney className="mr-2 text-gray-400" /> Accounts
                  </NavLink>
                </li>
                {auth.user.type === 'client' && (
                  <li>
                    <NavLink
                      to="/dashboard/transfer"
                      exact
                      activeClassName="active-sideBar"
                      className="flex items-center text-gray-400 hover:text-gray-400 px-2 py-1 rounded-md hover:bg-gray-800"
                    >
                      <BiTransfer className="mr-2 text-gray-400" /> Transfer
                    </NavLink>
                  </li>
                )}
                {auth.user.type !== 'admin' && (
                  <li>
                    <NavLink
                      to="/dashboard/settings"
                      exact
                      activeClassName="active-sideBar"
                      className="flex items-center text-gray-400 hover:text-gray-400 px-2 py-1 rounded-md hover:bg-gray-800 hover:shadow-2xl"
                    >
                      <RiUserSettingsLine className="mr-2 text-gray-400" />
                      Settings
                    </NavLink>
                  </li>
                )}
                
                {/* TODO {auth.user.type === 'admin' && (
                  <li>
                    <p className="flex items-center text-gray-400 hover:text-gray-400 px-2 py-1 rounded-md hover:bg-gray-800">
                      <RiUserSettingsLine className="mr-2 text-gray-400" />
                      Create Staff
                    </p>
                  </li>
                )} */}
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 flex-1 relative">
          <div className="fixed md:w-3/4 lg:w-4/5 shadow hidden md:flex justify-end bg-white p-4 min-h-69 border-b z-20">
            <button
              onClick={() => dispatch(logoutUser())}
              className="hidden md:flex items-center text-base mr-2 bg-primary text-white rounded-md px-2 py-1"
            >
              <span className="mr-2">
                <RiLogoutCircleLine className="outline-none" />
              </span>
              Log out
            </button>
            <div className="w-8 h-8 relative rounded-md">
              <img
                src={auth.user.profileImage}
                alt="profile"
                className="object-cover rounded-md w-full h-full"
              />
              <span className="absolute -right-1 -bottom-1 rounded-full border-2 border-white bg-green-500 w-3 h-3"></span>
            </div>
            <div>
              <p className="ml-2 text-xs font-medium">{`${auth.user.firstName} ${auth.user.lastName}`}</p>
              <p className="ml-2 text-xs">{auth.user.type}</p>
            </div>
          </div>
          <div className="container py-28">{props.children}</div>
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
