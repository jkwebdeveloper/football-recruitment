import React, { useEffect, useState } from "react";
import CommonBanner from "../components/CommonBanner";
import NewsLatter from "../components/NewsLatter";
import axios from "axios";
import { Helmet } from "react-helmet";
import Lottie from "lottie-react";
import groovyWalkAnimation from "../assets/loadingBar.json";

const TermsAndCondition = () => {
  const [termsandcondition, setTermsAndCondition] = useState({});
  const [loading, setLoading] = useState(true);

  const handleGetTermsAndCondition = () => {
    axios
      .get("https://admin.footballrecruitment.eu/api/terms", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res, "response");
        setTermsAndCondition(res.data.page);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  useEffect(() => {
    handleGetTermsAndCondition();
  }, []);
  console.log(termsandcondition, "terms");
  return (
    <>
      <Helmet title="Terms-And-Condition | Football-Recruitment" />
      <div className="lg:space-y-14 space-y-8">
        <CommonBanner title="Terms &amp; Conditions" />
        {loading ? (
          <div className="lex justify-center mx-auto w-40">
            <Lottie
              animationData={groovyWalkAnimation}
              loop={true}
              className="flex justify-center mx-auto"
            />
          </div>
        ) : termsandcondition?.content ? (
          <div className="px-5 space-y-4">
            <div className="font-semibold text-primary_color xl:text-3xl text-lg">
              {termsandcondition?.title}
            </div>
            <div className="space-y-4">
              <p
                className="xl:text-base text-primary_color space-y-3 text-sm text-justify"
                dangerouslySetInnerHTML={{ __html: termsandcondition.content }}
              />
            </div>
          </div>
        ) : (
          <div className="justify-center flex  pt-14">No data</div>
        )}
        <NewsLatter />
      </div>
    </>
  );
};

export default TermsAndCondition;
