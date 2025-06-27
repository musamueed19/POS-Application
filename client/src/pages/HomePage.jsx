import React, { useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";

// axios import
import axios from "axios";

const HomePage = () => {
  function getAllItems() {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/v0/items`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getAllItems();
  }, []);

  return (
    <div>
      <h1>HomePage</h1>
    </div>
  );
};

export default HomePage;
