import React, { useEffect, useCallback } from "react";
import "./StarrySky.css";
import "./letterPositions.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { parallaxAnimations } from "../ParallaxFunctions/ParallaxAnimations";
import {
  images,
  elementsData,
  scrumLetters,
  crystalLetters,
  asteroides,
  asteroidesClones,
  blackholes,
  rings,
  planets,
} from "./StarrySkyData";

gsap.registerPlugin(ScrollTrigger);

const StarrySky = () => {
  useEffect(() => {
    let cleanUpAnimations;

    const context = gsap.context(() => {
      // Configure les animations pour les asteroides
      const asteroidAnimations = [
        { className: ".asteroides1", duration: 50 },
        { className: ".asteroides2", duration: 15 },
        { className: ".asteroides3", duration: 25 },
      ];

      asteroidAnimations.forEach((animation) => {
        gsap.to(animation.className, {
          x: "-100vw",
          duration: animation.duration,
          repeat: -1,
          ease: "none",
          onRepeat: () => gsap.set(animation.className, { x: "0vw" }),
        });

        gsap.to(`${animation.className}-clone`, {
          x: "-100vw",
          duration: animation.duration,
          repeat: -1,
          ease: "none",
          onRepeat: () =>
            gsap.set(`${animation.className}-clone`, { x: "0vw" }),
        });
      });

      // Configure les animations de parallaxe
      cleanUpAnimations = parallaxAnimations(elementsData);
    });

    return () => {
      cleanUpAnimations();
      context.revert();
    };
  }, []);

  return (
    <div className="starrySkySection">
      <img
        className="starrySkyBg"
        src={images.starrySkyBg}
        alt="Starry Sky Background"
      />
      <div className="lettersWrapper">
        {scrumLetters.map((className, index) => (
          <img
            key={`${className}-${index}`}
            className={className}
            src={images[className]}
            alt=""
          />
        ))}
        {crystalLetters.map((className, index) => (
          <img
            key={`${className}-${index}`}
            className={className}
            src={images[className]}
            alt=""
          />
        ))}
      </div>
      <div className="asteroidesWrapper">
        {asteroides.map((className, index) => (
          <img
            key={`${className}-${index}`}
            className={className}
            src={images[className]}
            alt=""
          />
        ))}
        {asteroidesClones.map((className, index) => (
          <img
            key={`${className}-${index}`}
            className={className}
            src={images[className.replace("-clone", "")]}
            alt=""
          />
        ))}
      </div>
      <div className="starrySkyObjectsWrapper">
        {blackholes.map((className, index) => (
          <img
            key={`${className}-${index}`}
            className={className}
            src={images[className]}
            alt=""
          />
        ))}
        {rings.map((className, index) => (
          <img
            key={`${className}-${index}`}
            className={className}
            src={images[className]}
            alt=""
          />
        ))}
        {planets.map((className, index) => (
          <img
            key={`${className}-${index}`}
            className={className}
            src={images[className]}
            alt=""
          />
        ))}
        <img className="bigPlanet" src={images.bigPlanet} alt="Big Planet" />
      </div>
    </div>
  );
};

export default StarrySky;
