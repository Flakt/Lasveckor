import React from "react";
import logo from "./logo.svg";
import WeekDisplay from "./Components/WeekDisplay";
import "./App.css";

function App() {
  console.log("Powered by G.U.D.");
  return (
    <div className="App">
      <WeekDisplay />
    </div>
  );
}

export default App;
