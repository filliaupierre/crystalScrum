import React, { useRef } from "react";
import "./StarrySky.css";
import "./orangeSky.css";
import "./letterPositions.css";
import "./planetsPositions.css";
import "./astresPositions.css";
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
  const parallaxYPositions = useRef({}); // Pour mémoriser les positions Y de parallaxe (mousemoeve)
  const mouseMoveAnimations = useRef({});

  const isElementVisible = (className) => {
    const element = document.querySelector(`.${className}Container`);
    if (!element) return false;

    const rect = element.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom >= 0;
  };

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
          markers: true,
          onEnter: () => activateMouseMoveAnimation(element.className),
          onLeave: () => deactivateMouseMoveAnimation(element.className),
          onEnterBack: () => activateMouseMoveAnimation(element.className),
          onLeaveBack: () => deactivateMouseMoveAnimation(element.className),
          onRefresh: (self) => {
            if (self.isActive) {
              activateMouseMoveAnimation(element.className);
            }
          },
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

      if (element.parallaxStrength) {
        mouseMoveAnimations.current[element.className] = {
          x: gsap.quickTo(`.${element.className}`, "x", {
            duration: 0.5,
            ease: "easeInOutQuint",
          }),
          y: gsap.quickTo(`.${element.className}`, "y", {
            duration: 0.5,
            ease: "easeInOutQuint",
          }),
        };
      }

      // Activez les animations de mouvement de la souris si l'élément est visible au chargement
      if (isElementVisible(element.className)) {
        activateMouseMoveAnimation(element.className);
      }
    });

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

    window.addEventListener("mousemove", handleMouseMove);
  });

  const activateMouseMoveAnimation = (className) => {
    parallaxYPositions.current[className] = true;
  };

  const deactivateMouseMoveAnimation = (className) => {
    parallaxYPositions.current[className] = false;
  };

  const handleMouseMove = (event) => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const posX = (event.clientX / viewportWidth - 0.5) * viewportWidth * 2;
    const posY = (event.clientY / viewportHeight - 0.5) * viewportHeight * 2;

    elementsData.forEach((element) => {
      if (isElementVisible(element.className)) {
        activateMouseMoveAnimation(element.className);
      }

      if (parallaxYPositions.current[element.className]) {
        const { x, y } = mouseMoveAnimations.current[element.className];
        x(posX * element.parallaxStrength);
        y(posY * element.parallaxStrength);
      }
    });
  };

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
        {rings.map((className, index) => (
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
          <div
            key={`${className}-${index}`}
            className={`${className}Container`}
          >
            <div className={`${className}Wrapper`}>
              <img
                className={className}
                src={imagesOrangeSky[className]}
                alt=""
              />
            </div>
          </div>
        ))}
        {clouds.map((className, index) => (
          <div
            key={`${className}-${index}`}
            className={`${className}Container`}
          >
            <div className={`${className}Wrapper`}>
              <img
                className={className}
                src={imagesOrangeSky[className]}
                alt=""
              />
            </div>
          </div>
        ))}
        {montgolfieres.map((className, index) => (
          <div
            key={`${className}-${index}`}
            className={`${className}Container`}
          >
            <div className={`${className}Wrapper`}>
              <img
                className={className}
                src={imagesOrangeSky[className]}
                alt=""
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StarrySky;
