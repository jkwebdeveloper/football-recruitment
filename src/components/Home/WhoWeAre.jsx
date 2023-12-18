import React from "react";
import { Link } from "react-router-dom";

const WhoWeAre = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2  justify-center gap-7 xl:gap-0  lg:px-20 px-8 ">
      <div className="flex justify-center">
        <div className="bg-[#D6EFFF]  w-[200px] h-[255px] lg:w-[342px] -rotate-12 lg:h-[455px] rounded-3xl">
          <img
            src={require("../../assets/who-we.png")}
            alt=""
            className=" lg:w-[342px]  lg:h-[455px] rotate-12  w-[200px] h-[255px] "
          />
        </div>
      </div>
      <div className="space-y-5">
        <h1 className="lg:text-[40px] text-lg font-bold">
          Who <span className="title_blue">we are</span>{" "}
        </h1>
        <p className="text-[#656567]  text-justify  xl:text-base text-sm">
          <span className="font-semibold">Football Recruitment:</span> Elevating
          Excellence in the Football Industry Workforce. Football Recruitment
          emerges as a pioneering global entity, exclusively dedicated to the
          meticulous recruitment of top-tier personnel within the realm of
          football.
        </p>
        <p className="text-[#656567]  text-justify xl:text-base text-sm">
          Our distinguished focus extends to the executive echelons,
          encompassing Sporting Directors, CEOs, CMOs, CFOs, CTOs, and a
          spectrum of different operational roles, fortifying the foundation of
          football organizations worldwide.
        </p>
        <p className="text-[#656567]  text-justify xl:text-base text-sm">
          Distinguished by an expansive international reach, Football
          Recruitment boasts an extensive candidate network, spanning across
          three continents, and maintains strategic offices in prominent hubs
          such as London, Rome, and New York. Our mission is to empower clients
          with a seamless avenue to procure talent across a myriad of
          football-related domains, including Sporting Directors, Recruitment
          Personnel, Scouting and Coaching Professionals, Sports Doctors, and an
          array of Medical Specialists.
        </p>
        <div className="space-y-4">
          <Link
            to="/who-we-are"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <button type="button" className="blue_button px-5">
              More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;
