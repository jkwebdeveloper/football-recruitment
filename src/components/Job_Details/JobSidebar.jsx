import React from "react";
import date from "../../assets/job.svg";
import { useSelector } from "react-redux";

const JobSidebar = () => {
  const { singleJob } = useSelector((s) => s.root.job);

  return (
    <div className="md:w-[40%] lg:w-[25%] w-[90%] mx-auto space-y-5">
      <div className="space-y-3 bg-white p-3">
        <p className="text-xl text-[#25324B] font-semibold job_details heading">
          Description
        </p>
        <div className="flex gap-3 items-center">
          <div className="bg-[#ebedf5] p-3">
            <img src={date} alt="" />
          </div>
          <div className="">
            <p className="text-base font-medium">Date posted</p>
            <p className="text-sm text-[#7D7D7D]">
              {" "}
              {new Date(singleJob?.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <hr />

        <div className="flex gap-3 items-center">
          <div className="bg-[#ebedf5] p-3">
            <img src={date} alt="" />
          </div>
          <div className="">
            <p className="text-base font-medium">Category</p>
            <p className="text-sm text-[#7D7D7D]">{singleJob?.category.name}</p>
          </div>
        </div>
        <hr />

        <div className="flex gap-3 items-center">
          <div className="bg-[#ebedf5] p-3">
            <img src={date} alt="" />
          </div>
          <div className="">
            <p className="text-base font-medium">Salary</p>
            <p className="text-sm text-[#7D7D7D]">
              Upto to ${singleJob?.salary}
            </p>
          </div>
        </div>
        <hr />
        <div className="flex gap-3 items-center">
          <div className="bg-[#ebedf5] p-3">
            <img src={date} alt="" />
          </div>
          <div className="">
            <p className="text-base font-medium">Experience</p>
            <p className="text-sm text-[#7D7D7D]">{singleJob?.experience}</p>
          </div>
        </div>
        <hr />
        <div className="flex gap-3 items-center">
          <div className="bg-[#ebedf5] p-3">
            <img src={date} alt="" />
          </div>
          <div className="">
            <p className="text-base font-medium">Employment type</p>
            <p className="text-sm text-[#7D7D7D]">{singleJob?.job_type}</p>
          </div>
        </div>
      </div>
      <div className="space-y-3 bg-white p-3">
        <p className="text-xl text-[#25324B] font-semibold job_details heading">
          Company Info
        </p>
        <div className="flex gap-3 items-center">
          <div className="bg-[#ebedf5] p-3">
            <img src={date} alt="" />
          </div>
          <div className="">
            <p className="text-base font-medium">Name</p>
            <p className="text-sm text-[#7D7D7D]">
              {singleJob?.recruiter?.companyName}
            </p>
          </div>
        </div>
        <hr />

        <div className="flex gap-3 items-center">
          <div className="bg-[#ebedf5] p-3">
            <img src={date} alt="" />
          </div>
          <div className="">
            <p className="text-base font-medium">Email</p>
            <p className="text-sm text-[#7D7D7D]">
              {singleJob?.recruiter?.email}
            </p>
          </div>
        </div>
        <hr />

        <div className="flex gap-3 items-center">
          <div className="bg-[#ebedf5] p-3">
            <img src={date} alt="" />
          </div>
          <div className="">
            <p className="text-base font-medium">Location</p>
            <p className="text-sm text-[#7D7D7D]">
              {singleJob?.recruiter?.location}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSidebar;
