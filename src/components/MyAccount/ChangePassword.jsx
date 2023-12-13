import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAbortApiCall from "../../hooks/useAbortCallApi";
import { changePasswordSchema } from "../../utils/Validations";
import { handleChangePassword, handleLogout } from "../../redux/AuthSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const ChangePassword = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setshowNewPassword] = useState(false);

  const { loading, token } = useSelector((state) => state.root.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { AbortControllerRef } = useAbortApiCall();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    shouldFocusError: true,
    resolver: yupResolver(changePasswordSchema),
  });

  const onSubmit = (data) => {
    if (loading) return;
    const { oldPassword, newPassword, confirmPassword } = data;
    const response = dispatch(
      handleChangePassword({
        oldPassword,
        newPassword,
        confirmPassword,
        token,
        signal: AbortControllerRef,
      })
    );
    if (response) {
      response.then((res) => {
        if (res?.payload?.success === true) {
          toast.success("Password change successfully.", { duration: 4000 });
          toast.loading("Logout".concat("..."));
          setTimeout(() => {
            toast.remove();
            dispatch(handleLogout());
          }, 1000);
        }
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 bg-white xl:p-5 p-3"
    >
      <p className="text-xl text-[#25324B] font-semibold">Change Password</p>
      <div className="text-left md:space-y-2 relative">
        <label className="label_text" htmlFor="email">
          Old password*
        </label>
        <input
          className="input_field"
          type={showOldPassword ? "text" : "password"}
          id="username"
          placeholder="Type here..."
          {...register("oldPassword")}
        />
        <button
          type="button"
          onClick={() => setShowOldPassword(!showOldPassword)}
          className="absolute top-9 cursor-pointer right-3 text-gray-600 rounded-full bg-white"
        >
          {showOldPassword ? (
            <BsEyeFill size={20} />
          ) : (
            <BsEyeSlashFill size={20} />
          )}
        </button>
        <span role="alert" className="error">
          {errors?.oldPassword?.message}
        </span>
      </div>
      <div className="text-left md:space-y-2 relative">
        <label className="label_text" htmlFor="new_password">
          New password*
        </label>
        <input
          className="input_field"
          id="username"
          type={showNewPassword ? "text" : "password"}
          placeholder="Type here..."
          {...register("newPassword")}
        />
        <button
          type="button"
          onClick={() => setshowNewPassword(!showNewPassword)}
          className="absolute top-9 cursor-pointer right-3 text-gray-600 rounded-full bg-white"
        >
          {showOldPassword ? (
            <BsEyeFill size={20} />
          ) : (
            <BsEyeSlashFill size={20} />
          )}
        </button>
        <span role="alert" className="error">
          {errors?.newPassword?.message}
        </span>
      </div>
      <div className="text-left md:space-y-2">
        <label className="label_text" htmlFor="email">
          Confirm password*
        </label>
        <input
          className="input_field"
          id="username"
          type="password"
          placeholder="Type here..."
          {...register("confirmPassword")}
        />
        <span role="alert" className="error">
          {errors?.confirmPassword?.message}
        </span>
      </div>
      <div>
        <button type="submit" disabled={loading} className="blue_button">
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default ChangePassword;
