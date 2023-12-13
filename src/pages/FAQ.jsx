import React from "react";
import CommonBanner from "../components/CommonBanner";
import Faqs from "../components/FAQ/Faqs";
import NewsLatter from "../components/NewsLatter";

const FAQ = () => {
  return (
    <div className="lg:space-y-14 space-y-8">
      <CommonBanner title="FAQ" />
      <Faqs />
      <NewsLatter />
    </div>
  );
};

export default FAQ;
