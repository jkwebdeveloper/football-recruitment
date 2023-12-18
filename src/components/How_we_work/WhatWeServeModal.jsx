import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const WhatWeServeModal = ({ visible, onClose, readmore }) => {
  if (!visible) return null;

  return (
    <div className="fixed -top-5 inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-50" onClick={onClose}>
      <div className="bg-white md:w-2/5 w-[90%] rounded-2xl relative items-center justify-center xl:top-28 top-24 overflow-y-auto mx-auto p-5 space-y-4">
        <AiOutlineClose onClick={onClose} className="cursor-pointer absolute right-5" />
        <div className="p-2 space-y-4">
          <p className="text-center font-bold text-xl">{readmore?.title}</p>
          <p className="text-justify">{readmore?.des}</p>
        </div>
      </div>
    </div>
  );
};

export default WhatWeServeModal;
