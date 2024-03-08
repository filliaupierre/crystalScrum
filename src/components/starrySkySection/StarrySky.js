import React, { useEffect, useRef, useState } from "react";
import "./StarrySky.css";
import "./blueSky.css";
import "./letterPositions.css";
import "./planetsPositions.css";
import "./astresPositions.css";
import "./spaceStationPositions.css";
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
  fogs,
  spaceshipGroups,
  spaceStations,
} from "./StarrySkyData";

import { imagesBlueSky, montgolfieres, circleClouds } from "./blueSkyData";

import { elementsData } from "./animationData";
import { spaceshipData } from "./animationData";

gsap.registerPlugin(ScrollTrigger);

const StarrySky = () => {
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const parallaxYPositions = useRef({}); // Pour mémoriser les positions Y de parallaxe (mousemoeve)
  const mouseMoveAnimations = useRef({});

  // Animation au moment du clic
  const handleButtonClick = () => {
    const timeline = gsap.timeline();

    // Animation de disparition de la page de chargement
    timeline.to(".loadingScreen", {
      autoAlpha: 0,
      duration: 1,
      onComplete: () => setShowLoadingScreen(false), // Cache la page de chargement après l'animation
    });

    // Animations des planètes
    timeline.fromTo(
      ".planetsWrapper",
      { y: -500, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 4, ease: "power1.out" },
      "<"
    );

    // Animations des planètes
    timeline.fromTo(
      ".bigPlanetWrapper",
      { y: 500, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 4, ease: "power1.out" },
      "<"
    );

    // Animations des lettres (Scrum et Crystal) avec des vitesses différentes
    [...scrumLetters, ...crystalLetters].forEach((className) => {
      timeline.fromTo(
        `.${className}Container`,
        { y: -500, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: Math.random() * 3 + 2, // entre 2 et 5 secondes
          ease: "power1.out",
        },
        "<"
      );
    });

    // Animations des astéroïdes
    timeline.fromTo(
      ".asteroidesWrapper",
      { y: 500, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 4, ease: "power1.out" },
      "<"
    );

    // Animation des fogs individuellement
    [
      "fog1Container",
      "fog2Container",
      "fog3Container",
      "fog4Container",
      "fog5Container",
      "fog6Container",
    ].forEach((className) => {
      timeline.fromTo(
        `.${className}`,
        { autoAlpha: 0 }, // Démarre avec le fog invisible
        {
          autoAlpha: 1,
          duration: 1.5,
          ease: "power1.inOut",
        },
        "+=0" // Commence après un délai d'une seconde de la fin des autres animations
      );
    });
  };

  const isElementVisible = (className) => {
    const element = document.querySelector(`.${className}Container`);
    if (!element) return false;

    const rect = element.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom >= 0;
  };

  useEffect(() => {
    // Gérer le défilement
    if (showLoadingScreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Nettoyage : réactiver le scrolling lorsque le composant est démonté
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showLoadingScreen]);

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

    const animations = {}; // Stocke les références des animations

    spaceshipData.forEach(({ className, duration, angle }) => {
      const element = document.querySelector(`.${className}`);
      if (!element) return;

      const cosAngle = Math.cos(angle * (Math.PI / 180));
      const sinAngle = Math.sin(angle * (Math.PI / 180));
      const moveDistance = window.innerWidth * 1.5;

      const startAnimation = () => {
        if (!animations[className]) {
          animations[className] = gsap
            .timeline({ repeat: -1, paused: true })
            .fromTo(
              element,
              {
                x: -moveDistance * cosAngle,
                y: -moveDistance * sinAngle,
              },
              {
                x: moveDistance * cosAngle,
                y: moveDistance * sinAngle,
                duration: duration,
                ease: "none",
              }
            );
        }
        animations[className].resume();
      };

      ScrollTrigger.create({
        trigger: element,
        start: "top bottom+=400",
        end: "bottom top-=400",
        markers: true,
        onEnter: startAnimation,
        onLeave: () => animations[className]?.pause(),
        onEnterBack: startAnimation,
        onLeaveBack: () => animations[className]?.pause(),
      });
    });

    window.addEventListener("mousemove", handleMouseMove);
  }, []);

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
      {showLoadingScreen && (
        <div className="loadingScreen">
          <div className="loadingContent">
            <div className="loadingTitle">
              <h1>Crystal Scrum</h1>
              <h2>by Pierre Filliau</h2>
            </div>
            <div className="launchButton">
              <img
                src={imagesStarrySky.buttonLoadingScreen}
                alt="Clic"
                onClick={handleButtonClick}
              />
            </div>
          </div>
        </div>
      )}
      <>
        <img
          className="starrySkyBg"
          src={imagesStarrySky.completeSkyBg}
          alt="Starry Sky Background"
        />
        <div className="starrySkySection">
          <div className="lettersScrumWrapper">
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
          </div>
          <div className="lettersCrystalWrapper">
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
          <div className="fogsWrapper">
            {fogs.map((className, index) => (
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
          <div className="planetsWrapper">
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
          </div>
          <div className="bigPlanetContainer">
            <div className="bigPlanetWrapper">
              <img
                className="bigPlanet"
                src={bigPlanetImage}
                alt="Big Planet"
              />
            </div>
          </div>

          <div className="spaceShipsWrapper">
            {spaceshipGroups.map((group, groupIndex) =>
              group.map((className, index) => (
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
              ))
            )}
            {spaceStations.map((className, index) => (
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
        </div>
        <div className="blueSkySection">
          {circleClouds.map((className, index) => (
            <div
              key={`${className}-${index}`}
              className={`${className}Container`}
            >
              <div className={`${className}Wrapper`}>
                <img
                  className={className}
                  src={imagesBlueSky[className]}
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
                  src={imagesBlueSky[className]}
                  alt=""
                />
              </div>
            </div>
          ))}
        </div>
      </>
    </div>
  );
};

export default StarrySky;
