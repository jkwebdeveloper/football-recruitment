import React from "react";

const OurVision = () => {
  return (
    <>
      <div className="grid md:grid-cols-1 lg:grid-cols-2 justify-center items-center ">
        <div className="bg-[#FAFAFA] items-center flex justify-center h-80">
          <p className="text-4xl font-semibold">Our vision</p>
        </div>
        <div className="bg-[#F5F5F5] p-7 items-center flex justify-center h-80">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s. When an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only.
          </p>
        </div>
      </div>
      <img
        src={require("../../assets/Rectangle 67.png")}
        alt=""
        className="space-y-0"
      />
      <div className="grid md:grid-cols-1 lg:grid-cols-2 justify-center items-center ">
        <div className="bg-[#FAFAFA] items-center flex justify-center h-80">
          <p className="text-4xl font-semibold">Our vision</p>
        </div>
        <div className="bg-[#F5F5F5] p-7 items-center flex justify-center h-80">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s. When an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only.
          </p>
        </div>
      </div>
    </>
  );
};

export default OurVision;
