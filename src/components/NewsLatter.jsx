import axios from "axios";
import { Formik } from "formik";
import React, { Fragment, useState } from "react";
import { GoMail } from "react-icons/go";
import { newsLatterValidation } from "../utils/Validations";

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
      <h1 className="lg:text-3xl text-lg text-black font-bold">
        Subscribe our newsletter
      </h1>
      <p>Subscribe for get update info</p>
      <div className="border-2 border-[#E7E7E7] bg-white rounded-lg flex justify-around items-center gap-5 lg:flex-row md:w-2/5 flex-col mx-auto p-2 lg:p-4">
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
            <Fragment>
              <div>

                <div className=" flex gap-3 items-center ">
                  <GoMail className="text-xl text-[#999999]" />
                  <input
                    type="email"
                    placeholder="Your Email Adress"
                    className="outline-none p-1"
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
              </div>
                <button
                  type="button"
                  className="blue_button hover:bg-blue_button/80 active:scale-90 transition text-sm font-normal lg:w-1/3 w-full"
                  onClick={handleSubmit}
                >
                  {loading ? "Loading..." : "Send Email"}
                </button>
            </Fragment>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default NewsLatter;
