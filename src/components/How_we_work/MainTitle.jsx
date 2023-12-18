import React, { useState } from "react";
import LogoColor from "../../assets/Logo-color.svg";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const data = [
  {
    question: "Extensive Network",
    answer:
      "We've cultivated an extensive network spanning various industries to identify and engage with top talent, from experienced executives to specialized professionals, ensuring a diverse pool of candidates. Leveraging data analytics and industry trends, we glean insights that aid in the identification of candidates who not only possess the required qualifications but also exhibit a track record of success and innovation in their respective fields.",
  },
  {
    question: "Strategic and Cultural Assessment",
    answer:
      "Strategic and Cultural Assessment: Utilizing a strategic assessment process, we delve into the qualifications, leadership capabilities, and industry-specific expertise of candidates. This involves understanding their adaptability to the unique demands of the sports industry. Recognizing the importance of cultural alignment, we assess candidates not just based on their skills but also on their compatibility with the ethos, values, and aspirations of the football organizations they want to join.",
  },
  {
    question: "Collaborative Approach",
    answer:
      "Collaborative Approach: We work closely with our clients, gaining an in-depth understanding of their organizational goals, leadership style, and the specific requirements of the role ensuring that our candidate recommendations are tailored to their unique needs. Our commitment extends beyond the hiring process. We provide continuous support, assisting with the onboarding process and ensuring a smooth integration of the selected candidates into the organization's culture and operations. This refined methodology ensures that the individuals we recommend possess not only the requisite skills and experience but also the cultural fit and vision necessary to thrive within the specialized environment of the sports industry.",
  },
  // {
  //   question: "Our Recruitment Process",
  //   answer:
  //     "Our Recruitment Process: With 35 years of collective experience, we have designed a selection process tailor made for the world of Football utilising our Headhunting experience in over 3000 executed searches integrating World Famous Neuroscience techniques with the use of AI Tools and Big Data statistics to identify the best available and most suitable candidate on the market.",
  // },
];

const MainTitle = () => {
  const [openFaqs, setOpenFaqs] = useState(false);
  const toggle = (i) => {
    // console.log(i)
    if (openFaqs === i) {
      return setOpenFaqs(false);
    }

    setOpenFaqs(i);
  };
  // console.log(openFaqs)
  return (
    <div className="lg:px-10 px-4 w-full text-black space-y-14">
      <p className="lg:w-full w-11/12 text-justify text-sm lg:text-[16px] mx-auto">
        In the realm of recruiting non-sport personnel for roles within the
        football industry, our methodology is tailored to identify top-tier
        candidates who possess the unique skill sets and cultural fit required
        in this dynamic field. In keeping with the dynamic nature of the
        football industry, we remain abreast of its evolution, particularly in
        the realm of technology. To ensure precision and efficiency, we've
        devised an exceptional screening process tailored meticulously to the
        bespoke needs of our clients. At Football Recruitment, we harness the
        cutting-edge capabilities of AI and Big Data Platforms, underpinned by
        Neuropsychological and Neuroscientific personal assessments. Our
        strategic partnerships with eminent experts in Global Sport Neuroscience
        and Sports Analytics fortify our commitment to delivering the most apt
        and qualified candidates for our clients. Moreover, we extend our
        engagement beyond mere recruitment, striving to nurture and optimize the
        potential of each candidate. Our profound understanding of the physical
        and cognitive demands of the football domain empowers us to guide
        candidates toward peak performance, both on and off the pitch.
      </p>
      <div className="flex flex-col gap-7 justify-center ">
        <img src={LogoColor} alt="" className="mx-auto w-28" />
        {/* <div className="bg-primary_color shadow-2xl boxShadow lg:w-4/5 w-full mx-auto text-white py-7 px-5 text-center space-y-3 rounded-2xl">
          <div className="flex items-center justify-between">
            <p className="xl:text-xl text-base text-center">
              Extensive Network
            </p>
            <IoIosArrowDown className="ml-auto cursor-pointer" />
          </div>
          <p className="text-justify  lg:text-center text-sm">
            We've cultivated an extensive network spanning various industries to
            identify and engage with top talent, from experienced executives to
            specialized professionals, ensuring a diverse pool of candidates.
            Leveraging data analytics and industry trends, we glean insights
            that aid in the identification of candidates who not only possess
            the requisite qualifications but also exhibit a track record of
            success and innovation in their respective fields.
          </p>
        </div> */}
        {data.map((item, i) => (
          <div
            className="bg-primary_color shadow-2xl boxShadow lg:w-4/5 w-full mx-auto text-white py-7 px-5 text-center space-y-3 rounded-2xl"
            key={i}
          >
            <div className="space-y-3">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggle(i)}
              >
                <p className="xl:text-xl text-base text-center mx-auto">
                  {item.question}
                </p>
                {openFaqs === i ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </div>
              {openFaqs === i ? (
                // <p className="text-justify  text-sm">
                //   <hr className="w-full mt-5" />
                //   {item.answer}
                // </p>
                <div className="transition duration-500 space-y-4">
                  <hr className="w-full" />
                  <div className="text-justify text-sm">
                    {item.answer}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainTitle;
