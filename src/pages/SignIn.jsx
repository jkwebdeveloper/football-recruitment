import React, { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Header from "../components/Header";
import banner from "../assets/Login_BG.png";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik, Form, FormikProvider, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { handleLoginUser, signInApi } from "../redux/AuthSlice";
import styled from "styled-components";
import useAbortApiCall from "../hooks/useAbortCallApi";
import toast from "react-hot-toast";

// import axios from "axios";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { loading, user } = useSelector((s) => s.root.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { AbortControllerRef, abortApiCall } = useAbortApiCall();

  const SigninSchema = yup.object().shape({
    email: yup.string().email().required("Email field is required !"),
    password: yup.string().required("Password is must be required !"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SigninSchema,
    onSubmit: async (values) => {
      const { email, password } = values;
      let formData = new FormData();
      formData.append("email", "theappideas.meet@gmail.com");
      formData.append("password", "123456");

      const response = dispatch(
        handleLoginUser({
          password,
          email,
          signal: AbortControllerRef,
        })
      );
      if (response) {
        response.then((res) => {
          if (res?.payload?.success === true) {
            toast.success("sign up successfully");
            navigate("/");
          }
        });
      }
    },
  });

  const { getFieldProps, handleSubmit, resetForm } = formik;

  useEffect(() => {
    if (user !== null) {
      navigate("/");
      toast.error("Already logged in");
    }
    return () => abortApiCall();
  }, []);

  return (
    <>
      <Helmet title="SignIn | Football-Recruitment" />
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
          <div className="bg-white md:w-1/2 xl:w-2/5 mt-28 w-[85%]  mx-auto text-center rounded-3xl mb-10 shadow-[11px_13px_0px_4px_rgba(255,255,255,0.14)] md:p-6 p-2">
            <div className="md:space-y-5 space-y-3">
              <p className="text-[#123763] md:text-3xl text-lg font-bold">
                Sign In
              </p>
              <div className="">
                <hr className="line" />
              </div>
              <p className="text-center w-full mx-auto md:text-xl text-lg text-red-600 font-semibold">
                {/* {errorMessage !== "" && errorMessage} */}
              </p>
              <FormikProvider value={formik}>
                <Form autoComplete="off" onSubmit={handleSubmit}>
                  <div className="text-left md:space-y-2">
                    <label className="label_text" htmlFor="email">
                      Email Address
                    </label>
                    <input
                      className="input_field md:space-y-2"
                      id="username"
                      name="email"
                      type="text"
                      placeholder="Enter your email"
                      {...getFieldProps("email")}
                    />
                    <ErrorMessage name="email" component={TextError} />
                  </div>
                  <div className="text-left relative z-10 md:space-y-2">
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
                  <div className="flex gap-3 items-center mt-4 ">
                    <input
                      id="link-checkbox"
                      type="checkbox"
                      value=""
                      className="w-5 h-5"
                    />
                    <label
                      htmlFor="link-checkbox"
                      className="label_text text-sm"
                    >
                      Keep me signed in{" "}
                    </label>
                  </div>
                  <div className="md:space-y-5 space-y-5 mt-4">
                    <button
                      type="Submit"
                      className="blue_button md:px-10 px-5 cursor-pointer"
                      disabled={loading}
                    >
                      {loading ? "Signing in..." : "Sign In"}
                    </button>
                    <Link to="/forgot-password">
                      <p
                        className="text-[#333] mt-3 md:text-base text-sm"
                        onClick={() => {
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        Forgot Password ?
                      </p>
                    </Link>
                    <div>
                      <span className="text-[#333]  md:text-base text-sm">
                        Don’t have an account?{" "}
                        <Link to="/sign-up">
                          <span className="text-primary_color font-semibold">
                            Sign Up
                          </span>
                        </Link>
                      </span>
                    </div>
                  </div>
                </Form>
              </FormikProvider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;

const TextError = styled.span`
  color: red !important;
  font-weight: 500;
  padding-top: 15px;
  font-size: 1rem;
`;
