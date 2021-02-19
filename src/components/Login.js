import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { loginUser } from './../actions/authActions';
import Verify2FA from './Verify2FA';
import Loader from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    console.log(auth.isAuthenticated);
    if (auth.isAuthenticated) {
      props.history.push('/dashboard');

    }
  }, [auth, props.history]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser({email, password}, props.history));
  };
  
  return (
    <>
      {auth.isLoading && (
        <Loader
          type="BallTriangle"
          color="#00BFFF"
          height={100}
          width={100}
          className="loader"
        />
      )}
      <section className="row mx-0" id="login-section">
        {auth.enable2FA && (
          <Verify2FA showModal={auth.enable2FA} />
        )}
        <div className="col-lg-6 login-img" />
        <div className="col-lg-6 d-flex flex-column">
          <div className="container my-auto text-center login-content">
            <h2 className="pb-3"> KUDI </h2> <h3> Welcome back </h3>
            <p>
              New to Kudi ? <Link to="/signup"> Sign up </Link>
            </p>
            <form className="px-md-5 pt-2" onSubmit={onSubmitHandler}>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your email address"
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Your password"
                  className="form-control"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
