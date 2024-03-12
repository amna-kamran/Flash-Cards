"use client";
import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";

const Card = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setIsFlipped((prevIsFlipped) => !prevIsFlipped);
  };

  return (
    <div class="min-h-48 min-w-64">
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <div onClick={handleClick}>
          <a
            href="#"
            class="block min-h-48 min-w-64 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              sdckmncjkd
            </h5>
            <p class="font-normal text-gray-700 dark:text-gray-400">Front</p>
          </a>
        </div>
        <div onClick={handleClick}>
          <a
            href="#"
            class="block min-h-48 min-w-64 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Back
            </h5>
            <p class="font-normal text-gray-700 dark:text-gray-400">qsck</p>
          </a>
        </div>
      </ReactCardFlip>
    </div>
  );
};

export default Card;
