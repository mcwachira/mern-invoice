"use client";

import { FaMoneyBillWave } from "react-icons/fa";
const Copyright = () => {
  return (
    <p className="text-center text-sm text-white">
      ©{" "}
      <a
        className="text-blue-400 underline hover:text-blue-300"
        href="https://github.com/API-Imperfect"
        target="_blank"
        rel="noopener noreferrer"
      >
        MERN Invoice
      </a>{" "}
      {new Date().getFullYear()}
    </p>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black w-full mt-auto py-4 px-2 fixed bottom-0 ">
      <div className="text-center text-green-400 text-base flex justify-center items-center gap-2">
        <FaMoneyBillWave />
        <span>Because Money is as important as oxygen!</span>
        <FaMoneyBillWave />
      </div>
      <div className="mt-2">
        <Copyright />
      </div>
    </footer>
  );
};

export default Footer;
