import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Grid from "./grid.jsx";
import LandingPage from "./landingpage/landingpage.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/game" element={<Grid />} />
      </Routes>
    </div>
  );
}

export default App;
