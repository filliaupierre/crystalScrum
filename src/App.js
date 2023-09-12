import React from "react";
import Navbar from "./components/navbar/Navbar";
import MainContent from "./components/mainContent/MainContent";
import "./App.css";

function App() {
  console.log("App component rendered");

  return (
    <>
      <Navbar />
      <MainContent />
    </>
  );
}

export default App;
