import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/navigation";

import { MdArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";
import axios from "axios";

const Testimonial = () => {
  const [testimonial, setTestimonial] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleGetTestimonial = () => {
    axios
      .get("https://admin.footballrecruitment.eu/api/testimonial", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setTestimonial(res.data.testimonial);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  useEffect(() => {
    handleGetTestimonial();
  }, []);

  return (
    <div className="text-center w-full space-y-11">
      <h1 className="lg:text-[32px] text-lg font-bold">
        User’s <span className="title_blue">Testimonials</span>{" "}
      </h1>
      {loading ? (
        <div className="">Loading...</div>
      ) : testimonial.length > 0 ? (
        <Swiper
          slidesPerView={1}
          navigation={{
            nextEl: ".button-next-slide",
            prevEl: ".button-prev-slide",
          }}
          modules={[Navigation]}
          className="relative"
        >
          {testimonial.map((testimonial,index) => (
            <SwiperSlide key={index}>
              <div className=" lg:p-16 p-4 relative rounded-3xl border  border-6-[#ECEDEF] w-[90%]  lg:w-[70%] mx-auto">
                <div className="flex xl:flex-row flex-col xl:gap-14 gap-3 items-center  xl:px-14">
                  <div className="xl:space-y-8 space-y-4">
                    <img
                      src={"https://admin.footballrecruitment.eu".concat(
                        testimonial?.image
                      )}
                      alt=""
                      className=" mx-auto rounded-full w-40 h-40"
                    />
                    <p className="text-xl font-semibold">{testimonial?.name}</p>
                  </div>
                  <div className="xl:w-3/4 p-2 md:text-left space-y-5">
                    <p className="md:text-left text-justify">
                      {testimonial.description}
                    </p>
                    {/* <p className="md:text-left text-justify">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Tellus posuere in leo ipsum ornare hendrerit. Vitae
                    sollicitudin consectetur ultricies nec. Sed faucibus diam,
                    penatibus lectus accumsan pellentesque nunc, nibh. Urna
                    aliquam tempus faucibus dolor.
                  </p> */}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="button-next-slide absolute z-10 top-[50%] -translate-y-1/2 lg:right-24 right-2 cursor-pointer md:w-10 md:h-10  w-8 h-8 md:text-2xl text-white bg-[#004D7F] rounded-full grid place-items-center">
            <MdArrowForwardIos />
          </div>
          <div className="button-prev-slide absolute z-10 top-[50%] -translate-y-1/2 lg:left-24 left-2 cursor-pointer md:w-10 md:h-10 w-8 h-8 md:text-2xl text-white bg-[#004D7F] rounded-full grid place-items-center">
            <MdArrowBackIosNew />
          </div>
        </Swiper>
      ) : (
        <div>No data</div>
      )}
    </div>
  );
};

export default Testimonial;
