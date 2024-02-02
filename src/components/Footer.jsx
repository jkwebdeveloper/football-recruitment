import React from "react";
// import Logo from "../assets/Logo.svg";
import { FaPinterest } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const { pathname } = useLocation();
  function checkPageUrl() {
    if (
      pathname.includes("sign-in") ||
      pathname.includes("sign-up") ||
      pathname.includes("forgot-password") ||
      pathname.includes("reset-password") ||
      pathname.includes("success") ||
      pathname.includes("how-we-work") ||
      pathname.includes("who-we-are") ||
      pathname.includes("contact") ||
      pathname.includes("faq") ||
      pathname.includes("terms-and-conditions") ||
      pathname.includes("current-vacancies") ||
      pathname.includes("job-detail") ||
      pathname.includes("my-account") ||
      pathname.includes("services") ||
      pathname.includes("/applying-next-page")
    )
      return true;
  }
  return (
    <div
      className={`bg-[#004D7F] lg:py-8 py-5 lg:px-20 px-4 space-y-4 relative w-full text-black  ${
        !checkPageUrl() && "mt-20"
      }`}
    >
      {/* <div className="container"> */}
      <div className="grid md:grid-cols-2 lg:gap-0 gap-10  lg:grid-cols-5 lg:px-10">
        <img
          src={require("../assets/footer_logo.png")}
          alt=""
          className="lg:w-3/5 w-32"
        />
        <div className="space-y-4 text-white">
          <p className="text-white text-base font-normal footer heading">
            Quick links
          </p>
          <p className="text-sm cursor-pointer font-light ">
            <Link
              to="/"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <span className="navlink inline-block">Home</span>
            </Link>
          </p>
          <p className="text-sm cursor-pointer font-light">
            <Link
              to="/how-we-work"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <span className="navlink inline-block"> How We work</span>
            </Link>
          </p>
          <p className="text-sm cursor-pointer font-light">
            <Link
              to="/current-vacancies"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <span className="navlink inline-block"> Current Vacancies</span>
            </Link>
          </p>
          <p className="text-sm cursor-pointer font-light">
            <Link
              to="/who-we-are"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <span className="navlink inline-block">Who We are</span>
            </Link>
          </p>
          <p className="text-sm cursor-pointer font-light">
            <Link
              to="/services"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <span className="navlink inline-block">Services</span>
            </Link>
          </p>
        </div>
        <div className="space-y-4 text-white">
          <p className="text-white text-base font-normal footer heading">
            Resources
          </p>
          <p className="text-sm cursor-pointer font-light ">
            <Link
              to="/contact"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <span className="navlink inline-block">Contact</span>
            </Link>
          </p>
          {/* <p className="text-sm cursor-pointer font-light">
            <Link
              to="/faq"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <span className="navlink inline-block">FAQ</span>
            </Link>
          </p> */}
        </div>
        <div className="space-y-4 text-white">
          <p className="text-white text-base font-normal footer heading">
            Legal
          </p>
          <p className="text-sm cursor-pointer font-light ">
            <Link
              to="/privacy-policy"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <span className="navlink inline-block">Privacy policy</span>
            </Link>
          </p>
          <p className="text-sm cursor-pointer font-light">
            <Link
              to="/terms-and-conditions"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <span className="navlink inline-block">Terms Condition</span>
            </Link>
          </p>
        </div>
        <div className="space-y-4 text-white">
          <p className="text-white text-base font-normal footer heading">
            Social Media
          </p>
          <div className="flex items-center gap-6">
            {/* <div className=" text-white text-2xl  cursor-pointer ">
              <FaPinterest />
            </div> */}
            {/* <div className=" text-white text-2xl  cursor-pointer ">
              <FaTwitter />
            </div> */}
            {/* <div className=" text-white text-2xl  cursor-pointer ">
              <FaFacebook />
            </div> */}
            {/* <div className=" text-white text-2xl  cursor-pointer ">
              <FaYoutube />
            </div> */}
            {/* <div className=" text-white text-2xl  cursor-pointer ">
              <FaInstagram />
            </div> */}
            <div className=" text-white text-2xl  cursor-pointer ">
              <a
                href="https://www.linkedin.com/company/football-recruitment/"
                target="_blank"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
      <div className="pt-11">
        <hr className="bg-[#0C5F94] w-full h-[1px] border-none" />
      </div>
      <div className="text-center p-3">
        <p className="text-white text-sm">
          Copyright @Football Recruitment 2023 All Right Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
