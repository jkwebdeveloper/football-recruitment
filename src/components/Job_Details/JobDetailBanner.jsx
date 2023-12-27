import React, { useState } from "react";
import { IoBagHandle } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdLocationOn } from "react-icons/md";
import banner from "../../assets/banner.png";
import Header from "../Header";
import JobApplyModal from "./JobApplyModal";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const JobDetailBanner = () => {
  const [openModal, setOpenModal] = useState(false);

  const { singleJob } = useSelector((s) => s.root.job);
  const { user } = useSelector((s) => s.root.auth);

  const navigate = useNavigate();

  const handleOnClose = () => setOpenModal(false);

  const handleOpenModal = () => {
    if (user === null) {
      return navigate("/sign-in");
    }
    setOpenModal(true);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${banner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="relative"
    >
      <Header />
      <div className="flex justify-center items-center xl:min-h-[60vh] min-h-[80vh] w-full">
        <div className="flex items-center  flex-col gap-y-4 lg:px-10 px-2 lg:w-[80%] xl:w-full w-11/12">
          <div className="bg-white gap-2 flex-col lg:flex-row lg:w-full  w-full px-3 py-4">
            <div className="flex-col flex lg:flex-row space-y-5 lg:space-y-0 justify-between">
              <div className="flex lg:flex-row items-center gap-4">
                <img
                  src={"https://admin.footballrecruitment.eu".concat(
                    singleJob?.recruiter?.image
                  )}
                  alt=""
                  className="lg:w-12 lg:h-12 h-8 w-8 rounded-full"
                />
                <div className="md:space-y-1">
                  <p className="xl:text-3xl md:text-base text-sm font-semibold text-primary_color">
                    {singleJob?.title}
                  </p>
                  <div className="flex-col flex md:flex-row md:gap-4 gap-2">
                    <div className="flex gap-2 items-center">
                      <IoBagHandle className="xl:text-xl md:text-base text-sm text-primary_color" />
                      <p className="xl:text-base text-sm">
                        {singleJob?.recruiter.recruiterName}
                      </p>
                    </div>
                    <div className="flex gap-2 items-center ">
                      <MdLocationOn className="xl:text-xl text-base text-primary_color" />
                      <p className="xl:text-base text-sm">
                        {singleJob?.city} {singleJob?.state}
                      </p>
                    </div>
                    <div className="flex gap-2 items-center">
                      <FaCalendarAlt className="xl:text-xl text-base text-primary_color" />
                      <p className="xl:text-base text-sm">
                        {new Date(singleJob?.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="bg-[#004D7F] flex justify-center items-center gap-3 text-white font-medium rounded-lg active:scale-90 transition text-sm py-5 md:py-1 px-2 lg:px-4"
                onClick={() => handleOpenModal()}
              >
                Apply Job Now
                <FaArrowRightLong />
              </button>
            </div>
          </div>
        </div>
      </div>
      <JobApplyModal onClose={handleOnClose} visible={openModal} />
      {/* <div className="flex absolute -bottom-5  w-full">
        <img
          src={require("../../assets/Vector.png")}
          alt=""
          className="h-12 w-auto flex-1 "
        />
        <img
          src={require("../../assets/Vector.png")}
          alt=""
          className="h-12 w-auto flex-1 "
        />
        <img
          src={require("../../assets/Vector.png")}
          alt=""
          className="h-12 w-auto flex-1 "
        />
        <img
          src={require("../../assets/Vector.png")}
          alt=""
          className="h-12 w-auto flex-1 "
        />
        <img
          src={require("../../assets/Vector.png")}
          alt=""
          className="h-12 w-auto flex-1 "
        />
        <img
          src={require("../../assets/Vector.png")}
          alt=""
          className="h-12 w-auto flex-1 "
        />
        <img
          src={require("../../assets/Vector.png")}
          alt=""
          className="h-12 w-auto flex-1 "
        />
      </div> */}
    </div>
  );
};

export default JobDetailBanner;
