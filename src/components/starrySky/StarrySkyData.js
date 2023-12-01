// Importation des images
import starrySkyBg from "./assets/starrySkyBg.png";
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
import bigPlanet from "./assets/planets/bigPlanet.png";

// Exportation des images et des données pour les éléments animés
export const images = {
  starrySkyBg,
  scrumS,
  scrumC,
  scrumR,
  scrumU,
  scrumM,
  crystalC,
  crystalR,
  crystalY,
  crystalS,
  crystalT,
  crystalA,
  crystalL,
  asteroides1,
  asteroides2,
  asteroides3,
  blackhole1,
  blackhole2,
  blackhole3,
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
  rings1,
  rings2,
  rings3,
  rings4,
  bigPlanet,
};

// Configuration des éléments pour les animations de parallaxe
export const elementsData = [
  {
    className: "bigPlanet",
    rotationSpeed: 60, // vitesse de rotation
    scrollSpeed: -2, // vitesse de défilement pour la parallaxe verticale
    parallaxStrength: 0.05, // force de la parallaxe avec le mouvement de la souris
  },
  // {
  //   className: "test",
  //   rotationSpeed: 60, // vitesse de rotation
  //   scrollSpeed: -5, // vitesse de défilement pour la parallaxe verticale
  //   parallaxStrength: 0.05, // force de la parallaxe avec le mouvement de la souris
  // },
];

// Noms des classes pour les lettres et autres éléments
export const scrumLetters = ["S", "C", "R", "U", "M"].map(
  (letter) => `scrum${letter}`
);
export const crystalLetters = ["C", "R", "Y", "S", "T", "A", "L"].map(
  (letter) => `crystal${letter}`
);
export const asteroides = ["asteroides1", "asteroides2", "asteroides3"];
export const asteroidesClones = [
  "asteroides1-clone",
  "asteroides2-clone",
  "asteroides3-clone",
];
export const blackholes = ["blackhole1", "blackhole2", "blackhole3"];
export const planets = [
  "planet1",
  "planet2",
  "planet3",
  "planet4",
  "planet5",
  "planet6",
  "planet7",
  "planet8",
  "planet9",
  "planet10",
  "planet11",
];
export const rings = ["rings1", "rings2", "rings3", "rings4"];
