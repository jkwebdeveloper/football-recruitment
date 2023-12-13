import React from "react";
import banner from "../assets/banner.png";
import Header from "./Header";
import Lottie from "lottie-react";
import DownArrow from "../assets/DownArrow.json";

const CommonBanner = ({ title }) => {
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
      <div className="flex justify-center items-center min-h-[55vh] ">
        <div className="block mt-20">
          <h1 className="text-white xl:text-4xl text-xl  font-semibold">
            {title}
          </h1>
          {/* <div className="w-8 mx-auto mt-6">
            <Lottie animationData={DownArrow} loop={true}  className="cursor-pointer"/>
          </div> */}
        </div>
      </div>

      {/* <div className="flex absolute -bottom-5  w-full">
        <img
          src={require("../assets/Vector.png")}
          alt=""
          className="h-12 w-auto flex-1 "
        />
        <img
          src={require("../assets/Vector.png")}
          alt=""
          className="h-12 w-auto flex-1 "
        />
        <img
          src={require("../assets/Vector.png")}
          alt=""
          className="h-12 w-auto flex-1 "
        />
        <img
          src={require("../assets/Vector.png")}
          alt=""
          className="h-12 w-auto flex-1 "
        />
        <img
          src={require("../assets/Vector.png")}
          alt=""
          className="h-12 w-auto flex-1 "
        />
        <img
          src={require("../assets/Vector.png")}
          alt=""
          className="h-12 w-auto flex-1 "
        />
        <img
          src={require("../assets/Vector.png")}
          alt=""
          className="h-12 w-auto flex-1 "
        />
      </div> */}
    </div>
  );
};

export default CommonBanner;
