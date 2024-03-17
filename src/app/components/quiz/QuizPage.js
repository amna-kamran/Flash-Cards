import React, { useState, useEffect, useRef } from "react";
import Card from "./Card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useRouter } from "next/router";
import Modal from "react-modal";
import customStyles from "@/utils/constants/customStyles";

function QuizPage() {
  const router = useRouter();
  const { setId } = router.query;
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (setId !== undefined) {
      fetch("/api/card/get")
        .then((response) => response.json())
        .then((data) => {
          data = data.filter((card) => card.setId == setId);
          setCards(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  }, [setId]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isRedChecked, setIsRedChecked] = useState(false);
  const [isGreenChecked, setIsGreenChecked] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const totalSlides = cards.length;
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
    setIsCheckboxChecked(true);
  };

  const handleGreenChange = () => {
    setIsRedChecked(false);
    setIsGreenChecked(!isGreenChecked);
    setIsCheckboxChecked(true);
  };

  const handleSubmit = () => {
    if (isGreenChecked) {
      setCorrectCount(correctCount + 1);
    } else if (isRedChecked) {
      setIncorrectCount(incorrectCount + 1);
    }
    setIsRedChecked(false);
    setIsGreenChecked(false);
    setIsCheckboxChecked(false);
    const updatedCards = [...cards];
    updatedCards[currentSlide] = {
      ...updatedCards[currentSlide],
      isAnswered: true,
    };
    setCards(updatedCards);
    sliderRef.current.slickNext();
  };

  const isLastSlide = currentSlide === totalSlides - 1;

  const isCurrentCardAnswered = cards[currentSlide]?.isAnswered;

  const goToStart = () => {
    setCurrentSlide(0);
    sliderRef.current.slickGoTo(0);
  };

  const goToEnd = () => {
    setCurrentSlide(totalSlides - 1);
    sliderRef.current.slickGoTo(totalSlides - 1);
  };
  function openModal() {
    console.log("ehrerhnsckjvdhnkdh");
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white-900"></div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="w-2/5 relative">
            <Slider ref={sliderRef} {...settings}>
              {cards.map((card, index) => (
                <Card
                  key={card.id}
                  question={card.question}
                  answer={card.answer}
                  questionNumber={index + 1}
                  isAnswered={card.isAnswered || false}
                />
              ))}
            </Slider>
            <div className="absolute bottom-0 right-0 mr-4 mb-4 text-gray-400">
              {currentSlide + 1}/{totalSlides}
            </div>
          </div>

          <nav className="flex gap-1 p-2 font-sans text-base font-normal text-blue-gray-700 m-5">
            <div className="rounded-lg border border-gray-700 bg-transparent p-2 flex items-center">
              <div className="flex items-center mr-20 mt-3 mb-3">
                <label
                  className={`relative flex items-center pl-3 rounded-full cursor-pointer ${
                    isCurrentCardAnswered
                      ? "pointer-events-none opacity-50"
                      : ""
                  }`}
                  htmlFor="green"
                >
                  <input
                    checked={isGreenChecked}
                    onChange={handleGreenChange}
                    type="checkbox"
                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-green-500 checked:bg-green-500 checked:before:bg-green-500 hover:before:opacity-10"
                    id="green"
                    disabled={isCurrentCardAnswered}
                  />
                </label>
                <label
                  className={`ml-2 text-sm font-medium ${
                    isCurrentCardAnswered ? "text-gray-500" : "text-green-500"
                  }`}
                >
                  Correct
                </label>
              </div>
              <div className="flex items-center">
                <label
                  className={`relative flex items-center pl-3 rounded-full cursor-pointer ${
                    isCurrentCardAnswered
                      ? "pointer-events-none opacity-50"
                      : ""
                  }`}
                  htmlFor="red"
                >
                  <input
                    checked={isRedChecked}
                    onChange={handleRedChange}
                    type="checkbox"
                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:bg-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                    id="red"
                    disabled={isCurrentCardAnswered}
                  />
                </label>
                <label
                  className={`ml-2 text-sm font-medium ${
                    isCurrentCardAnswered ? "text-gray-500" : "text-red-500"
                  }`}
                >
                  Incorrect
                </label>
              </div>
            </div>
          </nav>
          <div className="flex">
            <button
              onClick={goToStart}
              className="text-gray-500 text-sm px-4 py-2 rounded-md mr-4"
            >
              Go to Start
            </button>
            <button
              onClick={handleSubmit}
              disabled={
                isCurrentCardAnswered ||
                !isCheckboxChecked ||
                (!isRedChecked && !isGreenChecked)
              }
              className={`${
                isCurrentCardAnswered ||
                !isCheckboxChecked ||
                (!isRedChecked && !isGreenChecked)
                  ? "bg-gray-500 "
                  : "bg-gray-800"
              } text-white px-4 py-2 rounded-md mr-4`}
            >
              Submit
            </button>

            {isLastSlide && (
              <button
                onClick={openModal}
                className="bg-blue-800 text-white px-4 py-2 rounded-md "
              >
                End
              </button>
            )}
            <button
              onClick={goToEnd}
              className="text-gray-500 text-sm px-4 py-2 rounded-md"
            >
              Go to End
            </button>
          </div>
        </div>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div class="w-full max-w-sm border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700"></div>
      </Modal>
    </>
  );
}

export default QuizPage;
