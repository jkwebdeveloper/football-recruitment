import React from "react";

const YoutubeVideo = () => {
  return (
    <div className="lg:px-32 px-6 space-y-10">
        <p className="lg:text-[32px] title_blue text-center text-lg font-bold">Press</p>
      <div className="mx-auto w-full">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/PL5bf_c4P7k"
          frameborder="0"
          allowfullscreen
          className="w-full lg:h-[600px]"
        ></iframe>
      </div>
    </div>
  );
};

export default YoutubeVideo;
