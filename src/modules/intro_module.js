import ranniWelcome from "/ressources/audio/ranniWelcome.mp3";
import audioTheme from "/ressources/audio/classictheme.mp3";

import ariesPic from "/ressources/images/aries.png";
import taurusPic from "/ressources/images/taurus.png";
import geminiPic from "/ressources/images/gemini.png";
import cancerPic from "/ressources/images/cancer.png";
import leoPic from "/ressources/images/leo.png";
import virgoPic from "/ressources/images/virgo.png";
import libraPic from "/ressources/images/libra.png";
import scorpioPic from "/ressources/images/scorpio.png";
import sagittariusPic from "/ressources/images/sagittarius.png";
import capricornPic from "/ressources/images/capricorn.png";
import aquariusPic from "/ressources/images/aquarius.png";
import piscesPic from "/ressources/images/pisces.png";

let factionChoice;

// document.addEventListener('DOMContentLoaded', () => {});
const factionImage = document.querySelector(".factionImage");

const header = document.querySelector("header");
const playGround = document.querySelector("#playGround");
const dialogIntro = document.querySelector(".introDialog");

const introPanel = document.querySelector(".introPanel");
const joinButton = document.querySelector(".introPanel button");

const zodiacChoice = document.querySelector(".zodiacChoice");
const firstSixSigns = Array.from(
  document.querySelector(".zodiacChoice div:nth-Child(1)").children
);
const secondSixSigns = Array.from(
  document.querySelector(".zodiacChoice div:nth-Child(3)").children
);
const allSigns = [...firstSixSigns, ...secondSixSigns];

const anAudio = new Audio(ranniWelcome);
const themeAudio = new Audio(audioTheme);

joinButton.addEventListener("click", () => {
  introPanel.style.display = "none";
  zodiacChoice.style.display = "flex";
  anAudio.play();
  // themeAudio.play();
});

allSigns.forEach((image, index) => {
  image.addEventListener("click", (event) => {
    switch (index) {
      case 0:
        factionChoice = "aries";
        factionImage.src = ariesPic;
        break;
      case 1:
        factionChoice = "taurus";
        factionImage.src = taurusPic;
        break;
      case 2:
        factionChoice = "gemini";
        factionImage.src = geminiPic;
        break;
      case 3:
        factionChoice = "cancer";
        factionImage.src = cancerPic;
        break;
      case 4:
        factionChoice = "leo";
        factionImage.src = leoPic;
        break;
      case 5:
        factionChoice = "virgo";
        factionImage.src = virgoPic;
        break;
      case 6:
        factionChoice = "libra";
        factionImage.src = libraPic;
        break;
      case 7:
        factionChoice = "scorpio";
        factionImage.src = scorpioPic;
        break;
      case 8:
        factionChoice = "sagittarius";
        factionImage.src = sagittariusPic;
        break;
      case 9:
        factionChoice = "capricorn";
        factionImage.src = capricornPic;
        break;
      case 10:
        factionChoice = "aquarius";
        factionImage.src = aquariusPic;
        break;
      case 11:
        factionChoice = "pisces";
        factionImage.src = piscesPic;
        break;
    }

    header.style.display = "grid";
    playGround.style.display = "block";

    // dialogIntro.style.display = 'none';
    zodiacChoice.style.display = "none";
    dialogIntro.close();
  });
});

// (function introIIFE() {

// })();
