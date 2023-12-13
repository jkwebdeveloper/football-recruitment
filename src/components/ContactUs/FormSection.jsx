import React, { Fragment, useEffect, useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { GrMail } from "react-icons/gr";
import { Formik } from "formik";
import { contactValidation } from "../../utils/Validations";
import { BiErrorCircle } from "react-icons/bi";
import { TfiWorld } from "react-icons/tfi";
import { BiLogoLinkedin } from "react-icons/bi";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";

const FormSection = () => {
  const [loading, setLoading] = useState(false);
  const [contact, setContact] = useState({});

  const handlePost = (values) => {
    setLoading(true);
    axios("https://football-recruitment.onrender.com/api/contact", {
      method: "post",
      data: {
        email: values.email,
        name: values.name,
        phone: values.phone,
        message: values.message,
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        // console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        // console.log(err);
        setLoading(false);
      });
  };

  // const handleGetContact = () => {
  //   axios
  //     .get("https://football-recruitment.onrender.com/api/contact", {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //     .then((res) => {
  //       setContact(res.data.contact);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       setLoading(false);
  //     });
  // };
  // useEffect(() => {
  //   handleGetContact();
  // }, []);

  return (
    <div className="flex md:flex-row flex-col  justify-center lg:px-8 px-2 gap-5 ">
      <div className="md:w-2/5 w-full bg-[#FFF] border  border-[#E6E6E6] rounded-xl">
        <img
          src={require("../../assets/final_banner_1280.jpg")}
          alt=""
          className="rounded-xl"
        />
        <div className="flex 2xl:divide-x divide-y-2 divide-primary_color 2xl:divide-y-0 2xl:divide-primary_color 2xl:flex-row  flex-col">
          <div className="xl:p-5 p-3 2xl:p-3  space-y-3">
            <div>
              <p className="text-xl font-semibold text-primary_color">
                Gennaro Capasso
              </p>
              <p className="text-primary_color">Managing Director</p>
            </div>
            <div className="flex gap-3">
              <IoLocationSharp className="text-xl text-primary_color" />
              <p className="font-medium">London United Kingdom</p>
            </div>
            <div className="flex gap-3">
              <FaPhoneAlt className="text-lg text-primary_color" />
              <ul>
                <li>
                  <a href="tel:00447799896414">
                    <p className="font-medium">00447799896414</p>
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex gap-3">
              <GrMail className="text-xl text-primary_color" />
              <ul>
                {/* <li className="font-medium">contact@footballrecruitment.eu</li> */}
                <li>
                  <a href="mailto:contact@footballrecruitment.eu">
                    <p className="font-medium">
                      gennaro@footballrecruitment.eu
                    </p>
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex gap-3">
              <TfiWorld className="text-lg text-primary_color" />
              <p className="font-medium">www.footballrecruitment.eu</p>
            </div>
            <div className="flex gap-3">
              <BiLogoLinkedin className="text-lg text-primary_color" />
              <p className="font-medium">gennarocapasso</p>
            </div>
          </div>
          <div className="2xl:py-4 2xl:px-4 xl:p-5 p-3 2xl:p-0 space-y-3">
            <div>
              <p className="text-xl font-semibold text-primary_color">
                Giuseppe Capasso
              </p>
              {/* <p className="text-primary_color">Managing Director</p> */}
            </div>
            <div className="flex gap-3">
              <IoLocationSharp className="text-xl text-primary_color" />
              <p className="font-medium">London United Kingdom</p>
            </div>
            <div className="flex gap-3">
              <FaPhoneAlt className="text-lg text-primary_color" />
              <ul>
                <li>
                  <a href="tel:00393355787715">
                    <p className="font-medium">00 39 335 5787715</p>
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex gap-2">
              <GrMail className="text-xl text-primary_color" />
              <ul>
                {/* <li className="font-medium">contact@footballrecruitment.eu</li> */}
                <li>
                  <a href="mailto:contact@footballrecruitment.eu">
                    <p className="font-medium">
                      Giuseppe@footballrecruitment.eu
                    </p>
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex gap-3">
              <TfiWorld className="text-lg text-primary_color" />
              <p className="font-medium">www.footballrecruitment.eu</p>
            </div>
            <div className="flex gap-3">
              <BiLogoLinkedin className="text-lg text-primary_color" />
              <p className="font-medium">giuseppecapasso</p>
            </div>
          </div>
        </div>
        <div className="bg-primary_color h-2 rounded-b-xl"></div>
      </div>
      <div className="md:w-3/5 w-full bg-white shadow-md h-fit  rounded-xl p-6 space-y-5 ">
        <p className="text-2xl font-semibold">Get in touch</p>
        <Formik
          initialValues={contactValidation.initialState}
          validationSchema={contactValidation.schema}
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
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                <div>
                  <input
                    type="text"
                    placeholder="YOUR NAME *"
                    name="name"
                    className="border border-[#C4C4C4] w-full outline-none p-2 rounded-[4px]"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <span
                    className="error"
                    style={{ color: "red", fontSize: "13px" }}
                  >
                    {errors.name}
                  </span>
                  {errors.name && touched.name ? (
                    <BiErrorCircle
                      style={{
                        float: "right",
                        marginTop: "5px",
                        color: "red",
                      }}
                    />
                  ) : null}
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="EMAIL ADDRESS *"
                    className="border border-[#C4C4C4] w-full outline-none p-2 rounded-[4px]"
                    value={values.email}
                    onChange={handleChange("email")}
                    onBlur={handleBlur("email")}
                  />
                  <span
                    className="error"
                    style={{ color: "red", fontSize: "13px" }}
                  >
                    {errors.email}
                  </span>
                  {errors.email && touched.email ? (
                    <BiErrorCircle
                      style={{
                        float: "right",
                        marginTop: "5px",
                        color: "red",
                      }}
                    />
                  ) : null}
                </div>
              </div>
              <div className="grid grid-cols-1">
                <PhoneInput
                  countryCodeEditable={false}
                  enableSearch={true}
                  inputProps={{
                    name: "phone",
                  }}
                  // className="border border-[#C4C4C4] w-full outline-none p-2 rounded-[4px]"
                  value={values.phone}
                  country={"us"}
                  onChange={(value) => {
                    // Formik's handleChange requires an object with a target property
                    handleChange({
                      target: {
                        name: "phone",
                        value: value,
                      },
                    });
                  }}
                  onBlur={handleBlur}
                  inputStyle={{
                    width: "100%",
                    padding: "21px",
                    paddingLeft: "54px",
                  }}
                  // isValid={(value, country) => {
                  //   You can customize the phone number validation here
                  //   For example, check if the phone number has a specific length
                  //   return value.length === 10; // Adjust the condition as needed
                  // }}
                />
                <span
                  className="error"
                  style={{ color: "red", fontSize: "13px" }}
                >
                  {errors.phone}
                </span>
              </div>
              <div className="grid grid-cols-1">
                <textarea
                  name="message"
                  id="message"
                  placeholder="MESSAGES *"
                  cols="30"
                  rows="4"
                  className="border border-[#C4C4C4] w-full min-h-[200px] max-h-[200px] outline-none p-2 rounded-[4px]"
                  value={values.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <span
                  className="error"
                  style={{ color: "red", fontSize: "13px" }}
                >
                  {errors.message}
                </span>
                {/* {errors.message && touched.message ? (
                  <BiErrorCircle
                    style={{
                      float: "right",
                      marginTop: "5px",
                      color: "red",
                    }}
                  />
                ) : null} */}
              </div>
              <button
                type="submit"
                className="blue_button px-9"
                onClick={handleSubmit}
              >
                {loading ? "Loading..." : "Submit"}
              </button>
            </Fragment>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FormSection;