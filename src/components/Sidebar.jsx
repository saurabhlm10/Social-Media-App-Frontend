import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="font-display bg-gradient-to-br from-[#4CADDA] to-[#afe3f2] pt-12 px-6 h-screen fixed top-0 left-0">
      <h1 className="mt-4 text-xl font-head font-bold text-white">LOGO</h1>
      <Link
        to="/createpost"
        className="mt-12 relative inline-block text-lg group"
      >
        <span className="relative z-10 block px-5 py-3 overflow-hidden font-bold leading-tight text-white transition-colors duration-300 ease-out border-2 border-white rounded-lg group-hover:text-white">
          <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-blue-500"></span>
          <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-[#6B4892] group-hover:-rotate-180 ease"></span>
          <span className="relative">CREATE POST</span>
        </span>
        <span
          className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-[#6B4892] rounded-lg group-hover:mb-0 group-hover:mr-0"
          data-rounded="rounded-lg"
        ></span>
      </Link>
      <div className="flex flex-col mt-8 gap-2">
        <Link to="/u/search">
          <button className=" relative  h-10 w-28 rounded-lg font-medium group flex flex-row items-center justify-center ">
            <span
              className={`absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-[#6B4892] group-hover:-translate-x-0 group-hover:-translate-y-0 rounded-lg `}
            ></span>
            <span
              className={`absolute inset-0 w-full h-full  border-2 border-white group-hover:bg-[#6B4892] bg-blue-500 rounded-lg
          `}
            ></span>
            <span className="relative text-white group-hover:text-white font-display font-semibold">
              Search
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
