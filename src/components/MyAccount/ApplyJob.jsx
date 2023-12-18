import moment from "moment";
import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ApplyJob = () => {
  const { appliedJobs, appliedjobLoading } = useSelector((s) => s.root.job);

  return (
    <div className="space-y-4 bg-white xl:p-5 p-2">
      <p className="text-xl text-[#25324B] font-semibold">Jobs Applied</p>
      {appliedjobLoading ? (
        <div className="text-center font-semibold w-full">Loading...</div>
      ) : appliedJobs?.length === 0 && !appliedjobLoading ? (
        <div className="w-full font-semibold text-2xl">
          Apply your first job.
        </div>
      ) : (
        appliedJobs?.map((job) => (
          <Link
            to={`/job-detail/${job?.job_id?._id}`}
            key={job?._id}
            className="w-full py-2"
          >
            <div className="border border-[#D6DDEB] lg:space-y-3 space-y-4 p-2 my-2 lg:p-5">
              <div className="flex items-center justify-between">
                <div className="flex xl:gap-4 gap-2 items-center justify-between">
                  <div className="bg-[#004D7F] text-white text-sm lg:w-11 lg:h-11 h-7 w-7 rounded-full flex justify-center items-center">
                    {job?.job_id?.title
                      ?.split(" ")
                      .map(function (item) {
                        return item[0];
                      })
                      .join("")}
                  </div>
                  <div className="block">
                    <p className="lg:text-base text-sm font-semibold">
                      {job?.job_id?.recruiter?.recruiterName}
                    </p>
                    <p className="lg:text-sm text-xs text-[#999] font-normal">
                      {moment(job?.job_id?.createdAt).format("lll")}
                    </p>
                  </div>
                </div>
                <p className="text-sm">
                  Applied : {moment(job?.upadateAt).format("lll")}
                </p>
              </div>
              <p className="xl:text-xl text-base font-medium text-[#333] w-4/5">
                {job?.job_id?.title}
              </p>
              <p className="text-sm text-[#787878]">
                {job?.job_id?.short_description}
              </p>
              <div className="flex gap-3 items-center">
                <IoLocationOutline className="text-lg text-[#004D7F]" />
                <p className="text-sm">
                  {job?.job_id?.city}, {job?.job_id?.country}
                </p>
                {/* <p className="bg-[#A8BCFF] hover:bg-blue_button/80 rounded-3xl lg:h-9 h-7 lg:leading-9 leading-7 focus:outline-none text-black font-normal text-xs px-4 whitespace-nowrap">
                  {job?.job_id?.job_type}
                </p> */}
                {job?.job_id?.job_type === "Full time" ? (
                  <p className="bg-[#A8BCFF] hover:bg-blue_button/80 rounded-3xl lg:h-9 h-7 lg:leading-9 leading-7 focus:outline-none text-black font-normal text-xs px-4 whitespace-nowrap">
                    {job?.job_id?.job_type}
                  </p>
                ) : (
                  <p className="bg-[#A1F8FF] hover:bg-blue_button/80 rounded-3xl lg:h-9 h-7 lg:leading-9 leading-7 focus:outline-none text-black font-normal text-xs px-4 whitespace-nowrap">
                    {job?.job_id?.job_type}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default ApplyJob;
