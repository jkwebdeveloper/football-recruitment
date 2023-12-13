import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const LogOut = ({ visible, onClose }) => {
  if (!visible) return null;

  return (
    <div className="fixed -top-5 inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-50">
      <div className="bg-white md:w-2/5 w-[90%] rounded-2xl relative items-center justify-center xl:top-48 top-40 mx-auto p-5 space-y-4">
        <AiOutlineClose onClick={onClose} className="cursor-pointer ml-auto" />
        <div className="p-9 space-y-7">
          <p className="text-center">Are you sure you want to <br /> logout now?</p>
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              className="bg-[#F00] rounded-lg focus:outline-none cursor-pointer  text-white font-medium active:scale-90 transition text-sm md:px-10 px-5 md:py-3 py-2"
            >
              Logout
            </button>
            <button
              type="button"
              className="bg-[#BBB] rounded-lg focus:outline-none cursor-pointer  text-white font-medium active:scale-90 transition text-sm md:px-10 px-5 md:py-3 py-2"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogOut;
