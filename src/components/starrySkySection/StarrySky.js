import React, { useRef } from "react";
import "./StarrySky.css";
import "./orangeSky.css";
import "./letterPositions.css";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bigPlanetImage from "./assets/starrySkyAssets/planets/bigPlanet.png";

import {
  imagesStarrySky,
  scrumLetters,
  crystalLetters,
  asteroides,
  asteroidesClones,
  blackholes,
  rings,
  planets,
} from "./StarrySkyData";

import {
  imagesOrangeSky,
  bubbles,
  clouds,
  montgolfieres,
} from "./orangeSkyData";

import { elementsData } from "./animationData";

gsap.registerPlugin(ScrollTrigger);

const StarrySky = () => {
  const parallaxYPositions = useRef({}); // Pour mémoriser les positions Y de parallaxe

  useGSAP(() => {
    elementsData.forEach((element) => {
      const elementContainer = document.querySelector(
        `.${element.className}Container`
      );

      const elementWrapper = document.querySelector(
        `.${element.className}Wrapper`
      );

      // Création d'une timeline spécifique à l'élément
      const parallaxTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: elementContainer,
          start: "clamp(top bottom)", // Début de l'animation (haut de l'élément touche le bas de la fenêtre)
          end: "bottom top",
          scrub: true,
          refreshInit: true,
          markers: true,
        },
      });

      // Configuration des animations de parallaxe verticale
      if (element.scrollSpeed) {
        parallaxTimeline.to(
          elementWrapper,
          {
            y: `+=${window.innerHeight * element.scrollSpeed}`,
            ease: "none",
          },
          0
        );
      }

      // Configuration des animations de rotation continues
      if (element.rotationSpeed) {
        gsap.to(`.${element.className}`, {
          rotation: 360,
          duration: element.rotationSpeed,
          repeat: -1,
          ease: "linear",
        });
      }
    });

    // Configuration des animations de mouvement de la souris
    const xTo = elementsData.map((element) =>
      gsap.quickTo(`.${element.className}`, "x", {
        duration: 0.5,
        ease: "easeInOutQuint",
      })
    );
    const yTo = elementsData.map((element) =>
      gsap.quickTo(`.${element.className}`, "y", {
        duration: 0.5,
        ease: "easeInOutQuint",
      })
    );

    // Gestion du mouvement de la souris
    const mouseMoveHandler = (event) => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const posX = (event.clientX / viewportWidth - 0.5) * viewportWidth * 2;
      const posY = (event.clientY / viewportHeight - 0.5) * viewportHeight * 2;

      elementsData.forEach((element, i) => {
        if (element.parallaxStrength) {
          const currentY = parallaxYPositions.current[element.className] || 0;

          xTo[i](posX * element.parallaxStrength);
          yTo[i](currentY + posY * element.parallaxStrength);
        }
      });
    };
    window.addEventListener("mousemove", mouseMoveHandler);

    // Configuration des animations continues des astéroïdes
    asteroides.forEach((className, index) => {
      gsap.to(`.${className}`, {
        x: "-100vw",
        duration: 50 - index * 15,
        repeat: -1,
        ease: "none",
        onRepeat: () => gsap.set(`.${className}`, { x: "0vw" }),
      });

      gsap.to(`.${className}-clone`, {
        x: "-100vw",
        duration: 50 - index * 15,
        repeat: -1,
        ease: "none",
        onRepeat: () => gsap.set(`.${className}-clone`, { x: "0vw" }),
      });
    });

    // Fonction de nettoyage
    return () => {
      window.removeEventListener("mousemove", mouseMoveHandler);
    };
  });

  return (
    <div className="completeSection">
      <img
        className="starrySkyBg"
        src={imagesStarrySky.completeSkyBg}
        alt="Starry Sky Background"
      />
      <div className="starrySkySection">
        <div className="lettersWrapper">
          {scrumLetters.map((className, index) => (
            <div
              key={`${className}-${index}`}
              className={`${className}Container`}
            >
              <div className={`${className}Wrapper`}>
                <img
                  className={className}
                  src={imagesStarrySky[className]}
                  alt=""
                />
              </div>
            </div>
          ))}
          {crystalLetters.map((className, index) => (
            <div
              key={`${className}-${index}`}
              className={`${className}Container`}
            >
              <div className={`${className}Wrapper`}>
                <img
                  className={className}
                  src={imagesStarrySky[className]}
                  alt=""
                />
              </div>
            </div>
          ))}
        </div>
        <div className="asteroidesWrapper">
          {asteroides.map((className, index) => (
            <img
              key={`${className}-${index}`}
              className={className}
              src={imagesStarrySky[className]}
              alt=""
            />
          ))}
          {asteroidesClones.map((className, index) => (
            <img
              key={`${className}-${index}`}
              className={className}
              src={imagesStarrySky[className.replace("-clone", "")]}
              alt=""
            />
          ))}
        </div>
        {blackholes.map((className, index) => (
          <img
            key={`${className}-${index}`}
            className={className}
            src={imagesStarrySky[className]}
            alt=""
          />
        ))}
        {rings.map((className, index) => (
          <img
            key={`${className}-${index}`}
            className={className}
            src={imagesStarrySky[className]}
            alt=""
          />
        ))}
        {planets.map((className, index) => (
          <div
            key={`${className}-${index}`}
            className={`${className}Container`}
          >
            <div className={`${className}Wrapper`}>
              <img
                className={className}
                src={imagesStarrySky[className]}
                alt=""
              />
            </div>
          </div>
        ))}
        <div className="bigPlanetContainer">
          <div className="bigPlanetWrapper">
            <img className="bigPlanet" src={bigPlanetImage} alt="Big Planet" />
          </div>
        </div>
      </div>
      <div className="orangeSkySection">
        {bubbles.map((className, index) => (
          <img
            key={`${className}-${index}`}
            className={className}
            src={imagesOrangeSky[className]}
            alt=""
          />
        ))}
        {clouds.map((className, index) => (
          <img
            key={`${className}-${index}`}
            className={className}
            src={imagesOrangeSky[className]}
            alt=""
          />
        ))}
        {montgolfieres.map((className, index) => (
          <img
            key={`${className}-${index}`}
            className={className}
            src={imagesOrangeSky[className]}
            alt=""
          />
        ))}
      </div>
    </div>
  );
};

export default StarrySky;
