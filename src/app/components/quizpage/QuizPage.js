import React from "react";
import Card from "./Card";
import Add from "./Add";

function QuizPage() {
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-4 m-10 ">
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Add />
    </div>
  );
}

export default QuizPage;
