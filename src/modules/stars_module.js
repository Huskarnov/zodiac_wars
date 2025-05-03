export { stars };
import { users } from './users_module';
// users.me.zodiacSign

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
    ...neighbors
  ) {
    this.name = name;
    this.peace = peace;
    this.element = element;

    this.element.addEventListener('click', (event) => {
      this.handleClicOnStar(event);
    });

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
    this.neighbors = neighbors;
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

  handleClicOnStar(event) {
    const starName = event.target.id;
    const neighborsArray = stars.scutum[starName].neighbors;

    const neighboringStars = neighborsArray.filter((item) => {
      if (
        item !== 'aries' &&
        item !== 'taurus' &&
        item !== 'gemini' &&
        item !== 'cancer' &&
        item !== 'leo' &&
        item !== 'virgo' &&
        item !== 'libra' &&
        item !== 'scorpio' &&
        item !== 'sagittarius' &&
        item !== 'capricorn' &&
        item !== 'aquarius' &&
        item !== 'pisces'
      ) {
        return true;
      } else {
        return false;
      }
    });

    const neighboringZodiacs = neighborsArray.filter((item) => {
      if (
        item == 'aries' ||
        item == 'taurus' ||
        item == 'gemini' ||
        item == 'cancer' ||
        item == 'leo' ||
        item == 'virgo' ||
        item == 'libra' ||
        item == 'scorpio' ||
        item == 'sagittarius' ||
        item == 'capricorn' ||
        item == 'aquarius' ||
        item == 'pisces'
      ) {
        return true;
      } else {
        return false;
      }
    });

    const neighboringStarDefenders = neighboringStars.map((star) => {
      return stars.scutum[star].defending;
    });

    const allSuroundingDefenders = [
      ...neighboringStarDefenders,
      ...neighboringZodiacs,
      stars.scutum[starName].defending,
    ];

    const currentUserSign = users.me.zodiacSign;

    const canDeploy = allSuroundingDefenders.includes(currentUserSign);

    if (canDeploy) {
      console.log(`You can deploy ${canDeploy}`);
    } else {
      console.log(`You can NOT deploy ${canDeploy}`);
    }
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

  scutum: {
    alpha_scuti: new Star(
      'alpha_scuti',
      false,
      document.querySelector('#alpha_scuti'),
      'sagittarius',
      100,
      6,
      '',
      0,
      0,
      'delta_lyrae',
      'gamma_scuti',
      'beta_scuti',
      'sagittarius'
    ),
    beta_scuti: new Star(
      'beta_scuti',
      false,
      document.querySelector('#beta_scuti'),
      'scorpio',
      100,
      6,
      '',
      0,
      0,
      'alpha_scuti',
      'delta_scuti',
      'scorpio'
    ),
    delta_scuti: new Star(
      'delta_scuti',
      false,
      document.querySelector('#delta_scuti'),
      'scorpio',
      100,
      6,
      '',
      0,
      0,
      'beta_scuti',
      'gamma_scuti',
      'rho_serpentis'
    ),
    gamma_scuti: new Star(
      'gamma_scuti',
      false,
      document.querySelector('#gamma_scuti'),
      'sagittarius',
      100,
      6,
      '',
      0,
      0,
      'delta_scuti',
      'alpha_scuti'
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
