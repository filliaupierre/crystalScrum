// src/components/MainContent.js
import React from "react";
import "./MainContent.css";

console.log("Je passe par ici");

const MainContent = () => (
  <main>
    <div className="vignette"></div>

    <div className="starrySkySection">
      <img src="./img/layers/backgrounds/starrySkyBg.jpg"></img>
    </div>

    <div className="skySection">
      <img src="./img/layers/backgrounds/skyBg.png"></img>
    </div>

    <div className="groundSection">
      <img src="./img/layers/backgrounds/groundBg.jpg" alt=""></img>
    </div>
  </main>
);

export default MainContent;
