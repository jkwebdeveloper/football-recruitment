import React from "react";
import { Link } from "react-router-dom";
import Error404 from "../assets/404.json";
import Lottie from "lottie-react/build";

const PageNotFound = () => {
  return (
    <div className="flex items-center justify-center text-center  sm:h-screen h-[80vh]">
      <div className="md:w-[40%] w-full absolute">
        <Lottie
          animationData={Error404}
        />
      </div>
      <Link to="/">
        <button type="button" className="blue_button relative md:top-44 2xl:top-80 top-44">
          Go To Home
        </button>
      </Link>
    </div>
  );
};

export default PageNotFound;
