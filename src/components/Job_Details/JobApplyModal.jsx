import { Formik } from "formik";
import React, { Fragment, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { submitApplicationValidation } from "../../utils/Validations";
import PhoneInput from "react-phone-input-2";
import { useForm } from "react-hook-form";
import { handleApplyForJob } from "../../redux/JobSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import useAbortApiCall from "../../hooks/useAbortCallApi";
import { yupResolver } from "@hookform/resolvers/yup";
import { isPossiblePhoneNumber } from "react-phone-number-input";
import { isValidPhoneNumber } from "react-phone-number-input";
import BaseUrl from "../../BaseUrl";
import ResumeModal from "../MyAccount/ResumeModal";

const JobApplyModal = ({ visible, onClose }) => {
  const [openModal, setOpenModal] = useState(false);
  const { loading, user, token } = useSelector((state) => state.root.auth);
  const { applyJobLoading, singleJob } = useSelector((state) => state.root.job);
  const { resume } = useSelector((s) => s.root.myaccount);

  console.log(singleJob?.title, "-----------");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { AbortControllerRef } = useAbortApiCall();

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    shouldFocusError: true,
    resolver: yupResolver(submitApplicationValidation.schema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      resume: null,
    },
  });

  const onSubmit = (data) => {
    if (applyJobLoading) return;
    const { name, email, phone, resume } = data;
    if (!isPossiblePhoneNumber(phone) || !isValidPhoneNumber(phone)) {
      toast.remove();
      toast.error("phone is invalid");
      return true;
    }
    const response = dispatch(
      handleApplyForJob({
        id: singleJob?._id,
        title: singleJob?.title,
        name,
        email,
        phone,
        resume,
        token,
      })
    );
    console.log(singleJob?.title,"singleJob?.title");
    if (response) {
      response.then((res) => {
        if (res?.payload?.success === true) {
          console.log(res, "response");
          toast.success(res?.payload?.message);
          console.log(res?.payload?.message);
          reset();
          onClose();
        }
      });
    }
  };

  if (!visible) return null;

  const handleOnClose = () => {
    setOpenModal(false);
  };
  return (
    <div className="fixed -top-5 inset-0 bg-black bg-opacity-30 overflow-auto scrollbar-hide backdrop-blur-sm z-50">
      <div className="jobmodal bg-white md:w-2/5 w-[90%] rounded-2xl relative items-center justify-center xl:top-20 top-24 mx-auto p-5 space-y-4">
        <AiOutlineClose onClick={onClose} className="cursor-pointer ml-auto" />
        <div className=" space-y-4">
          <p className="text-xl text-[#25324B] font-semibold">
            Submit your application
          </p>
          <p className="text-sm text-[#7C8493]">The following is required</p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="text-left md:space-y-2">
              <label className="label_text" htmlFor="email">
                Full name
              </label>
              <input
                className="input_field"
                name="name"
                type="text"
                placeholder="Enter your fullname"
                {...register("name")}
              />
              <span className="error">{errors?.name?.message}</span>
            </div>
            <div className="text-left md:space-y-2">
              <label className="label_text" htmlFor="email">
                Email address
              </label>
              <input
                className="input_field"
                name="email"
                type="email"
                placeholder="Enter your Email address"
                {...register("email")}
              />
              <span className="error">{errors?.email?.message}</span>
            </div>
            <div className="text-left md:space-y-2">
              <label className="label_text" htmlFor="email">
                Phone number
              </label>
              <PhoneInput
                country={"us"}
                countryCodeEditable={false}
                enableSearch={true}
                inputProps={{
                  name: "phone",
                }}
                onChange={(value) =>
                  setValue("phone", "+".concat(value).trim())
                }
                value={getValues("phone")}
                inputStyle={{
                  width: "100%",
                  // borderRadius: "6px",
                  // border: "1px",
                  padding: "1.2rem 0 1.2rem 3rem",
                }}
                disabled={loading}
                // dropdownStyle={{ background: "lightgray" }}
                // buttonStyle={{ border: "0px" }}
              />
              <span className="error">{errors.phone?.message}</span>
            </div>
            <div className="text-left md:space-y-2">
              <label className="label_text" htmlFor="email">
                Select your resume
              </label>
              <select
                name="resume"
                className="border rounded-lg w-full p-3 outline-none"
                {...register("resume")}
              >
                <option label="select resume"></option>
                {resume?.length > 0 &&
                  resume?.map((res) => (
                    <option
                      key={res?._id}
                      value={BaseUrl.concat(res?.resumePdf)}
                    >
                      {res?.resumeTitle}
                    </option>
                  ))}
              </select>
              <span className="error">{errors?.resume?.message}</span>
            </div>
            <button className="blue_button" onClick={() => setOpenModal(true)}>
              Upload Resume
            </button>
            <button
              type="submit"
              className="blue_button w-full"
              disabled={applyJobLoading}
            >
              {applyJobLoading ? "Submitting..." : "Submit Application"}
            </button>
          </form>
          <p>
            By sending the request you can confirm that you accept our{" "}
            <span className="text-primary_color">
              <Link
                to="/terms-and-conditions"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                {" "}
                Terms of Service{" "}
              </Link>
              and{" "}
              <Link
                to="/privacy-policy"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                {" "}
                Privacy Policy
              </Link>
            </span>
          </p>
        </div>
        <ResumeModal onClose={handleOnClose} visible={openModal} />
      </div>
    </div>
  );
};

export default JobApplyModal;
