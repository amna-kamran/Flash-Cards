import React from "react";
import Add from "../card set/Add";

function HomePage() {
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-4 m-10 ">
      <Add />
    </div>
  );
}

export default HomePage;
