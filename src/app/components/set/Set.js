"use client";
import React from "react";

const Set = ({ name, setId }) => {
  return (
    <div class="min-h-48 min-w-64">
      <a
        href="#"
        class="block min-h-48 min-w-64 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {name}
        </h5>
      </a>
    </div>
  );
};

export default Set;
