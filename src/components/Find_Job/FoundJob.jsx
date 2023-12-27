import moment from "moment";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoGrid, IoGridOutline, IoLocationOutline } from "react-icons/io5";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { MdOutlineViewAgenda, MdViewAgenda } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { handleFindJobByKeywords } from "../../redux/JobSlice";

const FoundJob = () => {
  const [view, setView] = useState("grid");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalJobs, setTotalJobs] = useState(0);
  const [totalJobCount, setTotalJobCount] = useState(0);

  const { jobs, findJobLoading } = useSelector((s) => s.root.job);

  const dispatch = useDispatch();

  const handleFindJob = (selectedPage) => {
    setCurrentPage(selectedPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const fetchJobs = async () => {
      const response = await dispatch(
        handleFindJobByKeywords({
          page: currentPage + 1,
          limit: 20,
        })
      );

      if (response.payload) {
        setTotalJobs(response.payload.totalPages);
        setTotalJobCount(response.payload.totalJobCount);
      }
    };

    fetchJobs();
  }, [currentPage, dispatch]);

  return (
    <div className="md:w-4/5 w-full mx-auto space-y-5">
      <div className="flex justify-between items-center">
        <div className="xl:text-2xl text-sm text-primary_color font-medium">
          {totalJobCount} JOBS FOUND
        </div>
        <div className="flex justify-between lg:gap-10 gap-3">
          <div className="flex items-center lg:gap-3 gap-0">
            <p className="lg:text-base text-sm">
              Sort by:{" "}
              <span className="text-primary_color"> Most relevant</span>{" "}
            </p>
            <IoIosArrowDown />
          </div>
          <div className="flex items-center lg:gap-7 gap-2">
            {view === "grid" ? (
              <IoGrid className="text-xl text-primary_color cursor-pointer" />
            ) : (
              <IoGridOutline
                className="text-xl text-primary_color cursor-pointer"
                onClick={() => setView("grid")}
              />
            )}
            {view === "list" ? (
              <MdViewAgenda className="text-2xl text-primary_color  cursor-pointer" />
            ) : (
              <MdOutlineViewAgenda
                className="text-2xl text-primary_color  cursor-pointer"
                onClick={() => setView("list")}
              />
            )}
          </div>
        </div>
      </div>
      {view === "grid" ? (
        <div className="rounded-lg grid grid-cols-1 gap-4 lg:grid-cols-3">
          {findJobLoading ? (
            <div className="text-center text-lg flex justify-center pt-14 items-center">
              Loading...
            </div>
          ) : (
            jobs.map((job, i) => {
              return (
                <Link
                  to={`/job-detail/${job?._id}`}
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  key={job?._id}
                >
                  <div className="border border-[#D6DDEB] xl:space-y-4 cursor-pointer h-60 space-y-4 p-3 xl:p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex xl:gap-4 gap-2 items-center justify-between">
                        <img
                          src={"https://admin.footballrecruitment.eu".concat(
                            job?.recruiter?.image
                          )}
                          alt=""
                          className="lg:w-12 lg:h-12 h-8 w-8 rounded-full"
                        />
                        <div className="block">
                          <p className="xl:text-base text-sm font-semibold">
                            {job.recruiter.recruiterName}
                          </p>
                          <p className="xl:text-sm text-xs text-[#999] font-normal">
                            {moment(job?.updatedAt).fromNow()}
                          </p>
                        </div>
                      </div>
                      {job.job_type === "Full time" ? (
                        <p className="bg-[#A8BCFF] hover:bg-blue_button/80 rounded-3xl lg:h-9 h-7 lg:leading-9 leading-7 focus:outline-none text-black font-normal text-xs px-4 whitespace-nowrap">
                          {job?.job_type}
                        </p>
                      ) : (
                        <p className="bg-[#A1F8FF] hover:bg-blue_button/80 rounded-3xl lg:h-9 h-7 lg:leading-9 leading-7 focus:outline-none text-black font-normal text-xs px-4 whitespace-nowrap">
                          {job?.job_type}
                        </p>
                      )}
                    </div>
                    <p className="xl:text-xl text-base font-medium text-[#333] w-4/5">
                      {job.title}
                    </p>
                    <p className="text-sm line-clamp-2 text-[#787878]">
                      {job.short_description}
                    </p>
                    <div className="flex gap-3 items-center">
                      <IoLocationOutline className="text-lg text-[#004D7F]" />
                      <p className="text-sm">
                        {job?.city}, {job?.country}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      ) : (
        <div className="lg:space-y-4 space-y-3">
          {findJobLoading ? (
            <div className="text-center text-lg flex justify-center pt-14 items-center">
              Loading...
            </div>
          ) : jobs.length > 0 ? (
            jobs.map((job, i) => {
              return (
                <div
                  key={job._id}
                  className="border border-[#D6DDEB] lg:space-y-3 space-y-4 p-3 lg:p-5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex xl:gap-4 gap-2 items-center justify-between">
                      <img
                        src={"https://admin.footballrecruitment.eu".concat(
                          job?.recruiter?.image
                        )}
                        alt=""
                        className="lg:w-12 lg:h-12 h-8 w-8 rounded-full"
                      />
                      <div className="block">
                        <p className="lg:text-base text-sm font-semibold">
                          {job?.recruiter?.recruiterName}
                        </p>
                        <p className="lg:text-sm text-xs text-[#999] font-normal">
                          {/* 22 Nov, 2023 */}
                          {new Date(job?.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Link
                      to={`/job-detail/${job?._id}`}
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      <button type="button" className="blue_button">
                        View
                      </button>
                    </Link>
                  </div>
                  <p className="xl:text-xl text-base font-medium text-[#333] w-4/5">
                    {job.title}
                  </p>
                  <p className="text-sm text-[#787878]">
                    {job.short_description}
                  </p>
                  <div className="flex gap-3 items-center">
                    <IoLocationOutline className="text-lg text-[#004D7F]" />
                    <p className="text-sm">
                      {job?.city}, {job?.country}
                    </p>
                    {job.job_type === "Full time" ? (
                      <p className="bg-[#A8BCFF] hover:bg-blue_button/80 rounded-3xl lg:h-9 h-7 lg:leading-9 leading-7 focus:outline-none text-black font-normal text-xs px-4 whitespace-nowrap">
                        {job?.job_type}
                      </p>
                    ) : (
                      <p className="bg-[#A1F8FF] hover:bg-blue_button/80 rounded-3xl lg:h-9 h-7 lg:leading-9 leading-7 focus:outline-none text-black font-normal text-xs px-4 whitespace-nowrap">
                        {job?.job_type}
                      </p>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex justify-center items-center pt-14">
              No data
            </div>
          )}
        </div>
      )}
      <div className="flex xl:flex-row flex-col items-center w-full gap-3 ">
        <div className="xl:w-[80%] w-full flex md:flex-row flex-col gap-3 items-center justify-between">
          {/* pagination */}
          <ReactPaginate
            initialPage={currentPage}
            onPageChange={(selected) => handleFindJob(selected.selected)}
            previousLabel={
              <p className="bg-gray-200 w-10 h-10 p-2 rounded-md">
                <BsChevronLeft className="h-5 w-5 rounded-md text-black" />
              </p>
            }
            nextLabel={
              <p className="bg-gray-200 w-10 h-10 p-2 rounded-md">
                <BsChevronRight className="h-5 w-5 rounded-md text-black" />
              </p>
            }
            pageClassName="bg-gray-200 text-black px-2 py-2 rounded-md text-center  hover:bg-primary_color hover:text-white"
            pageLinkClassName="p-2"
            breakLabel="..."
            breakClassName=""
            breakLinkClassName=""
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            pageCount={totalJobs}
            containerClassName=""
            activeClassName="active"
            className="flex items-center md:gap-3 gap-2 flex-wrap"
          />
        </div>
      </div>
    </div>
  );
};

export default FoundJob;
