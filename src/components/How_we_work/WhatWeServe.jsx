import React, { useState } from "react";
import WhatWeServeModal from "./WhatWeServeModal";

const data = [
  {
    id: 1,
    image: require("../../assets/what we serve/1-Job Analysis.png"),
    title: "Job Analysis",
    des: "We identify the responsibilities, necessary skills, experience levels,and qualifications required for the job.",
  },
  {
    id: 2,
    image: require("../../assets/what we serve/2-Creating a Job Description.png"),
    title: "Creating a Job Description",
    des: "We develop a clear and comprehensive job description that outlines the duties, qualifications,and competencies needed so that we can really sell the opportunity to the best candidates available on the market.",
  },
  {
    id: 3,
    image: require("../../assets/what we serve/6-Sourcing Candidates.png"),
    title: "Sourcing Candidates",
    des: "We find potential applicants using various channels like our vast network as well social media and referrals from our extensive network of industry experts working with us on a consultancy basis therefore attracting suitable and motivated candidates. We also use our own in house developed AI and Big Data Software Application that can help us identify and contact the best available candidates on the marketplace.",
    des2: "",
  },
  {
    id: 4,
    image: require("../../assets/what we serve/3-Screening Applications.png"),
    title: "Screening Applications",
    des: "We evaluate resumes to create a long list of candidates who meet the main requirements, and we use a team of experienced consultants with the ability to keep the “finger on the pulse” of the applicant every step of the way throughout this very important and complex qualification and initial screening process.",
    des2: "",
  },
  {
    id: 5,
    image: require("../../assets/what we serve/5-Conducting Interviews.png"),
    title: "Conducting Competency Based Interviews",
    des: "We will help our clients select the final shortlist and we will help scheduling the interviews conducted by our trusted network of high-level Chief Executives and Consultants that have previously covered the role that the candidate is applying for, and after reviewing all the collected information we will help our clients select the most suitable candidates for the position. We will also supply clients with a list of questions to ask during the interview and can be part of the interviewing panel if required to do so.",
    des2: "",
  },
  {
    id: 6,
    image: require("../../assets/what we serve/4-Skill Assessments.png"),
    title: "Skill Assessments and Neurological Assessment",
    des: "Once the Shortlist has been submitted and the client has selected a candidate or the candidates suitable for the final stage of the recruitment process, we will start working with Dr Timothy Royer ( https://www.forgeinnerarmor.com/ -  https://royerneuroscience.com/ ) aiming to verify candidate’s competencies using Neuropsychological and Neuroscientific assessments including examination of lateral vision, breathing techniques, brain activity, sleep pattern and many more. These tests results will help the client evaluate the candidates' technical, professional, and interpersonal abilities. We will also submit a detailed written report that will help our clients make their final recruitment choice with total piece of mind. The result is simple: Our clients will not employ just any candidate, but they will end up employing their equivalent of Captain America.",
  },
  {
    id: 7,
    image: require("../../assets/what we serve/7-Background and Reference Checks.png"),
    title: "Background and Reference Checks",
    des: "We conduct background checks and contact references to verify candidates' employment history, qualifications, character, and performance record.",
  },
  {
    id: 8,
    image: require("../../assets/what we serve/9-Job Offer.png"),
    title: "Job Offer - Decision Making and Offer Management.",
    des: "We present the job offer to the chosen candidate, including details about salary, benefits, and other terms of employment to make sure that the candidate is happy with the opportunity available helping the negotiation process from both sides This process is designed to ensure that the best candidate is selected in a fair, efficient, and effective manner. We will also be in regular contact with both parties during the notice period ensuring a smooth and trouble-free transition for everybody involved.",
  },
  // {
  //   id: 8,
  //   image: require("../../assets/what we serve/8-Decision Making.png"),
  //   title: "Decision Making",
  //   des: "We selected the final shortlist by reviewing all the collected information and we select the most suitable candidates for the position, and we present it to the client. We also can sit with the client on site during the initial interview process.",
  // },
];

const WhatWeServe = () => {
  const [openModal, setOpenModal] = useState(false);
  const [readmore, setReadMore] = useState(null);

  const handleOnClose = () => setOpenModal(false);
  return (
    <>
      <div className="w-full relative">
        <div className="bg-[#004D7F] w-full lg:py-14 py-10 text-center absolute lg:px-20 px-4">
          <img
            src={require("../../assets/Group 239788.png")}
            alt=""
            className="absolute lg:block hidden w-48 h-48 -right-10 dropShadow drop-shadow-2xl -top-24 "
          />
          <div className="space-y-3">
            <h1 className="xl:text-3xl text-lg font-semibold text-white">
              Our Recruitment Process
            </h1>
            <p className="text-white text-sm">
              Our Recruitment Process: With 35 years of collective experience,
              we have designed a selection process tailor made for the world of
              Football utilising our Headhunting experience in over 3000
              executed searches integrating World Famous Neuroscience techniques
              with the use of AI Tools and Big Data statistics to identify the
              best available and most suitable candidate on the market.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:mb-64 mb-48 md:px-10 px-5 text-center justify-center relative md:top-48 sm:top-56 top-72 gap-5 items-center">
          {data.map((item) => (
            <div
              key={item.id}
              className="bg-white boxShadow shadow-3xl rounded-2xl h-72  space-y-4 xl:py-6 xl:px-6 py-5 px-3"
            >
              <img src={item.image} alt="" className="w-20 mx-auto" />
              <p className="xl:text-xl text-lg font-semibold overflow-hidden">
                {item.title}
              </p>
              <p className="text-justify line-clamp-2 text-[#656567] lg:text-center text-sm">
                {item.des}
              </p>
              <button
                className="text-primary_color float-right font-semibold text-sm hover:underline cursor-pointer"
                onClick={() => {
                  setOpenModal(true);
                  setReadMore(item)
                }}
              >
                Read More
              </button>
            </div>
          ))}
        </div>
        <WhatWeServeModal
          onClose={handleOnClose}
          visible={openModal}
          readmore={readmore}
        />
      </div>
    </>
  );
};

export default WhatWeServe;
