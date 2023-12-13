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
    const parallaxTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".elementsWrapper",
        start: "top top",
        end: "=+1000",
        scrub: true,
        markers: true,
      },
    });

    elementsData.forEach((element) => {
      if (element.scrollSpeed) {
        parallaxYPositions.current[element.className] = 0;
        parallaxTimeline.to(
          document.querySelector(`.${element.className}`).parentNode,
          {
            y: `+=${window.innerHeight * element.scrollSpeed}`,
            ease: "none",
          },
          0
        );
      }
    });

    // Console log pour les positions initiales et les déplacements
    elementsData.forEach((element) => {
      const initialY = gsap.getProperty(`.${element.className}`, "y");
      console.log(`3 Y for ${element.className}: ${initialY}`);
      if (element.scrollSpeed) {
        const displacement = window.innerHeight * element.scrollSpeed;
        console.log(`3 for ${element.className}: ${displacement}`);
      }
    });

    const xTo = elementsData.map((element) =>
      gsap.quickTo(`.${element.className}`, "x", {
        duration: 0.5,
        ease: "none",
      })
    );
    const yTo = elementsData.map((element) =>
      gsap.quickTo(`.${element.className}`, "y", {
        duration: 0.5,
        ease: "none",
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

    // Configuration des animations de rotation continues
    elementsData.forEach((element) => {
      if (element.rotationSpeed) {
        gsap.to(`.${element.className}`, {
          rotation: 360,
          duration: element.rotationSpeed,
          repeat: -1,
          ease: "linear",
        });
      }
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
      <div className="elementsWrapper">
        <div className="starrySkySection">
          <div className="lettersWrapper">
            {scrumLetters.map((className, index) => (
              <img
                key={`${className}-${index}`}
                className={className}
                src={imagesStarrySky[className]}
                alt=""
              />
            ))}
            {crystalLetters.map((className, index) => (
              <img
                key={`${className}-${index}`}
                className={className}
                src={imagesStarrySky[className]}
                alt=""
              />
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
            <div className={`${className}Wrapper`}>
              <img
                key={`${className}-${index}`}
                className={className}
                src={imagesStarrySky[className]}
                alt=""
              />
            </div>
          ))}
          <div className="bigPlanetWrapper">
            <img className="bigPlanet" src={bigPlanetImage} alt="Big Planet" />
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
    </div>
  );
};

export default StarrySky;
