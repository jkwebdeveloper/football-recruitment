import React, { useEffect } from "react";
import SideBar from "../components/Find_Job/SideBar";
import FoundJob from "../components/Find_Job/FoundJob";
import NewsLatter from "../components/NewsLatter";
import { Helmet } from "react-helmet";
import FindMyForm from "../components/Home/FindMyForm";
import { useDispatch, useSelector } from "react-redux";
import { handleFindJobByKeywords } from "../redux/JobSlice";

const FindJob = () => {
  const { findJobLoading, usersSearch, jobTitleKeyword, locationKeyword } =
    useSelector((s) => s.root.job);
  const { jobTitle, location } = usersSearch;

  const dispatch = useDispatch();

  const handleGetJob = () => {
    if (findJobLoading) return;
    if (jobTitle === "" && location === "") {
      dispatch(handleFindJobByKeywords({}));
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    handleGetJob();
  }, []);

  return (
    <>
      <Helmet title="Current-Vacancies | Football-Recruitment" />
      <div className="lg:space-y-5 space-y-0">
        {/* <Find_job_Banner /> */}
        <FindMyForm from="current_vacany" />
        <div className="flex md:flex-row flex-col gap-4 lg:px-5 px-2">
          <SideBar />
          <FoundJob />
        </div>
        <NewsLatter />
      </div>
    </>
  );
};

export default FindJob;
