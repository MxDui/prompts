import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import PromptSaver from "./pages/PromptSaver";

function App() {
  const [count, setCount] = useState(0);

  return <PromptSaver />;
}

export default App;
