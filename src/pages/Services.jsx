import React from "react";
import { Helmet } from "react-helmet";
import CommonBanner from "../components/CommonBanner";
import NewsLatter from "../components/NewsLatter";
import HeroSection from "../components/services/HeroSection";

const Services = () => {
  return (
    <>
      <Helmet title="Services | Football-Recruitment" />
      <div className="lg:space-y-8 space-y-8">
        <CommonBanner title="Services" />
        <HeroSection/>
        <NewsLatter />
      </div>
    </>
  );
};

export default Services;
