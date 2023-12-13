import React, { useEffect, useState } from "react";
import banner from "../assets/Login_BG.png";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useAbortApiCall from "../hooks/useAbortCallApi";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { handleResetPassword } from "../redux/AuthSlice";
import { resetPasswordSchema } from "../utils/Validations";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const token = window.location.href.split("=")[1];

  const { loading, user } = useSelector((state) => state.root.auth);

  const dispatch = useDispatch();

  const { AbortControllerRef, abortApiCall } = useAbortApiCall();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    shouldFocusError: true,
    resolver: yupResolver(resetPasswordSchema),
  });

  const onSubmit = (data) => {
    const { password } = data;

    const response = dispatch(
      handleResetPassword({
        password,
        token,
        signal: AbortControllerRef,
      })
    );
    if (response) {
      response.then((res) => {
        if (res?.payload?.success === true) {
          toast.success("password Reset successfully");
          navigate("/sign-in");
        }
      });
    }
  };

  useEffect(() => {
    if (user !== null) {
      navigate("/");
      toast.error("Already logged in");
    }
    if (!token) {
      navigate("/");
    }
    return () => abortApiCall();
  }, []);

  return (
    <>
      <Helmet title="Reset-Password | Football-Recruitment" />
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
          <div className="bg-white md:w-1/2 xl:w-2/5 mt-28 w-[85%] mx-auto text-center rounded-3xl mb-10 shadow-[11px_13px_0px_4px_rgba(255,255,255,0.14)] md:p-6 p-2">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="md:space-y-5 space-y-3"
            >
              <p className="text-[#123763] md:text-3xl text-lg font-bold">
                Reset Password
              </p>
              <div className="">
                <hr className="line" />
              </div>
              <img
                src={require("../assets/reset_password.png")}
                alt=""
                className="mx-auto md:auto w-24"
              />

              <div className="text-left relative">
                <label htmlFor="email" className="label_text">
                  password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input_field"
                  placeholder="Enter your password"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <BsEyeFill
                      size={24}
                      className="absolute top-8 cursor-pointer right-3 text-gray-400"
                    />
                  ) : (
                    <BsEyeSlashFill
                      size={24}
                      className="absolute top-8 cursor-pointer right-3 text-gray-400"
                    />
                  )}
                </button>
                <span className="error">{errors?.password?.message}</span>
              </div>
              <div className="text-left">
                <label htmlFor="email" className="label_text">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="input_field"
                  placeholder="Enter your password"
                  {...register("confirmPassword")}
                />
                <span className="error">
                  {errors?.confirmPassword?.message}
                </span>
              </div>
              <button
                type="submit"
                className="blue_button mt-5"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
