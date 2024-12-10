import { useState } from "react";
import "./App.css";
import Grid from "./grid.jsx";
import landingPage from "./landingPage/landingPage.jsx";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Grid />
      <landingPage />
    </div>
  );
}

export default App;
