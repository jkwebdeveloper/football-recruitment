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
        setDescription(res.data.page);
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
        {/* <div className="bg-[#D6EFFF] relative w-[200px] h-[255px] lg:w-[342px] -rotate-12 lg:h-[455px] rounded-3xl">
          <img
            src={require("../../assets/who-we.png")}
            alt=""
            className=" lg:w-[342px] absolute lg:h-[455px] rotate-12  w-[200px] h-[255px] "
          />
        </div> */}
        <img
          src={Logo}
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
        {/* "<span className="font-semibold">Football Recruitment:</span>{" "}
          Elevating Elevating Excellence in the Football Industry Workforce.
        </p>
        <p className="text-[#656567] xl:text-left text-justify xl:text-base text-sm">
          Meet Football Recruitment, a global pioneer dedicated to recruiting
          top-tier talent in football. We focus on executive roles like Sporting
          Directors, Coaches and Back Office Staff and CEOs, COOs, CTOs, CFOs
          and many more, strengthening football organizations worldwide.
        </p>
        <p className="text-[#656567] xl:text-left text-justify xl:text-base text-sm">
          Our reach spans three continents with offices in London, Rome, and New
          York. We connect clients with talent in various football domains.
        </p>
        <p className="text-[#656567] xl:text-left text-justify xl:text-base text-sm">
          Founded by brothers Gennaro and Giuseppe Capasso, boasting 35 years of
          expertise in Executive Search in the Automotive and Information
          Technology sectors, we've built a stellar reputation and a global
          clientele.
        </p>
        <p className="text-[#656567] xl:text-left text-justify xl:text-base text-sm">
          At Football Recruitment, we're your strategic ally in navigating the
          complexities of the football industry. Our specialists understand the
          nuances of this dynamic field, ensuring excellence is not just a goal
          but our commitment to the world of football."
        </p> */}
      </div>
    </div>
  );
};

export default Description;
