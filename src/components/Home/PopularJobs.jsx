import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import groovyWalkAnimation from "../../assets/loadingBar.json";
import moment from "moment";

const PopularJobs = () => {
  const [loading, setLoading] = useState(false);
  const [popularJob, setPopularJob] = useState([]);

  const handleGetJob = () => {
    setLoading(true);
    axios
      .get("https://admin.footballrecruitment.eu/api/all/jobs", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setPopularJob(res.data.data);
        setLoading(false);
        // console.log(res.data.data);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  useEffect(() => {
    handleGetJob();
  }, []);

  return (
    <div className="space-y-7">
      <div className="space-y-5">
        <h1 className="lg:text-[32px] title_blue text-center text-lg font-bold">
          Popular jobs <span className="text-black"> for you</span>{" "}
        </h1>
      </div>
      {loading ? (
        <div className="flex justify-center mx-auto w-40">
          <Lottie
            animationData={groovyWalkAnimation}
            loop={true}
            className="flex justify-center mx-auto"
          />
        </div>
      ) : popularJob.length > 0 ? (
        <div className="rounded-lg grid grid-cols-1 lg:grid-cols-3 lg:px-10 px-3 gap-5">
          <>
            {popularJob.map((job, i) => {
              return (
                <div
                  key={job._id}
                  className="shadow-[0px_0px_15px_0px_rgba(75,110,14,0.1)] lg:space-y-6 space-y-4 p-3 lg:p-5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex xl:gap-4 gap-2 items-center justify-between">
                      <div className="bg-[#004D7F] text-white text-sm lg:w-11 lg:h-11 h-7 w-7 rounded-full flex justify-center items-center">
                        {job?.title.split(" ")[0]?.substring(0, 2)}
                      </div>
                      <div className="block">
                        <p className="lg:text-base text-sm font-semibold">
                          {job.recruiter.recruiterName}
                        </p>
                        <p className="lg:text-sm text-xs text-[#999] font-normal">
                          {moment(job?.updatedAt).fromNow()}
                        </p>
                      </div>
                    </div>
                    <p className="bg-[#A8BCFF] hover:bg-blue_button/80 rounded-3xl lg:h-9 h-7 lg:leading-9 leading-7 focus:outline-none text-black font-normal text-xs px-4 whitespace-nowrap">
                      {job?.job_type}
                    </p>
                  </div>
                  <p className="xl:text-2xl text-base font-medium text-[#333] w-4/5">
                    {job.title}
                  </p>
                  <div className="flex gap-3 items-center">
                    <IoLocationOutline className="text-lg text-[#004D7F]" />
                    <p className="text-sm">
                      {job.city} {job.state}
                    </p>
                  </div>
                </div>
              );
            })}
          </>
        </div>
      ) : (
        <div className="justify-center flex  pt-14">No data</div>
      )}

      <div className="space-y-4">
        <Link
          to="/current-vacancies"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <button
            type="button"
            className="flex justify-center px-4 items-center blue_button text-sm mx-auto hover:bg-blue_button/80 active:scale-90 transition"
          >
            Find job
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PopularJobs;
