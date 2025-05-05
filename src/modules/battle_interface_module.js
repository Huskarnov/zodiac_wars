const battleStar = document.querySelector('#battleStar');
const dominion = document.querySelector('#dominion');
const defenderName = document.querySelector('#defender > h4');
const defenderHp = document.querySelector('#defenderHp');
const defenderDmg = document.querySelector('#defenderDmg');

const attackerDmg = document.querySelector('#attacker > h4');
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

function setBattleInterface() {
  battleStar;
  dominion;
  defenderName;
  defenderHp;
  defenderDmg;

  attackerDmg;
  attackingHp;
  attackingDmg;

  summonEmpowerButton;
  hpValue;
  dmgValue;
}
