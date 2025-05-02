export { stars, startCombat };

let stars = {
  polaris: {
    name: 'polaris',
    peace: false,
    element: document.querySelector('#polaris'),
    defending: 'aries',
    defendingAvatar: {
      health: 100,
      damage: 15,
    },
    attacking: 'virgo',
    attackingAvatar: {
      health: 210,
      damage: 10,
    },
  },
  vega: {
    name: 'vega',
    peace: false,
    element: document.querySelector('#vega'),
    defending: 'taurus',
    defendingAvatar: {
      health: 130,
      damage: 15,
    },
    attacking: 'scorpio',
    attackingAvatar: {
      health: 310,
      damage: 10,
    },
  },
};
// stars.array.forEach((star) => {
//   const starElement = star.element;
//   starElement.addEventListener('click', () => {});
// });

// setInterval(() => {
//   stars.polaris.element.style.backgroundColor = 'var(--aries);';
// }, 1000);

const startCombat = function () {
  if (this.peace === true) {
    return;
  } else {
    let whoAttacks = 'a';
    let combatLoop = setInterval(() => {
      if (
        this.defendingAvatar.health > 0 &&
        this.attackingAvatar.health > 0 &&
        this.peace == false
      ) {
        if (whoAttacks === 'a') {
          this.defendingAvatar.health -= this.attackingAvatar.damage;
          console.log(`defenders health: ${this.defendingAvatar.health}`);
          whoAttacks = 'b';
          combatEnd.call(stars.polaris);
        } else {
          this.attackingAvatar.health -= this.defendingAvatar.damage;
          console.log(`attacking health: ${this.attackingAvatar.health}`);
          whoAttacks = 'a';
          combatEnd.call(stars.polaris);
        }

        function combatEnd() {
          if (
            this.defendingAvatar.health <= 0 ||
            this.attackingAvatar.health <= 0
          ) {
            this.peace = true;
            if (this.defendingAvatar.health <= 0) {
              // attacker wins
              this.defending = this.attacking;
              this.defendingAvatar = this.attackingAvatar;
              console.log(
                `fight over || ${this.defending} now controls ${this.name}`
              );
            } else if (this.attackingAvatar.health <= 0) {
              // defender wins
              console.log(
                `fight over || ${this.defending} still controls ${this.name}`
              );
            }
            console.log(
              `New controller: ${this.defending}, health: ${this.defendingAvatar.health}, damage: ${this.defendingAvatar.damage}`
            );
            clearInterval(combatLoop);
            clearInterval(fustionLoop);
          }
        }
      }
    }, 100);
  }
};

let fustionLoop = setInterval(() => {
  stars.polaris.defendingAvatar.health += 5;
}, 80);

// combat.call(stars.polaris);
