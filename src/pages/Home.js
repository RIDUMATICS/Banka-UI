import React from 'react';
import { FcCancel } from 'react-icons/fc';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { HiOutlineMailOpen } from 'react-icons/hi';
import { BiMailSend, BiPhoneCall, BiTimeFive } from 'react-icons/bi';
import { GiCash } from 'react-icons/gi';
import { SiAuth0 } from 'react-icons/si';
import { RiBankCardLine } from 'react-icons/ri';

import Header from '../components/Header';
import Accordion from '../components/Accordion';

const Home = () => (
  <>
    <Header />
    <section className="bg-wheat-300 text-secondary py-16 lg:py-32">
      <div className="container flex flex-col  md:flex-row md:items-center">
        <div className="md:flex-1 md:pr-24">
          <h2 className="text-2xl pr-3 font-semibold">
            Why you should save with
            <span className="text-3xl font-bold capitalize"> Banka.</span>
          </h2>
          <p className="py-5">
            We know that you want to compare our charges rates, at BANKA we make
            it easy for you.
          </p>
        </div>
        <div className="w-full bg-white shadow-2xl md:flex-nowrap md:flex-auto md:w-36">
          <div className="flex items-center justify-evenly bg-secondary text-white rounded-t-lg py-6">
            <div className="flex-1 px-5 hidden md:block"></div>
            <div className="flex-1 px-5">Other Banks</div>
            <div className="flex-1 logo">Banka.</div>
          </div>
          <div className="py-2 divide-y">
            <div className="flex flex-wrap justify-evenly py-3">
              <div className="w-full px-5 pb-2 md:flex-1">Transfer Fee</div>
              <div className="flex flex-1 px-5 font-light text-sm">
                <FcCancel className="inline-block text-lg mr-2" />
                <p>Up to N50 plus V.A.T </p>
              </div>
              <div className="flex flex-1 font-light text-sm">
                <IoMdCheckmarkCircleOutline className="inline-block text-lg mr-2 text-green-400" />
                <p>Free</p>
              </div>
            </div>
            <div className="flex flex-wrap justify-evenly py-3">
              <div className="w-full px-5 pb-2 md:flex-1">Alerts</div>
              <div className="flex flex-1 px-5 font-light text-sm">
                <FcCancel className="inline-block text-lg mr-2" />
                <p>Charge for SMS alerts</p>
              </div>
              <div className="flex flex-1 font-light text-sm">
                <IoMdCheckmarkCircleOutline className="inline-block text-lg mr-2 text-green-400" />
                <p>Free instant notifications</p>
              </div>
            </div>

            <div className="flex flex-wrap justify-evenly py-3">
              <div className="w-full px-5 pb-2 md:flex-1">
                Account Maintenance Fee
              </div>
              <div className="flex flex-1 px-5 font-light text-sm">
                <FcCancel className="inline-block text-lg mr-2" />
                <p>Yes</p>
              </div>
              <div className="flex flex-1 font-light text-sm">
                <IoMdCheckmarkCircleOutline className="inline-block text-lg mr-2 text-green-400" />
                <p>Never</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="bg-white py-16 lg:py-16">
      <div className="container">
        <h2 className="text-center mb-24 text-5xl text-secondary font-semibold">
          Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="relative">
            <div className="rounded-full bg-secondary text-white font-semibold w-14 h-14 absolute -top-7 left-1/2 -ml-7 flex justify-center items-center">
              1
            </div>
            <div className="flex flex-col justify-center rounded-lg shadow-4xl bg-white text-center px-7 pt-20 pb-12">
              <HiOutlineMailOpen className="text-7xl mx-auto text-primary text-opacity-90 mb-5" />
              <h3 className="mb-7 font-semibold">Email notifications</h3>
              <p className="text-sm">
                You have up to 3 minutes to confirm your operation with the
                winning entity.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-full bg-secondary text-white font-semibold w-14 h-14 absolute -top-7 left-1/2 -ml-7 flex justify-center items-center">
              2
            </div>
            <div className="flex flex-col justify-center rounded-lg shadow-4xl bg-white text-center px-7 pt-20 pb-12">
              <GiCash className="text-7xl mx-auto text-primary text-opacity-90 mb-5" />
              <h3 className="mb-7 font-semibold">Instant Cashout</h3>
              <p className="text-sm">
                You have up to 3 minutes to confirm your operation with the
                winning entity.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-full bg-secondary text-white font-semibold w-14 h-14 absolute -top-7 left-1/2 -ml-7 flex justify-center items-center">
              3
            </div>
            <div className="flex flex-col justify-center rounded-lg shadow-4xl bg-white text-center px-7 pt-20 pb-12">
              <RiBankCardLine className="text-7xl mx-auto text-primary text-opacity-90 mb-5" />
              <h3 className="mb-7 font-semibold">Zero Charges</h3>
              <p className="text-sm">
                You have up to 3 minutes to confirm your operation with the
                winning entity.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-full bg-secondary text-white font-semibold w-14 h-14 absolute -top-7 left-1/2 -ml-7 flex justify-center items-center">
              4
            </div>
            <div className="flex flex-col justify-center rounded-lg shadow-4xl bg-white text-center px-7 pt-20 pb-12">
              <SiAuth0 className="text-7xl mx-auto text-primary mb-5" />
              <h3 className="mb-7 font-semibold">Fully Encrypted</h3>
              <p className="text-sm">
                You have up to 3 minutes to confirm your operation with the
                winning entity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="bg-wheat-400 text-secondary py-16 lg:py-32">
      <div className="container flex flex-col  md:flex-row md:items-center">
        <div className="md:flex-1 md:pr-24">
          <h2 className="text-5xl md:text-6xl pr-3">Common questions.</h2>
        </div>
        <Accordion />
      </div>
    </section>
    <footer className="bg-secondary text-white pt-16">
      <div className="container flex flex-col md:flex-row">
        <div className="w-full md:flex-1">
          <ul>
            <li>
              <h3 className="font-semibold text-2xl py-2 md:text-4xl">
                Let's get in touch
              </h3>
            </li>
            <li className="py-2">
              <p className="flex items-center">
                <BiTimeFive className="text-primary mr-2" />
                Monday to Sunday: 24/7
              </p>
            </li>
            <li className="py-2">
              <p className="flex items-center">
                <BiPhoneCall className="text-primary mr-2" />
                +234 812 268 9423
              </p>
            </li>
            <li className="py-2">
              <a
                target="_blank"
                rel="noreferrer"
                href="mailto:support@banka.com"
                className="flex items-center"
              >
                <BiMailSend className="text-primary mr-2" />
                support@banka.com
              </a>
            </li>
          </ul>
        </div>
        <div className="md:mx-10">
          <ul>
            <li className="lin uppercase font-semibold py-2 mt-5 mb-4 border-t border-b md:m-0 md:border-0">
              our pages
            </li>
            <li className="py-2 md:px-2">Home</li>
            <li className="py-2 md:px-2">About</li>
            <li className="py-2 md:px-2">Contact</li>
            <li className="py-2 md:px-2">Profile</li>
          </ul>
        </div>
        <div className="md:ml-10">
          <ul>
            <li className="uppercase font-semibold py-2 mt-5 mb-4 border-t border-b md:m-0 md:border-0">
              transparency
            </li>
            <li className="py-2 md:px-2">Help and contact</li>
            <li className="py-2 md:px-2">Privacy Policy</li>
            <li className="py-2 md:px-2">Terms and Conditions</li>
          </ul>
        </div>
      </div>
      <p className="border-t p-5 text-center mt-16">
        &copy; 2021 Property of Banka <span className="border mx-4"></span>
        Design with 💖 By
        <a target="_blank" rel="noreferrer" href="#">
          Ridwan Onikoyi
        </a>
      </p>
    </footer>
  </>
);

export default Home;
