import React, { useEffect, useState } from "react";
import CommonBanner from "../components/CommonBanner";
import NewsLatter from "../components/NewsLatter";
import axios from "axios";
import { Helmet } from "react-helmet";
import Lottie from "lottie-react";
import groovyWalkAnimation from "../assets/loadingBar.json";

const PrivacyPolicy = () => {
  const [privacypolicy, setPrivacyPolicy] = useState({});
  const [loading, setLoading] = useState(true);

  const handleGetPrivacyPolicy = () => {
    axios
      .get("https://admin.footballrecruitment.eu/api/privacy", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setPrivacyPolicy(res.data.page);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  useEffect(() => {
    handleGetPrivacyPolicy();
  }, []);

  return (
    <>
      <Helmet title="Privacy-Policy | Football-Recruitment" />
      <div className="lg:space-y-14 space-y-8">
        <CommonBanner title="Privacy Policy" />
        {loading ? (
          <div className="flex justify-center mx-auto w-40">
            <Lottie
              animationData={groovyWalkAnimation}
              loop={true}
              className="flex justify-center mx-auto"
            />
          </div>
        ) : privacypolicy?.content ? (
          <div className="px-5 space-y-4">
            <div className="font-semibold text-primary_color xl:text-3xl text-lg">
              {privacypolicy.title}
            </div>
            <div className="space-y-4">
              <p
                className="xl:text-left space-y-3 xl:text-base text-primary_color text-sm text-justify"
                dangerouslySetInnerHTML={{ __html: privacypolicy.content }}
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

export default PrivacyPolicy;
