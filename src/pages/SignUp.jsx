import React, { useState } from "react";
import banner from "../assets/Login_BG.png";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import { Form, FormikProvider, useFormik, ErrorMessage } from "formik";
import * as yup from "yup";
import styled from "styled-components";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import toast from "react-hot-toast";
import {
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from "react-phone-number-input";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import StepOne from "../components/stepForm/StepOne";

const SignUp = () => {
  const [step, setStep] = useState(0);
  const [resume, setResume] = useState(null);
  const navigate = useNavigate();
  // const history = useHistory();

  const SignupSchema = yup.object().shape({
    name: yup
      .string()
      .min(4, "Name must be at least 4 characters")
      .trim()
      .required("Name is must be required"),
    email: yup.string().email().required("Email field is required !"),
    city: yup.string().required("City field is required !"),
    state: yup.string().required("State field is required !"),
    phone: yup.string().required("Phone Number is required !"),
    // jobTitle: yup
    //   .array()
    //   .max(3, "max 3 Title required")
    //   .min(1, "Please select at least one job title")
    //   .required("Job title is required"),
    // // jobSkill: yup
    // //   .array()
    // //   .max(5, "max 5 tags")
    // //   .min(1, "Please select at least one job Skills")
    // //   .required("Job Skill is required"),
    // experience: yup.string().required("Experience is required"),
    // resumeTitle: yup.string().required("resume title is required"),
    // resume: yup
    //   .mixed()
    //   .required("resume is required")
    //   .test("fileSize", "File should be less than 2 MB!!!", (value) => {
    //     return value && value[0].size <= 2_000_000;
    //   })
    //   .test(
    //     "type",
    //     "Only the following formats are accepted: .pdf, .doc, .docx",
    //     (value) => {
    //       return (
    //         value &&
    //         (value[0].type === "application/pdf" ||
    //           value[0].type === "application/msword" ||
    //           value[0].type ===
    //             "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    //       );
    //     }
    //   ),
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(SignupSchema),
    defaultValues: {
      name: "",
      email: "",
      city: "",
      state: "",
      phone: "",
      jobId: "",
      title: "",
      jobTitle: [],
      resumeTitle: "",
      experience: "",
      resume: null,
    },
  });

  const onSubmit = (data) => {
    const { phone } = data;
    if (!isPossiblePhoneNumber(phone) || !isValidPhoneNumber(phone)) {
      toast.remove();
      toast.error("phone is invalid");
      return;
    }
    if (Object.entries(errors).length === 0) {
      setStep(1);
    }
  };

  return (
    <>
      <Helmet title="SignUp | Football-Recruitment" />
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
                Apply Here
              </p>
              <div className="">
                <hr className="line" />
              </div>
              {step === 1 ? (
                <StepOne
                  setStep={setStep}
                  values={getValues()}
                  setValue={setValue}
                  resume={resume}
                  setResume={setResume}
                />
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
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
                      {...register("name")}
                    />
                    <span className="error">{errors?.name?.message}</span>{" "}
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
                      {...register("email")}
                    />
                    <span className="error">{errors?.email?.message}</span>{" "}
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
                        setValue("phone", "+".concat(value).trim())
                      }
                      value={getValues().phone}
                      inputStyle={{
                        width: "100%",
                        padding: "1.2rem 0 1.2rem 3rem",
                      }}
                      // disabled={loading}
                    />
                    <span className="error">{errors?.phone?.message}</span>{" "}
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
                        {...register("state")}
                      />
                      <span className="error">{errors?.state?.message}</span>{" "}
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
                        {...register("city")}
                      />
                      <span className="error">{errors?.city?.message}</span>{" "}
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="blue_button mt-5"
                    // disabled={loading}
                    // onSubmit={handleSubmit}
                  >
                    {/* {loading ? "Signing up..." : "Next"} */}
                    Next
                  </button>
                  <p>
                    Already have an account?{" "}
                    <Link to="/sign-in">
                      <span className="text-primary_color font-semibold">
                        Sign In
                      </span>
                    </Link>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;

const TextError = styled.span`
  color: red !important;
  font-weight: 500;
  padding-top: 15px;
  font-size: 1rem;
`;
