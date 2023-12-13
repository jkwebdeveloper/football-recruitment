import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const data = [
  {
    question: "Q1: What is Lorem Ipsum?",
    answer:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text",
  },
  {
    question: "Q2: Why do we use it?",
    answer:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text",
  },
  {
    question: "Q3: Where does it come from?",
    answer:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text",
  },
  {
    question: "Q4: Where can I get some?",
    answer:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text",
  },
];


const Faqs = () => {
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
    <div className="space-y-5 w-full xl:px-10 px-3">
      <h1 className="xl:text-[30px] text-lg font-medium">
        Frequently Asked <span className="title_blue">Questions</span>{" "}
      </h1>
      {data.map((item, i) => (
        <div
          className="border w-full border-[#E7E7E7] space-y-5 py-5 rounded-lg"
          key={i}
        >
          <div className="">
            <div
              className="flex items-center justify-between cursor-pointer px-6"
              onClick={() => toggle(i)}
            >
              <h2
                className={`${
                  openFaqs === i ? "text-primary_color font-medium" : "text-black font-medium"
                }`}
              >
                {item.question}
              </h2>
              {openFaqs === i ? (
                <div className="text-primary_color">
                  <IoIosArrowUp />{" "}
                </div>
              ) : (
                <IoIosArrowDown />
              )}
            </div>
            {openFaqs === i ? (
              <div className="transition duration-500">
                <hr className="w-full mt-5" />
                <div className="pt-4 px-6 ">{item.answer}</div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Faqs;
