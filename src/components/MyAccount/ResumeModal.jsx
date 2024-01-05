import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import useAbortApiCall from "../../hooks/useAbortCallApi";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  handleGetResume,
  handleUploadResume,
} from "../../redux/MyAccountSlice";
import * as yup from "yup";
import toast from "react-hot-toast";

const ResumeModal = ({ visible, onClose }) => {
  const [resume, setResume] = useState(null);

  const { token } = useSelector((state) => state.root.auth);
  const { resumeUploadLoading } = useSelector((state) => state.root.myaccount);

  const dispatch = useDispatch();

  const { AbortControllerRef, abortApiCall } = useAbortApiCall();

  const resumeSchema = yup.object({
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
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              )
          );
        }
      ),
  });

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    shouldFocusError: true,
    resolver: yupResolver(resumeSchema),
    defaultValues: {
      resumeTitle: "",
      resume: null,
    },
  });

  const onSubmit = (data) => {
    if (resumeUploadLoading) return;
    const { resumeTitle } = data;
    const response = dispatch(
      handleUploadResume({
        resume: resume,
        resumeTitle,
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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="fixed -top-4 inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-50"
    >
      <div className="bg-white md:w-1/2 w-[90%] rounded-2xl relative items-center justify-center xl:top-28 top-20 mx-auto p-5 space-y-4">
        <AiOutlineClose onClick={onClose} className="cursor-pointer ml-auto" />
        <p className="text-primary_color text-xl font-semibold">
          Upload resume
        </p>
        <p className="text-[#7C8493] text-sm"> Please upload your latest CV in either DOC, DOCX, or PDF format.</p>
        <div className="text-left md:space-y-2">
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
        <div className="text-left md:space-y-2">
          {/* <label className="label_text" htmlFor="email">
            Resume Title
          </label> */}
          <div className="xl:flex-row flex-col flex xl:gap-4 gap-5 items-center justify-between">
            {/* <div className="xl:w-[70%] w-full">
              <input
                className="input_field modal"
                id="username"
                type="text"
                placeholder="title"
              />
            </div> */}
            <div className="">
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
          </div>
          {resume !== null && (
            <div className="text-left text-lg">{resume?.name}</div>
          )}
        </div>
        {/* <div className="flex justify-between">
            <label className="label_text" htmlFor="email">
              Attach your resume
            </label>
          <div className="text-left flex md:space-y-2">
            <input
              className="input_field"
              id="username"
              type="text"
              placeholder="title"
            />
          </div>
            <div className=" md:space-y-2">
              <input type="file" id="actual-btn" hidden className="mx-auto" />
              <label
                for="actual-btn"
                className="blue_button cursor-pointer space-x-6 mx-auto"
              >
                Choose File
              </label>
            </div>
        </div> */}

        <button
          type="submit"
          disabled={resumeUploadLoading}
          className="blue_button"
        >
          {resumeUploadLoading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </form>
  );
};

export default ResumeModal;
