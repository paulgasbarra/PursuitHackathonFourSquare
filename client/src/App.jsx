import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Grid from "./grid.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Grid />
    </div>
  );
}

export default App;
