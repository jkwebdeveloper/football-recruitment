import React, { useState } from "react";
import { useSelector } from "react-redux";

const JobDescription = () => {
  const { singleJob } = useSelector((s) => s.root.job);

  return (
    <div className="md:w-4/5 w-[90%] mx-auto bg-white p-3 space-y-6">
      <div className="space-y-3">
        <div>
          <p
            className="text-sm text-justify text-[#515B6F]"
            dangerouslySetInnerHTML={{ __html: singleJob?.description }}
          />
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
