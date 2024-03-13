"use client";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import Add from "./Add";

function CardPage() {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/card/get")
      .then((response) => response.json())
      .then((data) => {
        setCards(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white-900"></div>
        </div>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-4 m-10 ">
          {cards.map((card, index) => (
            <Card
              key={card.id}
              question={card.question}
              answer={card.answer}
              questionNumber={index + 1}
            />
          ))}
          <Add />
        </div>
      )}
    </>
  );
}

export default CardPage;
