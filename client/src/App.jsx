import { Route, Routes } from "react-router-dom";
import React, { useState, useEffect} from "react";
import "./App.css";
import Grid from "./grid.jsx";
import LandingPage from "./landingPage/landingPage.jsx";
import SignInPage from "./Sign-in/signIn.jsx";

function App() {
  
 
  const API_URL = import.meta.env.VITE_BASE_URL

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/game" element={<Grid />} />
      </Routes>
    </div>
  );
}

export default App;
