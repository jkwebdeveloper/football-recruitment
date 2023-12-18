import React from "react";
import Logocolor from "../../assets/Logo-color.svg";
import { Link } from "react-router-dom";

const HowWeWork = () => {
  return (
    <div className="bg-[#F4FBFF] grid grid-cols-1 lg:grid-cols-2 lg:py-20 py-8 justify-center gap-7 xl:gap-0  lg:px-20 px-8 ">
      <div className="flex justify-center ">
        <img
          src={Logocolor}
          alt=""
          className="text-center lg:w-[342px]  lg:h-[455px]"
        />
      </div>
      <div className="space-y-5">
        <h1 className="lg:text-[40px] text-lg font-bold">
          How <span className="title_blue">we work</span>{" "}
        </h1>
        <p className="text-[#656567] text-justify xl:text-base text-sm">
          In the realm of recruiting non-sport personnel for roles within the
          sports industry, our methodology is tailored to identify top-tier
          candidates who possess the unique skill sets and cultural fit required
          for success in this dynamic field. In keeping with the dynamic nature
          of the football industry, we remain abreast of its evolution,
          particularly in the realm of technology. To ensure precision and
          efficiency, we've devised an exceptional screening process tailored
          meticulously to the bespoke needs of our esteemed clientele. At
          Football Recruitment, we harness the cutting-edge capabilities of AI
          and Big Data Platforms, underpinned by Neuropsychological and
          Neuroscientific personal assessments. Our strategic partnerships with
          eminent experts in Global Sport Neuroscience and Sports Analytics
          fortify our commitment to delivering the most apt and qualified
          candidates for our clients. Moreover, we extend our engagement beyond
          mere recruitment, striving to nurture and optimize the potential of
          each candidate. Our profound understanding of the physical and
          cognitive demands of the football domain empowers us to guide
          candidates toward peak performance, both on and off the pitch.
        </p>
        <div className="space-y-4">
          <Link
            to="/how-we-work"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <button type="button" className="blue_button px-5">
              More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HowWeWork;
