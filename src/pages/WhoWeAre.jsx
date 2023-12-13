import React from "react";
import CommonBanner from "../components/CommonBanner";
import Description from "../components/Who_we_are/Description";
import NewsLatter from "../components/NewsLatter";
import { Helmet } from "react-helmet";

const WhoWeAre = () => {
  return (
    <>
    <Helmet title="Who-We-Are | Football-Recruitment"/>
      <div className="lg:space-y-12 space-y-8">
        <CommonBanner title="Who we are" />
        <Description />
        <NewsLatter />
      </div>
    </>
  );
};

export default WhoWeAre;
