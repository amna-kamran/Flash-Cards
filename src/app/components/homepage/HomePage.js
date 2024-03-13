"use client";
import React, { useEffect, useState } from "react";
import Add from "../set/Add";
import Set from "../set/Set";

function HomePage() {
  const [sets, setSets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/set/get")
      .then((response) => response.json())
      .then((data) => {
        setSets(data);
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
          {sets.map((set) => (
            <Set key={set.id} name={set.name} setId={set.setId} />
          ))}
          <Add />
        </div>
      )}
    </>
  );
}

export default HomePage;
