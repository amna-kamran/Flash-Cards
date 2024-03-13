"use client";
import React from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useState } from "react";
import Modal from "react-modal";

const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "transparent",
    border: "none",
  },
};

function Add() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  async function addSet(e) {
    e.preventDefault();
    closeModal();
    try {
      const response = await fetch("/api/set/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save data");
      }

      const responseData = await response.json();
      console.log("jdnjkx");
      console.log(responseData.message);

      return responseData;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  return (
    <>
      <div
        onClick={openModal}
        class="flex items-center justify-center min-h-48 min-w-64 border border-gray-700 rounded-lg cursor-pointer"
      >
        <AddRoundedIcon style={{ fontSize: 80, color: "gray" }} />
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div class="w-full max-w-sm border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form class="space-y-6" action="#">
            <h5 class="text-xl font-medium text-gray-900 dark:text-white">
              Make a set
            </h5>
            <div>
              <input
                type="text"
                id="message"
                class="block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Add a name"
                onChange={handleNameChange}
              />
            </div>
            <button
              onClick={addSet}
              type="submit"
              class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Make
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default Add;
