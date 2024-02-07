import React, { useEffect, useState } from "react";
import CommonBanner from "../components/CommonBanner";
import MainMenu from "../components/MyAccount/MainMenu";
import MenuDetails from "../components/MyAccount/MenuDetails";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { handleGetResume } from "../redux/MyAccountSlice";
import useAbortApiCall from "../hooks/useAbortCallApi";
import { handleGetAppliedJobs } from "../redux/JobSlice";

const MyAccount = () => {
  const [tabMenu, setTabMenu] = useState("Manage Acoount");

  const { token, user } = useSelector((s) => s.root.auth);

  const { AbortControllerRef } = useAbortApiCall();

  const dispatch = useDispatch();

  useEffect(() => {
    if (user !== null) {
      dispatch(handleGetResume({ token, signal: AbortControllerRef }));
      dispatch(handleGetAppliedJobs({ token }));
    }
  }, []);

  return (
    <>
      <Helmet title="My-Account | Football-Recruitment" />
      <div className="lg:space-y-14 space-y-5 bg-[#F5F6FA]">
        <CommonBanner title="My Account" />
        <div className="flex md:flex-row flex-col gap-4 md:px-5 px-1 lg:relative -top-28">
          <MainMenu onTabChange={setTabMenu} tabMenu={tabMenu} />
          <MenuDetails tabMenu={tabMenu} />
        </div>
      </div>
    </>
  );
};

export default MyAccount;
