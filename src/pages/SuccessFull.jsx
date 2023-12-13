import React from "react";
import banner from "../assets/Login_BG.png";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const SuccessFull = () => {
  return (
    <>
    <Helmet title="SuccessFull | Football-Recruitment"/>
      <div
        style={{
          backgroundImage: `url(${banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="w-full relative"
      >
        <Header />
        <div className="flex justify-center  items-center md:min-h-[90vh] min-h-[90vh]  h-auto w-full">
          <div className="bg-white md:w-1/2 xl:w-1/3 mt-28 w-[85%] mx-auto text-center rounded-3xl mb-10 shadow-[11px_13px_0px_4px_rgba(255,255,255,0.14)] md:p-6 p-2">
            <div className="md:space-y-5 space-y-3">
              <img
                src={require("../assets/success.png")}
                alt=""
                className="mx-auto md:w-auto w-36"
              />
              <p className="text-[#123763] md:text-3xl text-lg font-bold">
                Success
              </p>
              <p className="md:text-lg lg:w-4/5 text-md mx-auto text-[#6D6D6D]">
                Congratulations, your account has been successfully created.
              </p>

              <Link to="/">
                <button
                  type="submit"
                  className="blue_button mt-5"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  Let’s Go
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessFull;
