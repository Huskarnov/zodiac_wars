import { users } from "./users_module";
import { stars, selectedStar, selectedConstellation } from "./stars_module";

import aries from "/ressources/images/avatars/aries.webp";
import taurus from "/ressources/images/avatars/taurus.webp";
import gemini from "/ressources/images/avatars/gemini.webp";
import cancer from "/ressources/images/avatars/cancer.webp";
import leo from "/ressources/images/avatars/leo.webp";
import virgo from "/ressources/images/avatars/virgo.webp";
import libra from "/ressources/images/avatars/libra.webp";
import scorpio from "/ressources/images/avatars/scorpio.webp";
import sagittarius from "/ressources/images/avatars/sagittarius.webp";
import capricorn from "/ressources/images/avatars/capricorn.webp";
import aquarius from "/ressources/images/avatars/aquarius.webp";
import pisces from "/ressources/images/avatars/pisces.webp";

export { setBattleInterface };

// --------
const battleDialog = document.querySelector("#battleDialog");
const battleStar = document.querySelector("#battleStar");
const dominion = document.querySelector("#dominion");

const defender = document.querySelector("#defender");
const defenderName = document.querySelector("#defender > h4");
const defenderHp = document.querySelector("#defenderHp");
const defenderDmg = document.querySelector("#defenderDmg");

const attacker = document.querySelector("#attacker");
const attackerName = document.querySelector("#attacker > h4");
const attackingHp = document.querySelector("#attackingHp");
const attackingDmg = document.querySelector("#attackingDmg");

const summonEmpowerButton = document.querySelector("#summonEmpowerButton");
const soulsAmount = document.querySelector("#soulsAmount");
const hpValue = document.querySelector("#hpValue");
const dmgValue = document.querySelector("#dmgValue");
// --------
const summonEmpower = document.querySelector("#summonEmpower");
const userPower = document.querySelector("#userPower");

summonEmpower.addEventListener("mouseenter", (event) => {
  userPower.style.visibility = "visible";
});
summonEmpower.addEventListener("mouseleave", (event) => {
  userPower.style.visibility = "hidden";
});
//   starName,
//   peace,
//   defending,
//   defendingHealth,
//   defendingDamage,
//   attacking,
//   attackingHealth,
//   attackingDamage
function setBattleInterface() {
  switch (stars[selectedConstellation][selectedStar].defending) {
    case "aries":
      defender.style.backgroundImage = `url(${aries})`;
      break;
    case "taurus":
      defender.style.backgroundImage = `url(${taurus})`;
      break;
    case "gemini":
      defender.style.backgroundImage = `url(${gemini})`;
      break;
    case "cancer":
      defender.style.backgroundImage = `url(${cancer})`;
      break;
    case "leo":
      defender.style.backgroundImage = `url(${leo})`;
      break;
    case "virgo":
      defender.style.backgroundImage = `url(${virgo})`;
      break;
    case "libra":
      defender.style.backgroundImage = `url(${libra})`;
      break;
    case "scorpio":
      defender.style.backgroundImage = `url(${scorpio})`;
      break;
    case "sagittarius":
      defender.style.backgroundImage = `url(${sagittarius})`;
      break;
    case "capricorn":
      defender.style.backgroundImage = `url(${capricorn})`;
      break;
    case "aquarius":
      defender.style.backgroundImage = `url(${aquarius})`;
      break;
    case "pisces":
      defender.style.backgroundImage = `url(${pisces})`;
      break;
  }
  switch (stars[selectedConstellation][selectedStar].attacking) {
    case "aries":
      attacker.style.backgroundImage = `url(${aries})`;
      break;
    case "taurus":
      attacker.style.backgroundImage = `url(${taurus})`;
      break;
    case "gemini":
      attacker.style.backgroundImage = `url(${gemini})`;
      break;
    case "cancer":
      attacker.style.backgroundImage = `url(${cancer})`;
      break;
    case "leo":
      attacker.style.backgroundImage = `url(${leo})`;
      break;
    case "virgo":
      attacker.style.backgroundImage = `url(${virgo})`;
      break;
    case "libra":
      attacker.style.backgroundImage = `url(${libra})`;
      break;
    case "scorpio":
      attacker.style.backgroundImage = `url(${scorpio})`;
      break;
    case "sagittarius":
      attacker.style.backgroundImage = `url(${sagittarius})`;
      break;
    case "capricorn":
      attacker.style.backgroundImage = `url(${capricorn})`;
      break;
    case "aquarius":
      attacker.style.backgroundImage = `url(${aquarius})`;
      break;
    case "pisces":
      attacker.style.backgroundImage = `url(${pisces})`;
      break;
  }

  if (stars[selectedConstellation][selectedStar].peace === true) {
    attacker.style.display = "none";
  } else if (stars[selectedConstellation][selectedStar].peace === false) {
    attacker.style.display = "flex";
  }

  battleStar.textContent = stars[selectedConstellation][selectedStar].name;
  dominion.textContent = `Dominion: ${stars[selectedConstellation][selectedStar].defending}`;

  // defenderName.textContent =
  //   stars[selectedConstellation][selectedStar].defending;
  // defenderName.textContent =
  //   stars[selectedConstellation][selectedStar].defending;

  defenderHp.textContent =
    stars[selectedConstellation][selectedStar].defendingAvatar.health;
  defenderDmg.textContent =
    stars[selectedConstellation][selectedStar].defendingAvatar.damage;

  // attackerName.textContent =
  //   stars[selectedConstellation][selectedStar].attacking;
  attackingHp.textContent =
    stars[selectedConstellation][selectedStar].attackingAvatar.health;
  attackingDmg.textContent =
    stars[selectedConstellation][selectedStar].attackingAvatar.damage;

  if (
    stars[selectedConstellation][selectedStar].defending ===
      users.me.zodiacSign ||
    stars[selectedConstellation][selectedStar].attacking === users.me.zodiacSign
  ) {
    summonEmpowerButton.textContent = "Empower ⮉";
    summonEmpowerButton.style.backgroundColor = "#024608c5";
  } else {
    summonEmpowerButton.textContent = "Summon Avatar ⮋";
    summonEmpowerButton.style.backgroundColor = "#c70808c5";
  }

  hpValue.textContent = users.me.health;
  dmgValue.textContent = users.me.damage;
}

summonEmpowerButton.addEventListener("click", () => {
  if (users.me.souls > 0) {
    if (
      stars[selectedConstellation][selectedStar].peace === true &&
      stars[selectedConstellation][selectedStar].defending !==
        users.me.zodiacSign
    ) {
      stars[selectedConstellation][selectedStar].attacking =
        users.me.zodiacSign;
    }

    stars[selectedConstellation][selectedStar].empowerAvatar(1);
    users.me.souls -= 1;
    soulsAmount.textContent = users.me.souls;

    if (stars[selectedConstellation][selectedStar].peace === true) {
      stars[selectedConstellation][selectedStar].peace = false;
      stars[selectedConstellation][selectedStar].startCombat();
    }
  } else {
    alert("You need more souls");
  }
});

battleDialog.addEventListener("click", (event) => {
  if (event.target == event.currentTarget) {
    event.currentTarget.close();
  }
});
