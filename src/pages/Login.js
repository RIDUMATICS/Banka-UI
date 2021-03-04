import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { loginUser } from '../actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import { VscChromeClose } from 'react-icons/vsc';
import { AiOutlineMail } from 'react-icons/ai';
import { CgPassword } from 'react-icons/cg';
import LoadingButton from '../components/LoadingButton';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.isAuthenticated) {
      props.history.push('/dashboard');
    }
  }, [auth, props.history]);

  const onSubmitHandler = async () => {
    const resp = await dispatch(loginUser({ email, password }, props.history));
    return resp;
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
          <h2 className="text-4xl font-bold mb-2 mt-4">Log In.</h2>
          <p>Become part of Banka and start saving money</p>
        </div>
        <div className="bg-white text-secondary flex-1 rounded-t-4xl md:rounded-none">
          <div className="container flex flex-col w-full">
            <div>
              <p className="mt-20 mb-10 text-center font-medium text-4xl">
                Welcome
              </p>
              <form className="px-3">
                <label className="flex border border-secondary rounded-md mx-auto w-full md:w-96">
                  <div className="bg-gray-100 border-r border-secondary p-4 rounded-l-md">
                    <AiOutlineMail className="stroke-2 text-3xl text-primary" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="border-0 focus:outline-none label-focus text-md tracking-wide w-full pl-3 rounded-r-md"
                  />
                </label>
                <div className="flex border border-secondary rounded-md w-full my-4 mx-auto w-full md:w-96">
                  <div className="bg-gray-100 border-r border-secondary p-4 rounded-l-md">
                    <CgPassword className="text-3xl text-primary" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                    className="border-0 focus:outline-none label-focus text-md tracking-wide w-full pl-3 rounded-r-md"
                  />
                </div>
                <LoadingButton
                  onClick={onSubmitHandler}
                  className="cursor-pointer uppercase w-full text-lg hover:shadow-3xl focus:outline-none font-normal subpixel-antialiased my-7 md:max-w-sm mx-auto text-center bg-primary py-4 disabled:opacity-50 text-white flex justify-center items-center"
                >
                  Login
                </LoadingButton>
              </form>
              <p className="text-center">
                Not a Banka yet?
                <NavLink
                  to="/signup"
                  className="text-primary cursor-pointer ml-1"
                >
                  Sign up here
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
