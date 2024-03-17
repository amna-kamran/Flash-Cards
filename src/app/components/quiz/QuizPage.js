import React, { useState, useRef } from "react";
import Card from "./Card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function QuizPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isRedChecked, setIsRedChecked] = useState(false);
  const [isGreenChecked, setIsGreenChecked] = useState(false);
  const totalSlides = 4;
  const sliderRef = useRef(null);

  const settings = {
    infinite: false,
    dots: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (current) => setCurrentSlide(current),
    beforeChange: () => {
      setIsRedChecked(false);
      setIsGreenChecked(false);
    },
  };

  const handleRedChange = () => {
    setIsRedChecked(!isRedChecked);
    setIsGreenChecked(false);
  };

  const handleGreenChange = () => {
    setIsRedChecked(false);
    setIsGreenChecked(!isGreenChecked);
  };

  const isLastSlide = currentSlide === totalSlides - 1;

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="w-2/5 relative">
        <Slider ref={sliderRef} {...settings}>
          <Card />
          <Card />
          <Card />
          <Card />
        </Slider>
        <div className="absolute bottom-0 right-0 mr-4 mb-4 text-gray-400">
          {currentSlide + 1}/{totalSlides}
        </div>
      </div>

      <nav className="flex gap-1 p-2 font-sans text-base font-normal text-blue-gray-700 m-5">
        <div className="rounded-lg border border-gray-700 bg-transparent p-2 flex items-center">
          <div className="flex items-center mr-20 mt-3 mb-3">
            <label
              className="relative flex items-center pl-3 rounded-full cursor-pointer"
              htmlFor="green"
            >
              <input
                checked={isGreenChecked}
                onChange={handleGreenChange}
                type="checkbox"
                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-green-500 checked:bg-green-500 checked:before:bg-green-500 hover:before:opacity-10"
                id="green"
              />
            </label>
            <label className="ml-2 text-sm font-medium text-green-500">
              Correct
            </label>
          </div>
          <div className="flex items-center">
            <label
              className="relative flex items-center pl-3 rounded-full cursor-pointer"
              htmlFor="red"
            >
              <input
                checked={isRedChecked}
                onChange={handleRedChange}
                type="checkbox"
                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:bg-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                id="red"
              />
            </label>
            <label className="ml-2 text-sm font-medium text-red-500">
              Incorrect
            </label>
          </div>
        </div>
      </nav>
      <div className="flex">
        <button
          onClick={() => sliderRef.current.slickNext()}
          className="bg-gray-800 text-white px-4 py-2 rounded-md mr-4"
        >
          Submit
        </button>
        {isLastSlide && (
          <button
            onClick={() => console.log("End")}
            className="bg-blue-800 text-white px-4 py-2 rounded-md "
          >
            End
          </button>
        )}
      </div>
    </div>
  );
}

export default QuizPage;
