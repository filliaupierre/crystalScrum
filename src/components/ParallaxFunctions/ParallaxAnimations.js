import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Créez un objet pour stocker la dernière position de défilement pour chaque élément
let lastScrollYPositions = {};

export const parallaxAnimations = (elementsData) => {
  // Initialisez lastScrollYPositions pour chaque élément
  elementsData.forEach((element) => {
    lastScrollYPositions[element.className] = 0;
  });

  // Enregistrez les animations et les triggers de défilement
  elementsData.forEach((element) => {
    // Animation de rotation
    if (element.rotationSpeed) {
      gsap.to(`.${element.className}`, {
        rotation: 360,
        duration: element.rotationSpeed,
        repeat: -1,
        ease: "none",
      });
    }

    // ScrollTrigger pour la parallaxe verticale
    if (element.scrollSpeed) {
      ScrollTrigger.create({
        trigger: `.${element.className}`,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const yPos = self.progress * element.scrollSpeed;
          lastScrollYPositions[element.className] = yPos; // Mettez à jour la position de défilement
          gsap.to(`.${element.className}`, { y: yPos });
        },
      });
    }
  });

  // Gestionnaire d'événements pour la parallaxe avec la souris
  const handleMouseMove = (event) => {
    const posX = (event.clientX / window.innerWidth - 0.5) * 100;
    const posY = (event.clientY / window.innerHeight - 0.5) * 100;

    elementsData.forEach((element) => {
      if (element.parallaxStrength) {
        const finalPosY =
          posY * element.parallaxStrength +
          lastScrollYPositions[element.className];
        gsap.to(`.${element.className}`, {
          x: posX * element.parallaxStrength,
          y: finalPosY,
          ease: "none",
          overwrite: "auto",
        });
      }
    });
  };

  window.addEventListener("mousemove", handleMouseMove);

  // Fonction de nettoyage
  const cleanUpAnimations = () => {
    window.removeEventListener("mousemove", handleMouseMove);
    ScrollTrigger.getAll().forEach((trigger) => {
      elementsData.forEach((element) => {
        if (trigger.vars.trigger === `.${element.className}`) {
          trigger.kill();
        }
      });
    });
    // Réinitialisez lastScrollYPositions pour éviter des références obsolètes
    lastScrollYPositions = {};
  };

  return cleanUpAnimations;
};
