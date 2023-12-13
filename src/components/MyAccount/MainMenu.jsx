import React, { useState } from "react";
import { VscAccount } from "react-icons/vsc";
import { MdOutlineBusinessCenter, MdLockOutline } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import LogOut from "./LogOut";
import { useDispatch } from "react-redux";
import { handleLogout } from "../../redux/AuthSlice";

const MainMenu = ({ onTabChange, tabMenu }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleOnClose = () => setOpenModal(false);
  // console.log(tabMenu);

  const dispatch = useDispatch();
  return (
    <div className="md:w-[40%] lg:w-[25%] w-[90%] mx-auto space-y-5">
      <div className="space-y-2 bg-white xl:py-5 py-3 xl:px-4 px-2">
        <p className="text-xl text-[#25324B] font-semibold job_details heading">
          Main menu
        </p>
        {tabMenu === "Manage Acoount" ? (
          <div className="bg-[#DFF5FF]  text-primary_color xl:px-4 px-2 cursor-pointer xl:py-3 py-1">
            <div
              className="flex gap-4 items-center "
              onClick={() => onTabChange("Manage Acoount")}
            >
              <VscAccount className="text-xl" />
              <p className="text-[15px] text-primary_color">Manage Account</p>
            </div>
          </div>
        ) : (
          <div className="hover:bg-[#DFF5FF] hover:text-primary_color xl:px-4 px-2 cursor-pointer xl:py-3 py-1">
            <div
              className="flex gap-4 items-center "
              onClick={() => onTabChange("Manage Acoount")}
            >
              <VscAccount className="text-xl" />
              <p className="text-[15px] text-black hover:text-primary_color">
                Manage Account
              </p>
            </div>
          </div>
        )}
        {tabMenu === "Applied Job" ? (
          <div className=" bg-[#DFF5FF] text-primary_color  xl:px-4 px-2 cursor-pointer xl:py-3 py-1">
            <div
              className="flex gap-3 items-center "
              onClick={() => onTabChange("Applied Job")}
            >
              <MdOutlineBusinessCenter className="text-xl" />
              <p className="text-[15px] text-primary_color hover:text-primary_color">
                Applied Job
              </p>
            </div>
          </div>
        ) : (
          <div className="hover:bg-[#DFF5FF] hover:text-primary_color xl:px-4 px-2 cursor-pointer xl:py-3 py-1">
            <div
              className="flex gap-3 items-center "
              onClick={() => onTabChange("Applied Job")}
            >
              <MdOutlineBusinessCenter className="text-xl" />
              <p className="text-[15px] text-black hover:text-primary_color">
                Applied Job
              </p>
            </div>
          </div>
        )}
        {tabMenu === "My Resume" ? (
          <div className=" bg-[#DFF5FF] text-primary_color  xl:px-4 px-2 cursor-pointer xl:py-3 py-1">
            <div
              className="flex gap-3 items-center "
              onClick={() => onTabChange("My Resume")}
            >
              <IoDocumentTextOutline className="text-xl" />
              <p className="text-[15px] text-primary_color hover:text-primary_color">
                My Resume
              </p>
            </div>
          </div>
        ) : (
          <div className=" hover:bg-[#DFF5FF] hover:text-primary_color  xl:px-4 px-2 cursor-pointer xl:py-3 py-1">
            <div
              className="flex gap-3 items-center "
              onClick={() => onTabChange("My Resume")}
            >
              <IoDocumentTextOutline className="text-xl" />
              <p className="text-[15px] text-black hover:text-primary_color">
                My Resume
              </p>
            </div>
          </div>
        )}
        {tabMenu === "Change Password" ? (
          <div className=" bg-[#DFF5FF] text-primary_color  xl:px-4 px-2 cursor-pointer xl:py-3 py-1">
            <div
              className="flex gap-3 items-center "
              onClick={() => onTabChange("Change Password")}
            >
              <MdLockOutline className="text-xl" />
              <p className="text-[15px] text-primary_color hover:text-primary_color">
                Change Password
              </p>
            </div>
          </div>
        ) : (
          <div className=" hover:bg-[#DFF5FF] hover:text-primary_color  xl:px-4 px-2 cursor-pointer xl:py-3 py-1">
            <div
              className="flex gap-3 items-center "
              onClick={() => onTabChange("Change Password")}
            >
              <MdLockOutline className="text-xl" />
              <p className="text-[15px] text-black hover:text-primary_color">
                Change Password
              </p>
            </div>
          </div>
        )}

        <div
          className="xl:px-4 px-2 cursor-pointer xl:py-3 py-1"
          // onClick={() => setOpenModal(true)}
        >
          <div
            className="flex gap-3 items-center "
            onClick={() => dispatch(handleLogout())}
          >
            <FiLogOut className="text-xl text-[#F10000]" />
            <p className="text-[15px] text-[#F10000] ">Logout</p>
          </div>
        </div>
      </div>
      <LogOut onClose={handleOnClose} visible={openModal} />
    </div>
  );
};

export default MainMenu;
