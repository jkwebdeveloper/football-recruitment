import axios from "axios";
import { Formik } from "formik";
import React, { Fragment, useState } from "react";
import { GoMail } from "react-icons/go";
import { newsLatterValidation } from "../utils/Validations";
import { Link } from "react-router-dom";

const NewsLatter = () => {
  const [loading, setLoading] = useState(false);

  const handlePost = (values) => {
    setLoading(true);
    axios("https://football-recruitment.onrender.com/api/newsletter", {
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
    <div className="bg-[#FAFAFA] w-full xl:py-16 py-8 space-y-4 text-center">
      <div className="space-y-4">
        <div>
          <h1 className="lg:text-3xl text-lg text-black font-bold">
            Upload Your Resume
          </h1>
        </div>
        <div>
          <Link
            to="/sign-up"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <button
              type="button"
              className="blue_button hover:bg-blue_button/80 active:scale-90 transition text-sm font-normal"
              // onClick={handleSubmit}
            >
              {/* {loading ? "Loading..." : "Send Email"} */}
              Submit Your CV
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsLatter;
