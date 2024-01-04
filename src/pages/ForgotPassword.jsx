import React, { Fragment, useEffect } from "react";
import banner from "../assets/Login_BG.png";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useAbortApiCall from "../hooks/useAbortCallApi";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import { handleForgotPassword } from "../redux/AuthSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const forgotSchema = yup.object({
    email: yup.string().email().required("email is required").trim(),
  });

  const { loading, user, error } = useSelector((state) => state.root.auth);

  const dispatch = useDispatch();

  const { AbortControllerRef, abortApiCall } = useAbortApiCall();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    shouldFocusError: true,
    resolver: yupResolver(forgotSchema),
  });

  const onSubmit = (data) => {
    const { email } = data;
    const response = dispatch(
      handleForgotPassword({
        email,
        signal: AbortControllerRef,
      })
    );
    if (response) {
      response.then((res) => {
        if (res?.payload?.success === true) {
          toast.success("check your mails.", { duration: 4000 });
        } else if (res?.payload?.success === false) {
          toast.error(res?.payload?.message);
        }
      });
    }
  };

  useEffect(() => {
    if (user !== null) {
      navigate("/");
      toast.error("Already logged in");
    }
    return () => abortApiCall();
  }, []);

  return (
    <>
      <Helmet title="Forgot-Password | Football-Recruitment" />
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
          <div className="bg-white md:w-1/2 mt-28 xl:w-2/5 w-[85%] mx-auto text-center rounded-3xl mb-10 shadow-[11px_13px_0px_4px_rgba(255,255,255,0.14)] md:p-6 p-2">
            <div className="md:space-y-5 space-y-3">
              <p className="text-[#123763] md:text-3xl text-lg font-bold">
                Forgot Password
              </p>
              <div className="">
                <hr className="line" />
              </div>
              <img
                src={require("../assets/forgot-img.png")}
                alt=""
                className="mx-auto md:w-40 w-44"
              />
              <p className="md:text-base lg:w-4/5 text-md mx-auto text-[#6D6D6D]">
                Enter your email below and we will send you a reset link on your
                email
              </p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Fragment>
                  <div className="text-left">
                    <label htmlFor="email" className="label_text">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="input_field"
                      placeholder="Enter your email"
                      {...register("email")}
                    />
                    <span className="error">{errors?.email?.message}</span>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="blue_button mt-5"
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </button>
                </Fragment>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
