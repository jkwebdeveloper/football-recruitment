import React, { useEffect, useState } from "react";
import Logo from "../../assets/Logo-color.svg";
import axios from "axios";

const Description = () => {
  const [description, setDescription] = useState({});
  const [loading, setLoading] = useState(true);

  const handleGetdescription = () => {
    axios
      .get("https://admin.footballrecruitment.eu/api/whoWeAre", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setDescription(res?.data?.page);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  useEffect(() => {
    handleGetdescription();
  }, []);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2  justify-center gap-7 xl:gap-0  lg:px-20 px-8 ">
      <div className="flex justify-center">
        <img
          src={Logo}
          // src={"https://admin.footballrecruitment.eu".concat(
          //     description?.page?.image
          //   )}
          alt=""
          className="text-center lg:w-[342px]  lg:h-[455px]"
        />
      </div>
      <div className="space-y-5">
        <h1 className="lg:text-[40px] text-lg font-bold">
          Football <span className="title_blue">Recruitment</span>{" "}
        </h1>
        <p
          className="text-[#656567] text-justify xl:text-base text-sm"
          dangerouslySetInnerHTML={{ __html: description.content }}
        />
      </div>
    </div>
  );
};

export default Description;
