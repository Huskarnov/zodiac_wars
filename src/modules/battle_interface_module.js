import { users } from './users_module';
import { stars, selectedStar, selectedConstellation } from './stars_module';

export { setBattleInterface };

// --------
const battleStar = document.querySelector('#battleStar');
const dominion = document.querySelector('#dominion');

const defender = document.querySelector('#defender');
const defenderName = document.querySelector('#defender > h4');
const defenderHp = document.querySelector('#defenderHp');
const defenderDmg = document.querySelector('#defenderDmg');

const attacker = document.querySelector('#attacker');
const attackerName = document.querySelector('#attacker > h4');
const attackingHp = document.querySelector('#attackingHp');
const attackingDmg = document.querySelector('#attackingDmg');

const summonEmpowerButton = document.querySelector('#summonEmpowerButton');
const hpValue = document.querySelector('#hpValue');
const dmgValue = document.querySelector('#dmgValue');
// --------
const summonEmpower = document.querySelector('#summonEmpower');
const userPower = document.querySelector('#userPower');

summonEmpower.addEventListener('mouseenter', (event) => {
  userPower.style.visibility = 'visible';
});
summonEmpower.addEventListener('mouseleave', (event) => {
  userPower.style.visibility = 'hidden';
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
  defender.style.backgroundImage = 'url(./virgo1.jpeg)';
  // document.body.style.backgroundImage = "url('img_tree.png')";

  // switch (stars[selectedConstellation][selectedStar].defending) {
  //   case 'aries':
  //     defender.style.backgroundImage =
  //       'url(/ressources/images/avatars/virgo/virgo1.webp)';
  //     break;
  //   case 'taurus':
  //     defender.style.backgroundImage =
  //       'url(/ressources/images/avatars/virgo/taurus1.webp)';
  //     break;
  //   case 'gemini':
  //     defender.style.backgroundImage =
  //       'url(/ressources/images/avatars/virgo/taurus1.webp)';
  //     break;
  //   case 'cancer':
  //     defender.style.backgroundImage =
  //       'url(/ressources/images/avatars/virgo/taurus1.webp)';
  //     break;
  //   case 'leo':
  //     defender.style.backgroundImage =
  //       'url(/ressources/images/avatars/virgo/taurus1.webp)';
  //     break;
  //   case 'virgo':
  //     defender.style.backgroundImage =
  //       'url(./ressources/images/avatars/virgo/virgo1.webp)';
  //     break;
  //   case 'libra':
  //     defender.style.backgroundImage =
  //       'url(/ressources/images/avatars/virgo/taurus1.webp)';
  //     break;
  //   case 'scorpio':
  //     defender.style.backgroundImage =
  //       'url(/ressources/images/avatars/virgo/taurus1.webp)';
  //     break;
  //   case 'sagittarius':
  //     defender.style.backgroundImage =
  //       'url(/ressources/images/avatars/virgo/taurus1.webp)';
  //     break;
  //   case 'capricorn':
  //     defender.style.backgroundImage =
  //       'url(/ressources/images/avatars/virgo/taurus1.webp)';
  //     break;
  //   case 'aquarius':
  //     defender.style.backgroundImage =
  //       'url(/ressources/images/avatars/virgo/taurus1.webp)';
  //     break;
  //   case 'pisces':
  //     defender.style.backgroundImage =
  //       'url(/ressources/images/avatars/virgo/taurus1.webp)';
  //     break;
  //   case '':
  //     defender.style.backgroundImage =
  //       'url(/ressources/images/avatars/virgo/taurus1.webp)';
  //     break;
  // }

  if (stars[selectedConstellation][selectedStar].peace === true) {
    attacker.style.display = 'none';
  } else if (stars[selectedConstellation][selectedStar].peace === false) {
    attacker.style.display = 'flex';
  }

  battleStar.textContent = stars[selectedConstellation][selectedStar].name;
  dominion.textContent = `Dominion: ${stars[selectedConstellation][selectedStar].defending}`;
  // defenderName.textContent =
  //   stars[selectedConstellation][selectedStar].defending;
  // defenderHp.textContent =
  //   stars[selectedConstellation][selectedStar].defendingHealth;
  // defenderDmg.textContent =
  //   stars[selectedConstellation][selectedStar].defendingDamage;

  // attackerName.textContent =
  //   stars[selectedConstellation][selectedStar].attacking;
  // attackingHp.textContent =
  //   stars[selectedConstellation][selectedStar].attackingHealth;
  // attackingDmg.textContent =
  //   stars[selectedConstellation][selectedStar].attackingDamage;

  if (
    stars[selectedConstellation][selectedStar].defending ===
      users.me.zodiacSign ||
    stars[selectedConstellation][selectedStar].attacking === users.me.zodiacSign
  ) {
    summonEmpowerButton.textContent = 'Empower our Avatar';
  } else {
    summonEmpowerButton.textContent = 'Summon our Avatar';
  }

  hpValue.textContent = users.me.health;
  dmgValue.textContent = users.me.damage;
}

// function startBattleLoop() {
//   const battleInterfaceLoop = setInterval(() => {
//     setBattleInterface();
//   }, 100);
// }
