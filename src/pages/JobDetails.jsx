import React, { useEffect, useState } from "react";
import JobDetailBanner from "../components/Job_Details/JobDetailBanner";
import JobDescription from "../components/Job_Details/JobDescription";
import JobSidebar from "../components/Job_Details/JobSidebar";
import SimilarJob from "../components/Job_Details/SimilarJob";
import NewsLatter from "../components/NewsLatter";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleFindJobById } from "../redux/JobSlice";
import { handleGetResume } from "../redux/MyAccountSlice";
import useAbortApiCall from "../hooks/useAbortCallApi";

const JobDetails = () => {
  const { findSingleJobLoading } = useSelector((s) => s.root.job);
  const { token, user } = useSelector((s) => s.root.auth);

  const { id } = useParams();

  const dispatch = useDispatch();

  const { AbortControllerRef } = useAbortApiCall();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (user !== null) {
      dispatch(handleGetResume({ token, signal: AbortControllerRef }));
    }
    dispatch(handleFindJobById({ id }));
  }, []);

  return (
    <>
      <Helmet title="Job-Details | Football-Recruitment" />
      {findSingleJobLoading ? (
        <div className="h-screen w-screen flex items-center justify-center font-semibold text-2xl">
          Finding Job...
        </div>
      ) : (
        <div className="lg:space-y-14 space-y-5 bg-[#F5F6FA]">
          <JobDetailBanner />
          <div className="flex md:flex-row flex-col gap-4 lg:px-5 px-2">
            <JobDescription />
            <JobSidebar />
          </div>
          <SimilarJob />
          <NewsLatter />
        </div>
      )}
    </>
  );
};

export default JobDetails;
