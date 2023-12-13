import React from "react";
import banner from "../../assets/BG-white.png";
import Header from "../Header";
import { IoLocationOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";

const Find_job_Banner = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${banner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="relative"
    >
      <Header />
      <div className="flex justify-center items-center min-h-[80vh] w-full">
        <div className="flex items-center   flex-col gap-y-4 lg:p-[4.5rem] p-2 md:w-[60%] lg:w-[80%] xl:w-[70%] w-11/12 rounded-2xl">
          <span className="text-white xl:text-4xl text-xl  font-semibold">Find job</span>
          <p className="lg:w-7/12 text-center text-[14px] text-white">
            Search and find your dream job is now easier than ever you just
            browse and find job if you need it{" "}
          </p>

          <div className="bg-white rounded-lg flex justify-around items-center gap-2 lg:flex-row lg:w-full flex-col w-full px-3 py-4">
            <div className="gap-3 flex items-center w-full">
              <IoIosSearch className="text-2xl" />
              <input
                type="text"
                placeholder="Job title or keyword"
                className="outline-none"
              />
            </div>
            <div className="gap-3 flex items-center w-full">
              <IoLocationOutline className="text-2xl" />
              <input
                type="text"
                placeholder="Select location work"
                className="outline-none"
              />
            </div>
            <button
              type="button"
              className="blue_button w-full hover:bg-blue_button/80 active:scale-90 transition"
            >
              Find Job
            </button>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default Find_job_Banner;
