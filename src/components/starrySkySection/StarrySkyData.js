// Importation des images
import completeSkyBg from "./assets/starrySkyAssets/completeSkyBg.png";
import scrumS from "./assets/starrySkyAssets/letters/scrumS.png";
import scrumC from "./assets/starrySkyAssets/letters/scrumC.png";
import scrumR from "./assets/starrySkyAssets/letters/scrumR.png";
import scrumU from "./assets/starrySkyAssets/letters/scrumU.png";
import scrumM from "./assets/starrySkyAssets/letters/scrumM.png";
import crystalC from "./assets/starrySkyAssets/letters/crystalC.png";
import crystalR from "./assets/starrySkyAssets/letters/crystalR.png";
import crystalY from "./assets/starrySkyAssets/letters/crystalY.png";
import crystalS from "./assets/starrySkyAssets/letters/crystalS.png";
import crystalT from "./assets/starrySkyAssets/letters/crystalT.png";
import crystalA from "./assets/starrySkyAssets/letters/crystalA.png";
import crystalL from "./assets/starrySkyAssets/letters/crystalL.png";
import asteroides1 from "./assets/starrySkyAssets/asteroides1.png";
import asteroides2 from "./assets/starrySkyAssets/asteroides2.png";
import asteroides3 from "./assets/starrySkyAssets/asteroides3.png";
import blackhole2 from "./assets/starrySkyAssets/blackhole2.png";
import blackhole3 from "./assets/starrySkyAssets/blackhole3.png";
import planet1 from "./assets/starrySkyAssets/planets/planet1.png";
import planet2 from "./assets/starrySkyAssets/planets/planet2.png";
import planet3 from "./assets/starrySkyAssets/planets/planet3.png";
import planet4 from "./assets/starrySkyAssets/planets/planet4.png";
import planet5 from "./assets/starrySkyAssets/planets/planet5.png";
import planet6 from "./assets/starrySkyAssets/planets/planet6.png";
import planet7 from "./assets/starrySkyAssets/planets/planet7.png";
import planet8 from "./assets/starrySkyAssets/planets/planet8.png";
import planet9 from "./assets/starrySkyAssets/planets/planet9.png";
import planet10 from "./assets/starrySkyAssets/planets/planet10.png";
import planet11 from "./assets/starrySkyAssets/planets/planet11.png";
import rings1 from "./assets/starrySkyAssets/rings1.png";
import rings2 from "./assets/starrySkyAssets/rings2.png";
import rings3 from "./assets/starrySkyAssets/rings3.png";
import rings4 from "./assets/starrySkyAssets/rings4.png";
import bigPlanet from "./assets/starrySkyAssets/planets/bigPlanet.png";
import buttonLoadingScreen from "./assets/starrySkyAssets/buttonLoadingScreen.png";
import fog1 from "./assets/starrySkyAssets/fog/fogWCr.png";
import fog2 from "./assets/starrySkyAssets/fog/fogWinter.png";
import fog3 from "./assets/starrySkyAssets/fog/fogWScr.png";
import fog4 from "./assets/starrySkyAssets/fog/fogWalone.png";
import fog5 from "./assets/starrySkyAssets/fog/fogWalone.png";
import fog6 from "./assets/starrySkyAssets/fog/fogWalone.png";

// Exportation des images et des données pour les éléments animés dans la section starrySky
export const imagesStarrySky = {
  completeSkyBg,
  buttonLoadingScreen,
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
  fog1,
  fog2,
  fog3,
  fog4,
  fog5,
  fog6,
};

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
export const blackholes = ["blackhole2", "blackhole3"];
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

export const fogs = ["fog1", "fog2", "fog3", "fog4", "fog5", "fog6"];
