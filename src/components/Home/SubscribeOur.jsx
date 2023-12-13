import axios from "axios";
import { Formik } from "formik";
import React, { Fragment, useState } from "react";
import { GoMail } from "react-icons/go";
import { newsLatterValidation } from "../../utils/Validations";
import { BiErrorCircle } from "react-icons/bi";
import Lottie from "lottie-react";
import groovyWalkAnimation from "../../assets/loadingBar.json";

const SubscribeOur = () => {
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
    <div className="bg-[#004D7F] lg:py-16 py-5 p-5 relative text-center w-full text-black lg:space-y-5 space-y-2">
      <img
        src={require("../../assets/Group 239788.png")}
        alt=""
        className="lg:block hidden absolute w-48 h-48 dropShadow drop-shadow-2xl -bottom-16 overflow-hidden -left-12"
      />
      <p className="lg:text-3xl text-lg text-white font-bold">
        Subscribe our newsletter
      </p>
      <p className="text-sm text-white font-normal">
        Subscribe for get update info
      </p>

      <Formik
        initialValues={newsLatterValidation.initialState}
        validationSchema={newsLatterValidation.schema}
        onSubmit={(values, action) => {
          handlePost(values);
          action.resetForm();
        }}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <>
            <Fragment>
              <div className=" flex justify-around items-center border-2 border-[#8D8FDD] bg-white rounded-lg lg:flex-row md:w-2/5 flex-col mx-auto px-3 py-4 lg:p-5">
                <div className=" flex gap-5 items-center ">
                  <GoMail className="text-xl" />
                  <input
                    type="text"
                    placeholder="Your Email Adress"
                    className="outline-none"
                    name="email"
                    value={values.email}
                    onChange={handleChange("email")}
                    onBlur={handleBlur("email")}
                  />
                </div>
                <span
                  className="error"
                  style={{ color: "red", fontSize: "13px" }}
                >
                  {errors.email}
                </span>

                <button
                  type="submit"
                  className="blue_button hover:bg-blue_button/80 active:scale-90 transition text-sm font-normal lg:w-[37%] w-full"
                  onClick={handleSubmit}
                >
                  {loading
                    ? // <Lottie
                      //   animationData={groovyWalkAnimation}
                      //   loop={true}
                      //   className="w-7 justify-center flex mx-auto"
                      // />
                      "Loading..."
                    : "Send Email"}
                </button>
              </div>
            </Fragment>
          </>
        )}
      </Formik>

      <img
        src={require("../../assets/shape.png")}
        alt=""
        className="lg:block hidden absolute w-28  top-7 overflow-hidden -right-0"
      />
    </div>
  );
};

export default SubscribeOur;
