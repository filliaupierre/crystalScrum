import React, { useEffect } from "react";
import gsap from "gsap";
import "./Navbar.css";

const Navbar = () => {
  useEffect(() => {
    const navbar = document.getElementById("navbar");
    const mosaicContainer = document.getElementById("mosaicContainer");
    mosaicContainer.style.opacity = 0; // start as invisible

    for (let i = 1; i <= 51; i++) {
      const imgElement = document.createElement("img");
      imgElement.src = `img/layers/navbar/dunite/olivine${i}.png`;
      imgElement.className = "olivine";
      imgElement.style.left = `${Math.random() * 100}vw`;
      imgElement.style.top = `${Math.random() * 60}px`;
      imgElement.style.opacity = 0; // Start as invisible

      // Mouse events for individual olivine
      imgElement.addEventListener("mouseenter", () => {
        gsap.to(imgElement, { opacity: 1, duration: 0.1 });
      });

      imgElement.addEventListener("mouseleave", () => {
        gsap.to(imgElement, { opacity: 0.5, duration: 0.3 });
      });

      mosaicContainer.appendChild(imgElement);
    }

    // Mouse events for navbar
    navbar.addEventListener("mouseenter", () => {
      gsap.to(".olivine", { opacity: 0.5, duration: 0.3 });
      gsap.to(mosaicContainer, { opacity: 1, duration: 0.3 });
    });

    navbar.addEventListener("mouseleave", () => {
      gsap.to(".olivine", { opacity: 0, duration: 0.3 });
      gsap.to(mosaicContainer, { opacity: 0, duration: 0.3 });
    });

    return () => {
      navbar.removeEventListener("mouseenter", () => {});
      navbar.removeEventListener("mouseleave", () => {});
    };
  }, []);

  return (
    <div id="navbar">
      <div id="navbarInner">
        <div id="logo">Votre Logo Ici</div>
        <div id="navItems">
          <span>Accueil</span>
          <span>À propos</span>
          <span>Contact</span>
        </div>
      </div>
      <div id="mosaicContainer"></div>
    </div>
  );
};

export default Navbar;
