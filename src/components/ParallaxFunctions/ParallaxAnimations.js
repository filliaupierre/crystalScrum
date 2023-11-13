import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const parallaxAnimations = (elementsData) => {
  const lastScrollYPositions = {};
  let mouseMoveActive = true;

  // Initialisation des positions de défilement pour chaque élément
  elementsData.forEach((element) => {
    lastScrollYPositions[element.className] = 0;
  });

  // Animation de rotation
  elementsData.forEach((element) => {
    if (element.rotationSpeed) {
      console.log(`Applying rotation to ${element.className}`);
      gsap.to(`.${element.className}`, {
        rotation: 360,
        duration: element.rotationSpeed,
        repeat: -1,
        ease: "linear",
      });
    }

    // Parallaxe verticale avec ScrollTrigger
    if (element.scrollSpeed) {
      console.log(
        `[parallaxAnimations] Setting up ScrollTrigger verticale for ${element.className}`
      );
      ScrollTrigger.create({
        trigger: `.${element.className}`,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          console.log(`Scrolling: ${element.className}`);
          const scrollPosition =
            self.progress * (window.innerHeight * element.scrollSpeed);
          lastScrollYPositions[element.className] = scrollPosition;
          gsap.to(`.${element.className}`, {
            y: scrollPosition,
            overwrite: "auto",
          });
          console.log(
            `[parallaxAnimations] ${element.className} - Scroll Position: ${scrollPosition}px`
          );
        },
      });
    }
  });

  // Parallaxe avec mouvement de la souris
  const handleMouseMove = (event) => {
    if (!mouseMoveActive) return;
    {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const posX = (event.clientX / viewportWidth - 0.5) * viewportWidth * 2;
      const posY = (event.clientY / viewportHeight - 0.5) * viewportHeight * 2;

      console.log(`Mouse position: X: ${posX}, Y: ${posY}`);
      elementsData.forEach((element) => {
        if (element.parallaxStrength) {
          const finalPosX = posX * element.parallaxStrength;
          const finalPosY =
            posY * element.parallaxStrength +
            lastScrollYPositions[element.className];
          console.log(
            `Applying parallax to ${element.className}: X: ${finalPosX}, Y: ${finalPosY}`
          );
          gsap.to(`.${element.className}`, {
            x: finalPosX,
            y: finalPosY,
            ease: "none",
            overwrite: "auto",
          });
        }
      });
    }
  };

  window.addEventListener("mousemove", handleMouseMove);

  // Fonction de nettoyage des animations et écouteurs d'événements
  const cleanUpAnimations = () => {
    window.removeEventListener("mousemove", handleMouseMove);
    ScrollTrigger.getAll().forEach((trigger) => {
      trigger.kill();
    });
  };

  return cleanUpAnimations;
};
