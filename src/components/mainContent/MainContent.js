// src/components/MainContent.js
import React from "react";
import "./MainContent.css";
import skyBg from "./assets/skyBg.png";
import groundBg from "./assets/groundBg.jpg";
import StarrySky from "../starrySky/StarrySky";

const MainContent = () => (
  <main>
    <StarrySky />
    <div className="skySection">
      <img src={skyBg} alt=""></img>
    </div>

    <div className="groundSection">
      <img src={groundBg} alt=""></img>
    </div>
  </main>
);

export default MainContent;
