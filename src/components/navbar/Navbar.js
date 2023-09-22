import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import "./Navbar.css";
import importedOlivinePositions from "./olivinePositions";

const Navbar = () => {
  const [olivinePositions, setOlivinePositions] = useState([]);
  const mainTimeline = useRef(null);
  const lastAnimated = useRef(0);

  useEffect(() => {
    setOlivinePositions(importedOlivinePositions);
  }, []);

  const handleMouseEnter = (e) => {
    gsap.to(e.target, { opacity: 1, duration: 0.1 });
  };

  const handleMouseLeave = (e) => {
    gsap.to(e.target, { opacity: 0.5, duration: 0.3 });
  };

  const sparkleTimeout = useRef(null);

  const sparkleEffect = () => {
    const olivines = document.querySelectorAll(".olivine");
    const olivinesArray = Array.from(olivines);

    const randomIndex = Math.floor(Math.random() * olivinesArray.length);
    const randomOlivine = olivinesArray[randomIndex];

    gsap.to(randomOlivine, {
      opacity: 1,
      duration: 0.5,
      onComplete: () => {
        gsap.to(randomOlivine, {
          opacity: 1,
          duration: 2,
          onComplete: () => {
            gsap.to(randomOlivine, {
              opacity: 0.5,
              duration: 0.5,
            });
          },
        });
      },
    });

    sparkleTimeout.current = setTimeout(sparkleEffect, 50);
  };

  const handleNavbarEnter = () => {
    mainTimeline.current = gsap.timeline();

    mainTimeline.current
      .staggerTo(".olivine", 0.3, { opacity: 0.5 }, 0.02, 0, () => {
        lastAnimated.current++;
      })
      .then(sparkleEffect);
  };

  const handleNavbarLeave = () => {
    clearTimeout(sparkleTimeout.current);

    if (mainTimeline.current) {
      gsap.killTweensOf(".olivine"); // tuer toutes les animations en cours sur .olivine
      mainTimeline.current.timeScale(2).tweenTo(lastAnimated.current * 0.02, {
        onComplete: () => {
          gsap.set(".olivine", { opacity: 0 });
        },
      });
    }
  };

  return (
    <div
      id="navbar"
      onMouseEnter={handleNavbarEnter}
      onMouseLeave={handleNavbarLeave}
    >
      <div id="navbarInner">
        <img src="/img/layers/navbar/logo.png" alt="Crystal Scrum" id="logo" />
        <div id="navItems">
          <span>Accueil</span>
          <span>À propos</span>
          <span>Contact</span>
        </div>
      </div>
      <div id="mosaicContainer">
        {olivinePositions.map((position, index) => (
          <img
            key={index}
            src={`img/layers/navbar/dunite/olivine${index + 1}.png`}
            className="olivine"
            style={{
              left: `calc(${position.left} - 3vw)`,
              top: `calc(${position.top} - 3vw)`,
              width: position.width,
              height: position.height,
              opacity: 0,
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        ))}
      </div>
    </div>
  );
};

export default Navbar;
