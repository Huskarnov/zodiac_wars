import { users } from './users_module';
import { stars, selectedStar, selectedConstellation } from './stars_module';

export { startBattleLoop };

const battleStar = document.querySelector('#battleStar');
const dominion = document.querySelector('#dominion');
const defenderName = document.querySelector('#defender > h4');
const defenderHp = document.querySelector('#defenderHp');
const defenderDmg = document.querySelector('#defenderDmg');

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
  //   console.log(stars);
  //   console.log(selectedConstellation);
  //   console.log(stars[selectedConstellation][selectedStar].name);
  battleStar.textContent = stars[selectedConstellation][selectedStar].name;
  dominion.textContent = stars[selectedConstellation][selectedStar].defending;
  defenderName.textContent =
    stars[selectedConstellation][selectedStar].defending;
  defenderHp.textContent =
    stars[selectedConstellation][selectedStar].defendingHealth;
  defenderDmg.textContent =
    stars[selectedConstellation][selectedStar].defendingDamage;

  attackerName.textContent =
    stars[selectedConstellation][selectedStar].attacking;
  attackingHp.textContent =
    stars[selectedConstellation][selectedStar].attackingHealth;
  attackingDmg.textContent =
    stars[selectedConstellation][selectedStar].attackingDamage;

  if (stars[selectedConstellation][selectedStar].peace) {
    summonEmpowerButton.textContent = 'Summon Avatar';
  } else {
    summonEmpowerButton.textContent = 'Empower Avatar';
  }

  //   hpValue.textContent = 'xxx';
  //   dmgValue.textContent = 'xxx';
}

function startBattleLoop() {
  const battleInterfaceLoop = setInterval(() => {
    setBattleInterface();
  }, 100);
}
