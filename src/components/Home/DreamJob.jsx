import React, { useEffect, useState } from "react";
import Header from "../Header";
import FindMyForm from "./FindMyForm";
import { FaArrowDown } from "react-icons/fa6";
import axios from "axios";
import { Helmet } from "react-helmet";
import Lottie from "lottie-react";
import groovyWalkAnimation from "../../assets/loadingBar.json";

const DreamJob = () => {
  const [banner, setBanner] = useState();
  const [loading, setLoading] = useState(true);

  const handleGetBanner = () => {
    axios
      .get("https://admin.footballrecruitment.eu/api/banner", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setBanner(res.data.banner);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  useEffect(() => {
    handleGetBanner();
  }, []);
  return (
    <div
      // style={{ backgroundImage: `url(${banner})`, backgroundSize: "cover", filter: "brightness(1.75)" }}
      className="w-full relative h-[88vh] 2xl:h-[75vh] "
    >
      {loading ? (
        <div className="flex justify-center mx-auto mt-28 w-64">
          <Lottie animationData={groovyWalkAnimation} loop={true} />
        </div>
      ) : banner ? (
        <div className="">
          <img
            src={"https://admin.footballrecruitment.eu".concat(
              banner?.image
            )}
            alt="banner"
            autoPlay
            loop
            muted
            className="absolute brightness-[.8] object-cover w-full 2xl:h-[75vh]  h-[90vh]"
            // style={{ backgroundColor: "#000" }}
          />
        </div>
      ) : (
        <div className="flex justify-center items-center mt-28">No Banner</div>
      )}
      <Header />
      <div className="flex  justify-center items-center 2xl:h-[80vh] h-[100vh] w-full">
        <FindMyForm />
      </div>

      <div className="flex absolute -bottom-8  w-full">
        <img
          src={require("../../assets/Vector.png")}
          alt=""
          className="h-12 w-auto flex-1 "
        />
        <img
          src={require("../../assets/Vector.png")}
          alt=""
          className="h-12 w-auto flex-1 "
        />
        <img
          src={require("../../assets/Vector.png")}
          alt=""
          className="h-12 w-auto flex-1 "
        />
        <img
          src={require("../../assets/Vector.png")}
          alt=""
          className="h-12 w-auto flex-1 "
        />
        <img
          src={require("../../assets/Vector.png")}
          alt=""
          className="h-12 w-auto flex-1 "
        />
        <img
          src={require("../../assets/Vector.png")}
          alt=""
          className="h-12 w-auto flex-1 "
        />
        <img
          src={require("../../assets/Vector.png")}
          alt=""
          className="h-12 w-auto flex-1 "
        />
      </div>
      <div className="flex gap-6">
        <img
          src={require("../../assets/Group 239788.png")}
          alt=""
          className="w-44 h-44 absolute -bottom-20 hidden lg:block right-0"
        />
        {/* <FaArrowDown className="absolute bottom-8 hidden lg:block right-7 text-white text-xl cursor-pointer"/> */}
      </div>

      {/* <video className="relative"
        src={require("../../assets/video.mp4")}
        autoPlay
        loop
        muted
        typeof=""
      /> */}
    </div>

    // </video>
  );
};

export default DreamJob;
