import React from "react";
import CommonBanner from "../components/CommonBanner";
import FormSection from "../components/ContactUs/FormSection";
import NewsLatter from "../components/NewsLatter";
import { Helmet } from "react-helmet";

const ContactUs = () => {
  return (
    <>
    <Helmet title="Contact Us | Football-Recruitment"/>
      <div className="lg:space-y-12 space-y-8">
        <CommonBanner title="Contact Us" />
        <FormSection />
        <NewsLatter />
      </div>
    </>
  );
};

export default ContactUs;
