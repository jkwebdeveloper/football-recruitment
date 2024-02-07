import React, { Fragment, useEffect, useState } from "react";
import Header from "../Header";
import banner from "../../assets/Login_BG.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import * as yup from "yup";
import styled from "styled-components";
import "react-phone-input-2/lib/style.css";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import useAbortApiCall from "../../hooks/useAbortCallApi";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import axios from "axios";
import {
  handleGetResume,
  handleUploadResume,
} from "../../redux/MyAccountSlice";
import { handleRegisterUser } from "../../redux/AuthSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "formik";

const StepOne = ({ setStep, values, setValue }) => {
  const [resume, setResume] = useState(null);
  const [jobtitle, setJobTitle] = useState([]);
  const [jobTitleLoading, setJobTitleLoading] = useState(false);
  // const [jobSkills, setJobSkills] = useState([]);

  const { loading } = useSelector((state) => state.root.auth);
  const { singleJob } = useSelector((state) => state.root.job);
  const { resumeUploadLoading } = useSelector((state) => state.root.myaccount);

  console.log(singleJob?.title);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { AbortControllerRef, abortApiCall } = useAbortApiCall();

  useEffect(() => {
    const fetchJobTitles = async () => {
      try {
        const response = await axios.get(
          "https://football-recruitment.onrender.com/api/job-title",
          // "http://192.168.29.200:5000/api/job-title",
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        // const jobskills = await axios.get(
        //   "https://football-recruitment.onrender.com/api/job-skill",
        //   // "http://192.168.29.200:5000/api/job-skill",
        //   {
        //     headers: { "Content-Type": "application/json" },
        //   }
        // );

        // setJobSkills(
        //   jobskills.data.data.map((el) => ({
        //     value: el._id,
        //     label: el.name,
        //   }))
        // );

        const data = response.data.data.map((el) => ({
          value: el._id,
          label: el.name,
        }));
        setJobTitle(data);
        // console.log("data", data);
        setJobTitleLoading(false);
      } catch (error) {
        setJobTitleLoading(false);
      }
    };

    fetchJobTitles();
  }, []);

  const { jobTitle, resumeTitle, experience, name, email, phone, city, state } =
    values;

  const resumeSchema = yup.object({
    jobTitle: yup
      .array()
      .max(3, "max 3 Title required")
      .min(1, "Please select at least one job title")
      .required("Job title is required"),
    // jobSkill: yup
    //   .array()
    //   .max(5, "max 5 tags")
    //   .min(1, "Please select at least one job Skills")
    //   .required("Job Skill is required"),
    experience: yup.string().required("Experience is required"),
    resumeTitle: yup.string().required("resume title is required"),
    resume: yup
      .mixed()
      .required("resume is required")
      .test("fileSize", "File should be less than 2 MB!!!", (value) => {
        return value && value[0].size <= 2_000_000;
      })
      .test(
        "type",
        "Only the following formats are accepted: .pdf, .doc, .docx",
        (value) => {
          return (
            value &&
            (value[0].type === "application/pdf" ||
              value[0].type === "application/msword" ||
              value[0].type ===
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
          );
        }
      ),
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(resumeSchema),
    defaultValues: {
      jobTitle,
      resumeTitle,
      experience,
      resume,
    },
  });

  const onSubmit = async (data) => {
    if (resumeUploadLoading) return;
    const { jobTitle, experience, resumeTitle } = data;
    setValue("jobTitle", jobTitle);
    setValue("resumeTitle", resumeTitle);
    setValue("experience", experience);
    setValue("resume", resume);

    const response = dispatch(
      handleRegisterUser({
        name,
        email,
        phone,
        city,
        state,
        resume,
        experience,
        resumeTitle,
        jobId: singleJob?._id,
        title: singleJob?.title,
        jobTitle: jobTitle.map(({ value }) => value),
        signal: AbortControllerRef,
      })
    );
    if (response) {
      response.then((res) => {
        console.log(res);
        if (res?.payload?.success) {
          toast.success(res?.payload?.message, { duration: 2000 });
          // console.log(res?.payload?.message);
          navigate("/my-account");
        }
      });
    }
  };

  useEffect(() => {
    return () => abortApiCall();
  }, []);

  // console.log(getValues());

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <div className="text-left md:space-y-2">
        <label className="label_text" htmlFor="jobTitle">
          Job Title
        </label>

        <Controller
          name="jobTitle"
          control={control}
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { invalid, isTouched, isDirty, error },
            formState,
          }) => (
            <Select
              isMulti
              options={loading ? [] : jobtitle} // Use the dynamic jobtitles array
              className="basic-multi-select"
              name={name}
              onChange={onChange}
              onBlur={onBlur}
            />
          )}
        />
        <span className="error">{errors?.jobTitle?.message}</span>
      </div>
      <div className="text-left md:space-y-2">
        <label className="label_text" htmlFor="resumeTitle">
          Experience
        </label>
        <select
          name="experience"
          placeholder="Select Experience"
          id=""
          {...register("experience")}
          className="border-[#C4C4C4] focus:border-primary_color w-full outline-none md:p-2 p-1 rounded-[4px]"
          style={{ border: "1px solid #C4C4C4", padding: "8px" }}
        >
          <option value="Fresher">Fresher</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="10+">10+</option>
        </select>
        <span className="error">{errors?.experience?.message}</span>
      </div>
      <div className="text-left md:space-y-2">
        <div className="">
          <div>
            <label className="label_text" htmlFor="resumeTitle">
              Resume Title
            </label>
            <input
              className="input_field"
              type="text"
              placeholder="title"
              {...register("resumeTitle")}
            />
            <span className="error">{errors?.resumeTitle?.message}</span>
          </div>
          <div className="text-left md:space-y-2 w-full mt-5">
            {/* <div className="xl:flex-row flex-col w-full flex xl:gap-4 gap-5 items-center justify-between"> */}
            <input
              type="file"
              {...register("resume", {
                onChange: (e) => setResume(e.target.files[0]),
              })}
              id="actual-btn"
              name="resume"
              hidden
              className="mx-auto"
              accept=".pdf, .doc, .docx, .odt"
            />
            <label
              for="actual-btn"
              className=" bg-[#C9E5F8] focus:outline-none cursor-pointer  text-primary_color font-medium active:scale-90 transition text-sm md:px-10 px-5 md:py-3 py-2"
            >
              Browse file
            </label>
            <span className="error">{errors?.resume?.message}</span>
            {/* </div> */}
            {resume !== null && (
              <div className="text-left text-lg">{resume?.name}</div>
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-5 justify-center items-center">
        <button
          type="button"
          className="blue_button mt-5"
          disabled={loading}
          onClick={() => setStep(0)}
        >
          Back
        </button>
        <button type="submit" className="blue_button mt-5" disabled={loading}>
          {loading ? "Applying..." : "Apply"}
          {/* Submit */}
        </button>
      </div>
      <p>
        Already have an account?{" "}
        <Link to="/sign-in">
          <span className="text-primary_color font-semibold">Sign In</span>
        </Link>
      </p>
    </form>
  );
};

export default StepOne;

const TextError = styled.span`
  color: red !important;
  font-weight: 500;
  padding-top: 15px;
  font-size: 1rem;
`;
