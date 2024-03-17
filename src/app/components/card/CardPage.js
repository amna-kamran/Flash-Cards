"use client";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import Add from "./Add";
import { useRouter } from "next/router";

function CardPage() {
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

  const handleClick = () => {
    router.push(`/quiz/quiz?setId=${setId}`);
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white-900"></div>
        </div>
      ) : (
        <div className="relative">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 m-10 ">
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
          <div className="fixed bottom-5 right-5">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleClick}
            >
              Take Quiz
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default CardPage;
