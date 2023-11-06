import React, { useEffect } from "react";
import "./StarrySky.css";
import "./letterPositions.css";
import { gsap } from "gsap";

import starrySkyBg from "./assets/starrySkyBg.png";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { parallaxAnimations } from "../ParallaxFunctions/ParallaxAnimations";

import planetsData from "./planetsData";

import scrumS from "./assets/letters/scrumS.png";
import scrumC from "./assets/letters/scrumC.png";
import scrumR from "./assets/letters/scrumR.png";
import scrumU from "./assets/letters/scrumU.png";
import scrumM from "./assets/letters/scrumM.png";

import crystalC from "./assets/letters/crystalC.png";
import crystalR from "./assets/letters/crystalR.png";
import crystalY from "./assets/letters/crystalY.png";
import crystalS from "./assets/letters/crystalS.png";
import crystalT from "./assets/letters/crystalT.png";
import crystalA from "./assets/letters/crystalA.png";
import crystalL from "./assets/letters/crystalL.png";

import asteroides1 from "./assets/asteroides1.png";
import asteroides2 from "./assets/asteroides2.png";
import asteroides3 from "./assets/asteroides3.png";

import blackhole1 from "./assets/blackhole1.png";
import blackhole2 from "./assets/blackhole2.png";
import blackhole3 from "./assets/blackhole3.png";

import bigPlanet from "./assets/planets/bigPlanet.png";
import planet1 from "./assets/planets/planet1.png";
import planet2 from "./assets/planets/planet2.png";
import planet3 from "./assets/planets/planet3.png";
import planet4 from "./assets/planets/planet4.png";
import planet5 from "./assets/planets/planet5.png";
import planet6 from "./assets/planets/planet6.png";
import planet7 from "./assets/planets/planet7.png";
import planet8 from "./assets/planets/planet8.png";
import planet9 from "./assets/planets/planet9.png";
import planet10 from "./assets/planets/planet10.png";
import planet11 from "./assets/planets/planet11.png";

import rings1 from "./assets/rings1.png";
import rings2 from "./assets/rings2.png";
import rings3 from "./assets/rings3.png";
import rings4 from "./assets/rings4.png";

console.log("starrySky.js loaded");

const StarrySky = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const asteroidAnimations = [
      { className: ".asteroides1", duration: 50 },
      { className: ".asteroides2", duration: 15 },
      { className: ".asteroides3", duration: 25 },
    ];

    // GSAP animations for asteroids
    asteroidAnimations.forEach((animation) => {
      gsap.to(animation.className, {
        x: "-100vw",
        duration: animation.duration,
        repeat: -1,
        ease: "none",
        onRepeat: function () {
          gsap.set(animation.className, { x: "0vw" });
        },
      });

      gsap.to(`${animation.className}-clone`, {
        x: "-100vw",
        duration: animation.duration,
        repeat: -1,
        ease: "none",
        onRepeat: function () {
          gsap.set(`${animation.className}-clone`, { x: "0vw" });
        },
      });
    });

    const cleanUpAnimations = parallaxAnimations(elementsData);

    return () => {
      cleanUpAnimations();
    };
  }, []);

  const elementsData = [
    {
      className: "bigPlanet", // La classe CSS de l'élément
      rotationSpeed: 60, // Vitesse de rotation pour l'animation de rotation continue
      scrollSpeed: -1000, // Vitesse de déplacement vertical liée au scroll
      parallaxStrength: 0.5, // Force de l'effet de parallaxe lié au mouvement de la souris
    },
  ];

  const scrumLetters = ["S", "C", "R", "U", "M"];
  const crystalLetters = ["C", "R", "Y", "S", "T", "A", "L"];

  const scrumImages = [scrumS, scrumC, scrumR, scrumU, scrumM];
  const crystalImages = [
    crystalC,
    crystalR,
    crystalY,
    crystalS,
    crystalT,
    crystalA,
    crystalL,
  ];

  const asteroides = [asteroides1, asteroides2, asteroides3];
  const asteroidesClones = [asteroides1, asteroides2, asteroides3];
  const blackholes = [blackhole1, blackhole2, blackhole3];
  const planets = [
    planet1,
    planet2,
    planet3,
    planet4,
    planet5,
    planet6,
    planet7,
    planet8,
    planet9,
    planet10,
    planet11,
  ];
  const rings = [rings1, rings2, rings3, rings4];

  return (
    <div className="starrySkySection">
      <img className="starrySkyBg" src={starrySkyBg} alt="" />
      {scrumLetters.map((letter, index) => (
        <img
          key={`scrum-${index}`}
          className={`scrum${letter}`}
          src={scrumImages[index]}
          alt=""
        />
      ))}
      {crystalLetters.map((letter, index) => (
        <img
          key={`crystal-${index}`}
          className={`crystal${letter}`}
          src={crystalImages[index]}
          alt=""
        />
      ))}
      {asteroides.map((src, index) => (
        <img
          key={`asteroides-${index}`}
          className={`asteroides${index + 1}`}
          src={src}
          alt=""
        />
      ))}
      {asteroidesClones.map((src, index) => (
        <img
          key={`asteroides-clone-${index}`}
          className={`asteroides${index + 1}-clone`}
          src={src}
          alt=""
        />
      ))}
      {blackholes.map((src, index) => (
        <img
          key={`blackhole-${index}`}
          className={`blackhole${index + 1}`}
          src={src}
          alt=""
        />
      ))}

      {rings.map((src, index) => (
        <img
          key={`rings-${index}`}
          className={`rings${index + 1}`}
          src={src}
          alt=""
        />
      ))}

      {planets.map((src, index) => (
        <img
          key={`planet-${index}`}
          className={`planet${index + 1}`}
          src={src}
        />
      ))}

      <img src={bigPlanet} alt="Big Planet" className="bigPlanet" />
    </div>
  );
};
export default StarrySky;
