// src/components/MainContent.js
import React from "react";
import "./MainContent.css";
import starrySkyBg from "./assets/starrySkyBg.jpg";
import skyBg from "./assets/skyBg.png";
import groundBg from "./assets/groundBg.jpg";

const MainContent = () => (
  <main>
    <div className="vignette"></div>

    <div className="starrySkySection">
      <img src={starrySkyBg}></img>
    </div>

    <div className="skySection">
      <img src={skyBg}></img>
    </div>

    <div className="groundSection">
      <img src={groundBg}></img>
    </div>
  </main>
);

export default MainContent;
