import React from "react";
import { MdPlayArrow } from "react-icons/md";

const data = [
  {
    id: 1,
    title: "C-Level",
  },
  {
    id: 2,
    title: "Management",
  },
  {
    id: 3,
    title: "Board Executive",
  },
  {
    id: 4,
    title: "Marketing and Commercial",
  },
  {
    id: 5,
    title: "Operation and Finance",
  },
];

const dataOther = [
  {
    id: 6,
    title: "Technology and Digital",
  },
  {
    id: 7,
    title: "Human Resources Recruitment and Diversity",
  },
  {
    id: 8,
    title: "Scouting and Coaching",
  },
  {
    id: 9,
    title: "Reporting and Analytics",
  },
  {
    id: 10,
    title: "Medicine and Physiotherapy",
  },
];

const HeroSection = () => {
  return (
    <div className="container">
      <div className="grid md:grid-cols-2 grid-cols-1 lg:px-10 space-y-1 items-center justify-center">
        <div className="flex md:justify-center px-2">
          <div className="space-y-1">
            {data.map((item) => {
              return (
                <div key={item.id} className="flex md:gap-4 gap-2 items-center">
                  <MdPlayArrow className="md:text-2xl  text-primary_color" />
                  <p>{item.title}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex md:justify-center px-2">
          <div className="space-y-1">
            {dataOther.map((item) => {
              return (
                <div key={item.id} className="flex md:gap-4 gap-2 items-center">
                  <MdPlayArrow className="md:text-2xl  text-primary_color" />
                  <p className="">{item.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
