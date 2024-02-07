import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import banner from "../assets/Login_BG.png";
import { useForm } from "react-hook-form";
import { Form, FormikProvider, useFormik, ErrorMessage } from "formik";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import toast from "react-hot-toast";
import * as yup from "yup";
import useAbortApiCall from "../hooks/useAbortCallApi";
import {
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from "react-phone-number-input";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleSignUp } from "../redux/AuthSlice";
import PhoneInput from "react-phone-input-2";
import styled from "styled-components";
import "react-phone-input-2/lib/style.css";
import Header from "../components/Header";

const SignupNew = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { AbortControllerRef, abortApiCall } = useAbortApiCall();

  const { loading, user } = useSelector((state) => state.root.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const SignupNewSchema = yup.object().shape({
    name: yup
      .string()
      .min(4, "Name must be at least 4 characters")
      .trim()
      .required("Name is must be required"),
    email: yup.string().email().required("Email field is required !"),
    city: yup.string().required("City field is required !"),
    state: yup.string().required("State field is required !"),
    phone: yup.string().required("Phone Number is required !"),
    password: yup.string().required("Password is must be required !"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      city: "",
      state: "",
      phone: "",
    },
    validationSchema: SignupNewSchema,
    onSubmit: (values) => {
      const { city, email, name, password, phone, state } = values;
      if (!isPossiblePhoneNumber(phone) || !isValidPhoneNumber(phone)) {
        toast.remove();
        toast.error("phone is invalid");
        return true;
      }
      const response = dispatch(
        handleSignUp({
          name,
          email,
          password,
          phone,
          city,
          state,
          signal: AbortControllerRef,
        })
      );
      if (response) {
        response.then((res) => {
          if (res?.payload?.success === true) {
            toast.success("sign up successfully", { duration: 2000 });
            navigate("/my-account");
          }
        });
      }
    },
  });
  const { getFieldProps, handleSubmit, setFieldValue, values, errors } = formik;

  useEffect(() => {
    if (user !== null) {
      navigate("/");
      toast.error("Already logged in");
    }
    return () => {
      abortApiCall();
    };
  }, []);
  return (
    <>
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
          <div className="bg-white md:w-1/2 xl:w-2/5 w-[85%] mt-28 mx-auto text-center rounded-3xl mb-10 shadow-[11px_13px_0px_4px_rgba(255,255,255,0.14)] md:p-6 p-2">
            <div className="md:space-y-5 space-y-3">
              <p className="text-[#123763] md:text-3xl text-lg font-bold">
                Sign Up
              </p>
              <div className="">
                <hr className="line" />
              </div>
              <FormikProvider value={formik}>
                <Form
                  onSubmit={handleSubmit}
                  autoComplete="off"
                  className="space-y-4"
                >
                  <div className="text-left">
                    <label htmlFor="email" className="label_text">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="input_field"
                      placeholder="Enter your name"
                      {...getFieldProps("name")}
                    />
                    <ErrorMessage name="name" component={TextError} />
                  </div>
                  <div className="text-left">
                    <label htmlFor="email" className="label_text">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="input_field"
                      placeholder="Enter your email"
                      {...getFieldProps("email")}
                    />
                    <ErrorMessage name="email" component={TextError} />
                  </div>
                  <div className="text-left">
                    <label htmlFor="phone" className="label_text">
                      Phone
                    </label>
                    <PhoneInput
                      country={"us"}
                      countryCodeEditable={false}
                      enableSearch={true}
                      inputProps={{
                        name: "phone",
                      }}
                      onChange={(value) =>
                        setFieldValue("phone", "+".concat(value).trim())
                      }
                      value={values.phone}
                      inputStyle={{
                        width: "100%",
                        padding: "1.2rem 0 1.2rem 3rem",
                      }}
                      // disabled={loading}
                    />
                    <ErrorMessage name="phone" component={TextError} />
                  </div>
                  <div className="flex lg:flex-row flex-col w-full gap-3">
                    <div className="text-left w-full lg:w-1/2">
                      <label htmlFor="email" className="label_text">
                        Current state
                      </label>
                      <input
                        type="text"
                        name="state"
                        className="input_field"
                        placeholder="Enter your state"
                        {...getFieldProps("state")}
                      />
                      <ErrorMessage name="state" component={TextError} />
                    </div>
                    <div className="text-left w-full lg:w-1/2">
                      <label htmlFor="email" className="label_text">
                        Current city
                      </label>
                      <input
                        type="text"
                        name="city"
                        className="input_field"
                        placeholder="Enter your city"
                        {...getFieldProps("city")}
                      />
                      <ErrorMessage name="city" component={TextError} />
                    </div>
                  </div>
                  <div className="text-left relative md:space-y-2">
                    <label className="label_text" htmlFor="Password">
                      Password
                    </label>
                    <input
                      className="input_field"
                      id="username"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      {...getFieldProps("password")}
                    />
                    {showPassword ? (
                      <BsEyeFill
                        onClick={() => setShowPassword(!showPassword)}
                        role="button"
                        className="absolute right-3 top-9 h-5 w-5 text-primary_color"
                      />
                    ) : (
                      <BsEyeSlashFill
                        onClick={() => setShowPassword(!showPassword)}
                        role="button"
                        className="absolute right-3 top-9 h-5 w-5 text-primary_color"
                      />
                    )}
                    <ErrorMessage name="password" component={TextError} />
                  </div>
                  <button
                    type="submit"
                    className="blue_button mt-5"
                    disabled={loading}
                    // onSubmit={handleSubmit}
                  >
                    {loading ? "Signing up..." : "Sign Up"}
                  </button>
                  <p>
                    Already have an account?{" "}
                    <Link to="/sign-in">
                      <span className="text-primary_color font-semibold">
                        Sign In
                      </span>
                    </Link>
                  </p>
                </Form>
              </FormikProvider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupNew;

const TextError = styled.span`
  color: red !important;
  font-weight: 500;
  padding-top: 15px;
  font-size: 1rem;
`;
