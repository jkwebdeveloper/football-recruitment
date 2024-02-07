import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import useAbortApiCall from "../../hooks/useAbortCallApi";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import {
  handleGetResume,
  handleUploadResume,
} from "../../redux/MyAccountSlice";
import * as yup from "yup";
import toast from "react-hot-toast";
import Select from "react-select";
import axios from "axios";

const ResumeModal = ({ visible, onClose }) => {
  const [resume, setResume] = useState(null);
  const [jobtitle, setJobTitle] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [jobSkills, setJobSkills] = useState([]);

  const { token } = useSelector((state) => state.root.auth);
  const { resumeUploadLoading } = useSelector((state) => state.root.myaccount);

  const dispatch = useDispatch();

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
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchJobTitles();
  }, []);

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
    setValue,
    getValues,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    shouldFocusError: true,
    resolver: yupResolver(resumeSchema),
    reValidateMode: "onBlur",
    defaultValues: {
      jobTitle: [],
      jobSkill: [],
      resumeTitle: "",
      experience: "",
      resume: null,
    },
  });

  const onSubmit = (data) => {
    if (resumeUploadLoading) return;
    const { resumeTitle, jobTitle, experience } = data;
    // console.log(jobTitle.map(({ value, ...r }) => value));
    // return;
    const response = dispatch(
      handleUploadResume({
        resume: resume,
        resumeTitle,
        jobTitle: jobTitle.map(({ value, ...r }) => value),
        // jobSkill: jobSkills.map(({ value, ...r }) => value),
        experience,
        token,
        signal: AbortControllerRef,
      })
    );
    if (response) {
      response.then((res) => {
        if (res?.payload?.success === true) {
          dispatch(handleGetResume({ token, signal: AbortControllerRef }));
          toast.success("Resume uploaded successfully.");
          reset();
          setResume(null);
          onClose();
        }
      });
    }
  };

  useEffect(() => {
    return () => abortApiCall();
  }, []);

  if (!visible) return null;

  // console.log(getValues());

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="fixed -top-4 inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-50"
    >
      <div className="bg-white md:w-1/2 w-[90%] rounded-2xl overflow-y-auto relative items-center justify-center xl:top-20 lg:top-8 top-20 mx-auto p-5 space-y-2">
        <AiOutlineClose onClick={onClose} className="cursor-pointer ml-auto" />
        <p className="text-primary_color text-xl font-semibold">
          Upload resume
        </p>
        <p className="text-[#7C8493] text-sm">
          {" "}
          Please upload your latest CV in either DOC, DOCX, or PDF format.
        </p>
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
        {/* <div className="text-left md:space-y-2">
          <label className="label_text" htmlFor="jobTitle">
            Job Skill
          </label>
          <Controller
            name="jobSkill"
            control={control}
            render={({
              field: { onChange, onBlur, value, name, ref },
              fieldState: { invalid, isTouched, isDirty, error },
              formState,
            }) => (
              <Select
                isMulti
                options={loading ? [] : jobSkills}
                className="basic-multi-select"
                name={name}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
          <span className="error">{errors?.jobTitle?.message}</span>
        </div> */}
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
            <div className="text-left md:space-y-2 w-full">
              <div className="xl:flex-row flex-col w-full flex xl:gap-4 gap-5 items-center justify-between">
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
              </div>
              {resume !== null && (
                <div className="text-left text-lg">{resume?.name}</div>
              )}
            </div>
          </div>
        </div>
        <button
          type="submit"
          disabled={resumeUploadLoading}
          className="blue_button mt-6"
        >
          {resumeUploadLoading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </form>
  );
};

export default ResumeModal;
