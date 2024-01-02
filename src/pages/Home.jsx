import React from "react";
import DreamJob from "../components/Home/DreamJob";
import WhoWeAre from "../components/Home/WhoWeAre";
import HowWeWork from "../components/Home/HowWeWork";
import PopularJobs from "../components/Home/PopularJobs";
import SubscribeOur from "../components/Home/SubscribeOur";
import Testimonial from "../components/Home/Testimonial";
import { Helmet } from "react-helmet";
import YoutubeVideo from "../components/Home/YoutubeVideo";

const Home = () => {
  return (
    <>
      <Helmet title="Football-Recruitment" />
      <div className="lg:space-y-24 space-y-8">
        <DreamJob />
        <WhoWeAre />
        <HowWeWork />
        <PopularJobs />
        <SubscribeOur />
        {/* <Testimonial /> */}
        <YoutubeVideo />
      </div>
    </>
  );
};

export default Home;
