import React, { useEffect, useState } from "react";
import ResumeModal from "./ResumeModal";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdFileDownload } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  handleDeleteResume,
  handleGetResume,
} from "../../redux/MyAccountSlice";
import useAbortApiCall from "../../hooks/useAbortCallApi";
import { AbortedDeferredError } from "react-router-dom";
import toast from "react-hot-toast";

const MyResume = () => {
  const [openModal, setOpenModal] = useState(false);

  const { resume, loading, resumeUploadLoading } = useSelector(
    (s) => s.root.myaccount
  );
  const { token } = useSelector((s) => s.root.auth);

  const dispatch = useDispatch();
  const { abortApiCall, AbortControllerRef } = useAbortApiCall();

  const handleDeletereusme = (id) => {
    if (resumeUploadLoading) return;
    console.log(resumeUploadLoading, "resume");
    toast.loading("Deleting...");
    setTimeout(() => {
      const response = dispatch(
        handleDeleteResume({ id, token, signal: AbortControllerRef })
      );
      if (response) {
        response.then((res) => {
          if (res?.payload?.success === true) {
            toast.remove();
            dispatch(handleGetResume({ token, signal: AbortedDeferredError }));
          }
        });
      } else {
        toast.remove();
      }
    }, 500);
  };

  useEffect(() => {
    return () => abortApiCall();
  }, []);

  const handleOnClose = () => {
    setOpenModal(false);
  };

  return (
    <div className="space-y-4 bg-white xl:p-5 p-2">
      {/* <p className="text-xl text-[#25324B] font-semibold">My Resume</p> */}
      {/* <div className="border border-[#D6DDEB] lg:space-y-3 space-y-4 p-2 lg:p-5">
        <div className="space-y-5 py-8">
          <img
            src={require("../../assets/chooseFlie.png")}
            alt=""
            className="mx-auto "
          />
          <div className="flex justify-center">
            <button
              type="button"
              className="blue_button"
              onClick={() => setOpenModal(true)}
            >
              Choose file
            </button>
          </div>
        </div>
      </div> */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="md:text-xl text-sm text-[#25324B] font-semibold">
            My Resume
          </p>
          <button
            type="button"
            className="blue_button"
            onClick={() => setOpenModal(true)}
          >
            Upload your CV
          </button>
        </div>
        {loading ? (
          <div className="text-center text-lg font-semibold">Loading...</div>
        ) : resume && resume.length > 0 ? (
          resume.map((res, index) => (
            <div
              key={index}
              className="border border-[#D6DDEB] lg:space-y-3 space-y-4 p-2 lg:p-3"
            >
              <div className="border border-[#D6DDEB] bg-white lg:space-y-3 space-y-4 p-2 lg:p-5">
                <div className="flex md:flex-row flex-col gap-3 justify-between items-center">
                  <div>
                    <p className="font-medium">{res?.resumeTitle}</p>
                    <p className="text-sm text-[#2C2C2C]">
                      Uploaded on{" "}
                      {new Date(res?.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center w-fit gap-3">
                    <a
                      href={`https://admin.footballrecruitment.eu${res?.resumePdf}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      // onClick={() => handleDownloadResume(res)}
                    >
                      <MdFileDownload className="text-primary_color text-xl cursor-pointer" />
                    </a>
                    <div
                      className="flex items-center w-fit gap-3 cursor-pointer"
                      onClick={() => handleDeletereusme(res?._id)}
                    >
                      <RiDeleteBin6Line className="text-primary_color text-lg" />
                      <p className="text-primary_color text-sm">
                        {/* {resumeUploadLoading ? "Deleting..." : "Delete Resume"} */}
                        Delete Resume
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No Resume here.</div>
        )}
      </div>
      {/* modal */}
      <ResumeModal onClose={handleOnClose} visible={openModal} />
    </div>
  );
};

export default MyResume;
