import { Route, Routes } from "react-router-dom";
import "./App.css";
import Grid from "./grid.jsx";
import LandingPage from "./landingPage/landingPage.jsx";
import SignInPage from "./Sign-in/signIn.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/vsbot" element={<BotPlayer />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/game" element={<Grid />} />
      </Routes>
    </div>
  );
}

export default App;
