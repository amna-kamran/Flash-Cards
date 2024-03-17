import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";

const Card = ({ question, answer, questionNumber, isAnswered }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setIsFlipped((prevIsFlipped) => !prevIsFlipped);
  };

  return (
    <div>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <div onClick={handleClick}>
          <a
            href="#"
            className={`block h-80 p-6 border border-gray-200 rounded-lg shadow  ${
              isAnswered
                ? "hover:bg-pink-200 bg-pink-800 dark:border-pink-700 dark:hover:bg-pink-700"
                : "hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            }`}
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Question {questionNumber}
            </h5>
            <p
              className={`font-normal
             ${
               isAnswered
                 ? "text-white-700"
                 : "text-gray-700 dark:text-gray-400"
             }
            `}
            >
              {question}
            </p>
          </a>
        </div>
        <div onClick={handleClick}>
          <a
            href="#"
            className={`block h-80 p-6 border border-gray-200 rounded-lg shadow  ${
              isAnswered
                ? "hover:bg-pink-800 bg-pink-800 dark:border-pink-700 dark:hover:bg-pink-700"
                : "hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            }`}
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Back
            </h5>
            <p
              className={`font-normal
             ${
               isAnswered
                 ? "text-white-700"
                 : "text-gray-700 dark:text-gray-400"
             }
            `}
            >
              {answer}
            </p>
          </a>
        </div>
      </ReactCardFlip>
    </div>
  );
};

export default Card;
