import react, { useState } from 'react';
import { TiThMenuOutline } from 'react-icons/ti';
import { IoIosCloseCircle, IoLogoBuffer } from 'react-icons/io';
import { RiBankFill, RiBankCardFill, RiHeadphoneFill } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { useSelector } from 'react-redux';

const CustomLink = (props) => (
  <NavLink
    to={props.to}
    className="capitalize mx-10 hover:border-b-2 border-white px-1"
  >
    {props.children}
  </NavLink>
);

const Nav = () => {
  const [showNavMenu, setShowNavMenu] = useState(false);
  const auth = useSelector((state) => state.auth);

  return (
    <nav className="fixed z-50 top-0 left-0 w-screen bg-primary p-4 border-b md:border-none border-white">
      <div className="flex items-center justify-between lg:justify-start sm:px-10">
        <NavLink
          to="/"
          className="flex items-center text-2xl font-semibold capitalize text-white lg:mr-10"
        >
          <IoLogoBuffer className="mr-1" />
          Banka.
        </NavLink>
        <TiThMenuOutline
          className="text-white text-3xl lg:hidden cursor-pointer"
          onClick={() => setShowNavMenu(true)}
        />
        <div className="h-full w-full justify-between hidden lg:flex">
          <ul className="flex items-center font-medium text-white text-lg">
            <li>
              <CustomLink to="/">Home </CustomLink>
            </li>
            <li>
              <CustomLink to="/about">about</CustomLink>
            </li>
            <li>
              <CustomLink to="/contact">contact</CustomLink>
            </li>
          </ul>
          {auth.isAuthenticated === true ? (
            <NavLink
              to="/dashboard"
              className="text-white text-base capitalize border-2 border-white px-5 py-2 rounded hover:bg-white hover:text-primary"
            >
              Dashboard
            </NavLink>
          ) : (
            <ul className="flex font-medium text-white text-base">
              <li>
                <NavLink
                  to="/signup"
                  className="capitalize border-2 border-white px-5 py-2 rounded hover:bg-white hover:text-primary"
                >
                  Register
                </NavLink>
              </li>
              <li>
                <CustomLink to="/login">Log in</CustomLink>
              </li>
            </ul>
          )}
        </div>
      </div>
      <div
        className={classnames(
          'transition ease-in-out duration-200 fixed w-screen h-screen bg-white inset-0 rounded-tl-3xl p-9 lg:hidden transform',
          {
            'translate-x-full': !showNavMenu,
            'translate-x-0': showNavMenu,
          }
        )}
      >
        <span className="flex justify-end">
          <IoIosCloseCircle
            className="text-5xl text-secondary"
            onClick={() => setShowNavMenu(false)}
          />
        </span>
        <ul className="my-5">
          <li className="flex items-center py-4 border-t border-secondary-light text-lg text-secondary ">
            <RiBankFill className="text-primary mr-4" /> Home
          </li>
          <li className="flex items-center py-4 border-t border-secondary-light text-lg text-secondary">
            <RiBankCardFill className="text-primary mr-4" /> About
          </li>
          <li className="flex items-center py-4 border-t border-b border-secondary-light text-lg text-secondary">
            <RiHeadphoneFill className="text-primary mr-4" />
            Contact
          </li>

          <li className="uppercase rounded-md border border-primary focus:ring ring-primary text-white text-lg font-semibold bg-primary mt-6 py-3 text-center">
            Log in
          </li>
          <li className="uppercase rounded-md border border-primary focus:ring ring-primary text-primary text-lg font-semibold bg-white my-4 py-3 text-center">
            Sign up
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Nav;
