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
    let eventConstellation = event.target.constellation;
    const neighborsArray = stars[eventConstellation][starName].neighbors;
    const constellations = Object.keys(stars);

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
      let constellationOfneighbor;
      constellations.forEach((constellation) => {
        if (Object.hasOwn(stars[constellation], star)) {
          constellationOfneighbor = constellation;

          console.log(
            `the star ${star} is in the ${constellationOfneighbor} constellation`
          );
          // console.log(`${constellationOfneighbor}`);
        }
      });

      return stars[constellationOfneighbor][star].defending;
    });

    const allSuroundingDefenders = [
      ...neighboringStarDefenders,
      ...neighboringZodiacs,
      stars[eventConstellation][starName].defending, //self faction of clicked star
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
    yildun: new Star(
      'yildun',
      false,
      document.querySelector('#yildun'),
      'gemini',
      130,
      8,
      '',
      0,
      0,
      'polaris',
      'epsilon_ursae'
    ),
    epsilon_ursae: new Star(
      'epsilon_ursae',
      false,
      document.querySelector('#epsilon_ursae'),
      'gemini',
      130,
      8,
      '',
      0,
      0,
      'yildun',
      'zeta_ursae'
    ),
    zeta_ursae: new Star(
      'zeta_ursae',
      false,
      document.querySelector('#zeta_ursae'),
      'gemini',
      130,
      8,
      '',
      0,
      0,
      'epsilon_ursae',
      'kochab',
      'eta_ursae'
    ),
    eta_ursae: new Star(
      'eta_ursae',
      false,
      document.querySelector('#eta_ursae'),
      'gemini',
      130,
      8,
      '',
      0,
      0,
      'zeta_ursae',
      'pherkad'
    ),
    pherkad: new Star(
      'pherkad',
      false,
      document.querySelector('#pherkad'),
      'gemini',
      130,
      8,
      '',
      0,
      0,
      'eta_ursae',
      'kochab'
    ),
    kochab: new Star(
      'kochab',
      false,
      document.querySelector('#kochab'),
      'gemini',
      130,
      8,
      '',
      0,
      0,
      'pherkad',
      'zeta_ursae'
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
  cauda: {
    iota_serpentis: new Star(
      'iota_serpentis',
      false,
      document.querySelector('#iota_serpentis'),
      'sagittarius',
      100,
      6,
      '',
      0,
      0,
      'xi_serpentis',
      'athebyne'
    ),
    xi_serpentis: new Star(
      'xi_serpentis',
      false,
      document.querySelector('#xi_serpentis'),
      'scorpio',
      100,
      6,
      '',
      0,
      0,
      'iota_serpentis',
      'mu_serpentis'
    ),
    mu_serpentis: new Star(
      'mu_serpentis',
      false,
      document.querySelector('#mu_serpentis'),
      'scorpio',
      100,
      6,
      '',
      0,
      0,
      'xi_serpentis',
      'rho_serpentis'
    ),
    rho_serpentis: new Star(
      'rho_serpentis',
      false,
      document.querySelector('#rho_serpentis'),
      'scorpio',
      100,
      6,
      '',
      0,
      0,
      'delta_scuti',
      'mu_serpentis',
      'sigma_serpentis'
    ),
    sigma_serpentis: new Star(
      'sigma_serpentis',
      false,
      document.querySelector('#sigma_serpentis'),
      'scorpio',
      100,
      6,
      '',
      0,
      0,
      'rho_serpentis',
      'libra',
      'delta_serpentis'
    ),
  },
  caput: {
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
      'tyl',
      'gamma_serpentis'
    ),
    beta_serpentis: new Star(
      'beta_serpentis',
      false,
      document.querySelector('#beta_serpentis'),
      'virgo',
      100,
      6,
      '',
      0,
      0,
      'unukalhai',
      'gamma_serpentis'
    ),
    gamma_serpentis: new Star(
      'gamma_serpentis',
      false,
      document.querySelector('#gamma_serpentis'),
      'virgo',
      100,
      6,
      '',
      0,
      0,
      'beta_serpentis',
      'delta_serpentis'
    ),
    delta_serpentis: new Star(
      'delta_serpentis',
      false,
      document.querySelector('#delta_serpentis'),
      'virgo',
      100,
      6,
      '',
      0,
      0,
      'gamma_serpentis',
      'beta_berenices',
      'epsilon_serpentis',
      'sigma_serpentis'
    ),
    unukalhai: new Star(
      'unukalhai',
      false,
      document.querySelector('#unukalhai'),
      'libra',
      100,
      6,
      '',
      0,
      0,
      'tyl',
      'gamma_serpentis'
    ),
    epsilon_serpentis: new Star(
      'epsilon_serpentis',
      false,
      document.querySelector('#epsilon_serpentis'),
      'virgo',
      100,
      6,
      '',
      0,
      0,
      'delta_serpentis',
      'zeta_serpentis',
      'theta_serpentis'
    ),
    theta_serpentis: new Star(
      'theta_serpentis',
      false,
      document.querySelector('#theta_serpentis'),
      'virgo',
      100,
      6,
      '',
      0,
      0,
      'epsilon_serpentis',
      'eta_serpentis'
    ),
    eta_serpentis: new Star(
      'eta_serpentis',
      false,
      document.querySelector('#eta_serpentis'),
      'virgo',
      100,
      6,
      '',
      0,
      0,
      'theta_serpentis',
      'zeta_serpentis',
      'libra'
    ),
    zeta_serpentis: new Star(
      'zeta_serpentis',
      false,
      document.querySelector('#zeta_serpentis'),
      'virgo',
      100,
      6,
      '',
      0,
      0,
      'eta_serpentis',
      'epsilon_serpentis',
      'virgo'
    ),
  },
  berenices: {
    beta_berenices: new Star(
      'beta_berenices',
      false,
      document.querySelector('#beta_berenices'),
      'virgo',
      100,
      6,
      '',
      0,
      0,
      'delta_serpentis',
      'alpha_berenices'
    ),
    alpha_berenices: new Star(
      'alpha_berenices',
      false,
      document.querySelector('#alpha_berenices'),
      'leo',
      100,
      6,
      '',
      0,
      0,
      'beta_berenices',
      'gamma_berenices',
      'alpha_leonis_minoris'
    ),
    gamma_berenices: new Star(
      'gamma_berenices',
      false,
      document.querySelector('#gamma_berenices'),
      'virgo',
      100,
      6,
      '',
      0,
      0,
      'alpha_berenices'
    ),
  },
};

// stars.vega.startCombat();
// stars.polaris.startCombat();

(function () {
  const constellations = Object.keys(stars);

  universeStars.forEach((starElement) => {
    starElement.addEventListener('mouseover', (event) => {
      const starId = event.currentTarget.id;

      console.log(`star ID ${starId}`);

      // allocate mother constellation to each star
      constellations.forEach((constellation) => {
        if (Object.hasOwn(stars[constellation], starId)) {
          stars[constellation][starId]['constellation'] = constellation;
          starElement['constellation'] = constellation;

          console.log(
            `the clicked star is in the ${stars[constellation][starId].constellation} constellation`
          );
        }
      });

      navigator.clipboard.writeText(`${event.currentTarget.id}`);
    });
  });
})();
