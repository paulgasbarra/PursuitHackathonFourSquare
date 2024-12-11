import { Route, Routes } from "react-router-dom";
import "./App.css";
import Grid from "./grid.jsx";
import LandingPage from "./landingPage/LandingPage.jsx";
// import signIn from "./Sign-in/signIn.jsx";

function App() {
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
