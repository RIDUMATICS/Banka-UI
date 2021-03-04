import react from 'react';
import Nav from './Nav';

const Header = () => (
  <>
    <Nav />
    <header className="relative bg-primary bg-header-hero bg-contain bg-bottom bg-no-repeat md:bg-size-56% md:bg-position-100%">
      <div className="container pt-28 flex justify-start flex-col md:flex-row h-full ">
        <div className="w-5/6 sm:w-3/4 md:mx-0 md:my-24">
          <h2 className="text-white text-3xl font-semibold mb-7">
            Celebrating a decade of powerful banking
          </h2>
          <p className="text-white mb-7">
            Get the financial tools and insights to start, build, and grow your
            business.
          </p>
          <button className="bg-white my-10 text-secondary py-3 px-16 uppercase text-sm shadow-3xl rounded font-semibold">
            Get started
          </button>
        </div>
        <div className="h-64 w-full"></div>
      </div>
    </header>
  </>
);

export default Header;
