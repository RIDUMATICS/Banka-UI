import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import {
  faTachometerAlt,
  faSignOutAlt,
  faAngleRight,
  faFileInvoiceDollar,
  faUsersCog,
  faAngleDown,
} from '@fortawesome/free-solid-svg-icons';
import './style/Dashboard.css';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from './../actions/authActions';

const Dashboard = (props) => {
  const [showSetting, setShowSetting] = useState(false);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const toggleSetting = (e) => {
    e.preventDefault();
    setShowSetting(!showSetting);
  };

  return (
    <main>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top"
        id="mainNav"
      >
        <NavLink className="navbar-brand" to="/">
          KUDI
        </NavLink>
        <button
          className="navbar-toggler navbar-toggler-right"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav navbar-sidenav" id="exampleAccordion">
            <li
              className="nav-item"
              data-toggle="tooltip"
              data-placement="right"
              title="Dashboard"
            >
              <NavLink
                exact
                to="/dashboard"
                activeClassName="active-sideBar"
                className="nav-link"
              >
                <FontAwesomeIcon icon={faTachometerAlt} className="mr-2" />
                <span className="nav-link-text">Dashboard</span>
              </NavLink>
            </li>
            <li
              className="nav-item"
              data-toggle="tooltip"
              data-placement="right"
              title="Accounts"
            >
              <NavLink
                to={
                  auth.user.isAdmin
                    ? '/dashboard/accounts'
                    : '/dashboard/accounts/user'
                }
                className="nav-link"
                activeClassName="active-sideBar"
              >
                <FontAwesomeIcon icon={faFileInvoiceDollar} className="mr-2" />
                <span className="nav-link-text">Accounts </span>
              </NavLink>
            </li>
            <li
              className="nav-item"
              data-toggle="tooltip"
              data-placement="right"
              title="Setting"
            >
              <NavLink
                to="/settings"
                activeClassName="active-sideBar"
                className="dropdown-btn"
                onClick={toggleSetting}
              >
                <FontAwesomeIcon icon={faUsersCog} className="mr-2" />
                <span className="nav-link-text">Setting</span>
                <FontAwesomeIcon
                  className="float-right"
                  icon={showSetting ? faAngleDown : faAngleRight}
                />
              </NavLink>
              <div
                className={classnames('collapse', {
                  show: showSetting,
                })}
                id="collapseLayouts"
                aria-labelledby="headingOne"
                data-parent="#sidenavAccordion"
              >
                <nav className="sb-sidenav-menu-nested nav d-flex flex-column pl-3 pl-md-0">
                  <NavLink className="nav-link" to="/settings/change-password">
                    Change Password
                  </NavLink>
                  <NavLink className="nav-link" to="/settings/update-details">
                    Update Details
                  </NavLink>
                </nav>
              </div>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto p-3 p-md-0">
            <li className="nav-item py-2 py-md-0">
              <img
                src={auth.user.profileImage}
                className="img-fluid img-icon mr-2"
                alt="..."
              />
              {`${auth.user.firstName} ${auth.user.lastName}`}
            </li>
            <li className="nav-item py-2 py-md-0 ml-md-3">
              <button
                className="nav-link btn btn-outline-white d-block w-100"
                data-toggle="modal"
                data-target="#exampleModal"
                onClick={() => dispatch(logoutUser())}
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <div
        style={{
          paddingTop: '100px',
          paddingBottom: '100px',
          backgroundColor: 'white',
        }}
      >
        {props.children}
      </div>

      <footer className="sticky-footer">
        <div className="container">
          <div className="text-center">
            <small>Copyright © Your Website 2021</small>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Dashboard;
