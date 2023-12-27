import axios from "axios";
import { Formik } from "formik";
import React, { Fragment, useState } from "react";
import { GoMail } from "react-icons/go";
import { newsLatterValidation } from "../../utils/Validations";
import { BiErrorCircle } from "react-icons/bi";
import Lottie from "lottie-react";
import groovyWalkAnimation from "../../assets/loadingBar.json";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const SubscribeOur = () => {
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((s) => s.root.auth);

  const handlePost = (values) => {
    setLoading(true);
    axios("https://admin.footballrecruitment.eu/api/newsletter", {
      method: "post",
      data: {
        email: values.email,
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div className="bg-[#004D7F] lg:py-16 py-5 p-5 relative text-center  text-black lg:space-y-5 space-y-2">
      <img
        src={require("../../assets/Group 239788.png")}
        alt=""
        className="lg:block hidden absolute w-48 h-48 dropShadow drop-shadow-2xl -bottom-16 overflow-hidden -left-12"
      />
      <div className="space-y-5">
        <div>
          <p className="lg:text-3xl job_details text-lg text-white font-bold">
            Upload Your Resume
          </p>
        </div>
        <div>
          {user !== null ? (
            <Link
              to="/my-account"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <button
                type="submit"
                className="focus:outline-none bg-white text-primary_color font-medium rounded-lg active:scale-90 transition text-sm md:px-10 px-5 md:py-3 py-2"
              >
                Submit Your CV
              </button>
            </Link>
          ) : (
            <Link
              to="/sign-up"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <button
                type="submit"
                className="focus:outline-none bg-white text-primary_color font-medium rounded-lg active:scale-90 transition text-sm md:px-10 px-5 md:py-3 py-2"
              >
                Submit Your CV
              </button>
            </Link>
          )}
        </div>
      </div>
      <img
        src={require("../../assets/shape.png")}
        alt=""
        className="lg:block hidden absolute w-28  top-0 overflow-hidden -right-0"
      />
    </div>
  );
};

export default SubscribeOur;
