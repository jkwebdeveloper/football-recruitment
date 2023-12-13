import React from "react";
import CommonBanner from "../components/CommonBanner";
import MainTitle from "../components/How_we_work/MainTitle";
import WhatWeServe from "../components/How_we_work/WhatWeServe";
import NewsLatter from "../components/NewsLatter";
import { Helmet } from "react-helmet";

const HowWeWork = () => {
  return (
    <>
    <Helmet title="How We Work | Football-Recruitment"/>
      <div className="lg:space-y-12 space-y-8">
        <CommonBanner title="How we work" />
        <MainTitle />
        <WhatWeServe />
        <NewsLatter />
      </div>
    </>
  );
};

export default HowWeWork;
