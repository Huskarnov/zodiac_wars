export { stars };

const universe = document.querySelector('.universe');
const universeStars = Array.from(universe.children);

class Star {
  constructor(
    name,
    peace,
    element,
    defending,
    defendingHealth,
    defendingDamage,
    attacking,
    attackingHealth,
    attackingDamage,
    // adjacentHomeworlds,
    ...adjacentStars
  ) {
    this.name = name;
    this.peace = peace;
    this.element = element;
    this.defending = defending;
    this.defendingAvatar = {
      health: defendingHealth,
      damage: defendingDamage,
    };
    this.attacking = attacking;
    this.attackingAvatar = {
      health: attackingHealth,
      damage: attackingDamage,
    };
    this.adjacentStars = adjacentStars;
  }

  startCombat() {
    if (this.peace) {
      console.log(`The system ${this.name} is at peace, no combat`);
      return;
    }
    let whoAttacks = 'attacker';
    console.log(
      `Combat started at ${this.name} between ${this.attacking} and ${this.defending}`
    );
    this.combatLoop = setInterval(() => {
      if (
        this.defendingAvatar.health <= 0 ||
        this.attackingAvatar.health <= 0 ||
        this.peace
      ) {
        this.endCombat();
        return;
      }
      if (whoAttacks === 'attacker') {
        this.defendingAvatar.health -= this.attackingAvatar.damage;
        console.log(`defenders health: ${this.defendingAvatar.health}`);
        whoAttacks = 'defender';
      } else {
        this.attackingAvatar.health -= this.defendingAvatar.damage;
        console.log(`attackers health: ${this.attackingAvatar.health}`);
        whoAttacks = 'attacker';
      }
    }, 100);
  }
  endCombat() {
    this.peace = true;
    // attacker wins
    if (this.defendingAvatar.health <= 0) {
      console.log(`Fight over: ${this.attacking} now controls ${this.name}`);
      this.defending = this.attacking;
      this.defendingAvatar = { ...this.attackingAvatar };
    } else {
      // defender wins
      console.log(`Fight over: ${this.defending} still controls ${this.name}`);
    }
    this.element.style.backgroundColor = `var(--${this.defending})`;
    console.log(
      `Surviving avatar has: ${this.defendingAvatar.health} health, ${this.defendingAvatar.damage} damage`
    );
    if (this.combatLoop) {
      clearInterval(this.combatLoop);
      this.combatLoop = null;
    }
  }

  emporewAvatar(power) {
    if (user.zodiacSign === attacking) {
      this.attackingAvatar.health = user.health * power;
      this.attackingAvatar.damage = user.damage * power;
    } else if (user.zodiacSign === this.defending) {
      this.defendingAvatar.health = user.health * power;
      this.defendingAvatar.damage = user.damage * power;
    }
  }

  checkContact(faction) {
    const acceptedSigns = this.adjacentStars.filter((item) => {
      // if (item !== 'aries' && item !== 'taurus' etc ...)
    });
    const neighborhood = this.adjacentStars.filter((item) => {
      // if (item === 'aries' || item === 'taurus' ... etc )
    });
  }
}

// intialize;

let stars = {
  ursaMinor: {
    polaris: new Star(
      'polaris',
      false,
      document.querySelector('#polaris'),
      'gemini',
      130,
      8,
      'gemini',
      200,
      5,
      'yildun'
    ),
  },

  cauda: {
    unukalhai: new Star(
      'unukalhai',
      false,
      document.querySelector('#unukalhai'),
      'virgo',
      100,
      6,
      '',
      0,
      0,
      'beta-serpentis'
    ),
    betaSerpentis: new Star(
      'beta-serpentis',
      false,
      document.querySelector('#beta-serpentis'),
      'virgo',
      100,
      6,
      '',
      0,
      0,
      'unukalhai',
      'gamma-serpentis'
    ),
    gamma_serpentis: new Star(
      'gamma-serpentis',
      false,
      document.querySelector('#gamma-serpentis'),
      'virgo',
      100,
      6,
      '',
      0,
      0,
      'betaSerpentis',
      'deltaSerpentis'
    ),
    deltaSerpentis: new Star(
      'deltaSerpentis',
      false,
      document.querySelector('#thetaSerpentis'),
      'virgo',
      100,
      6,
      '',
      0,
      0,
      'gammaSerpentis',
      'epsilonSerpentis',
      'betaBerenices'
    ),
  },
};

// stars.vega.startCombat();
// stars.polaris.startCombat();

universeStars.forEach((starElement) => {
  starElement.addEventListener('mouseover', (event) => {
    console.log(event.currentTarget.id);
    navigator.clipboard.writeText(`${event.currentTarget.id}`);
  });
});
