export { stars, selectedStar, selectedConstellation };
import { users } from "./users_module";
import { setBattleInterface } from "./battle_interface_module";
// users.me.zodiacSign

const universe = document.querySelector(".universe");
const universeStars = Array.from(universe.children);

let selectedStar;
let selectedConstellation;

// const dialog = document.querySelector('.introDialog');
const battleDialog = document.querySelector("#battleDialog");
const battleInterface = document.querySelector("#battleInterface");

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

    this.element.addEventListener("click", (event) => {
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
    let whoAttacks = "attacker";
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
        setBattleInterface();
        return;
      }
      if (whoAttacks === "attacker") {
        this.defendingAvatar.health -= this.attackingAvatar.damage;
        console.log(`defenders health: ${this.defendingAvatar.health}`);
        whoAttacks = "defender";
        // setBattleInterface();
      } else {
        this.attackingAvatar.health -= this.defendingAvatar.damage;
        console.log(`attackers health: ${this.attackingAvatar.health}`);
        whoAttacks = "attacker";
        // setBattleInterface();
      }
      setBattleInterface();
    }, 200);
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
    this.attacking = "";
    this.attackingAvatar.health = 0;
    this.attackingAvatar.damage = 0;
    if (this.combatLoop) {
      clearInterval(this.combatLoop);
      this.combatLoop = null;
    }
  }

  empowerAvatar(power) {
    if (users.me.zodiacSign === this.attacking) {
      this.attackingAvatar.health += users.me.health * power;
      this.attackingAvatar.damage += users.me.damage * power;
    } else if (users.me.zodiacSign === this.defending) {
      this.defendingAvatar.health += users.me.health * power;
      this.defendingAvatar.damage += users.me.damage * power;
    }
    setBattleInterface();
  }

  handleClicOnStar(event) {
    const starName = event.target.id;
    let eventConstellation = event.target.constellation;
    const neighborsArray = stars[eventConstellation][starName].neighbors;
    const constellations = Object.keys(stars);

    selectedStar = starName;
    selectedConstellation = eventConstellation;
    setBattleInterface();

    console.log(
      `--------- ID: ${starName} is in ${eventConstellation}, 
      is controlled by ${stars[eventConstellation][starName].defending} ---------`
    );

    const neighboringStars = neighborsArray.filter((item) => {
      if (
        item !== "aries" &&
        item !== "taurus" &&
        item !== "gemini" &&
        item !== "cancer" &&
        item !== "leo" &&
        item !== "virgo" &&
        item !== "libra" &&
        item !== "scorpio" &&
        item !== "sagittarius" &&
        item !== "capricorn" &&
        item !== "aquarius" &&
        item !== "pisces"
      ) {
        return true;
      } else {
        return false;
      }
    });

    const neighboringZodiacs = neighborsArray.filter((item) => {
      if (
        item == "aries" ||
        item == "taurus" ||
        item == "gemini" ||
        item == "cancer" ||
        item == "leo" ||
        item == "virgo" ||
        item == "libra" ||
        item == "scorpio" ||
        item == "sagittarius" ||
        item == "capricorn" ||
        item == "aquarius" ||
        item == "pisces"
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
      stars[eventConstellation][starName].defending, //faction controlling the actual star
    ];

    const currentUserSign = users.me.zodiacSign;

    const canDeploy = allSuroundingDefenders.includes(currentUserSign);

    if (canDeploy) {
      console.log(`You can deploy ${canDeploy}`);
      battleInterface.style.display = "flex";
      battleDialog.show();
    } else {
      alert(`You a need a connected star to deploy`);
      console.log(`You can NOT deploy ${canDeploy}`);
    }
    this.startCombat();
  }
}

// intialize;

let stars = {
  ursa_minor: {
    polaris: new Star(
      "polaris",
      true,
      document.querySelector("#polaris"),
      "aries",
      130,
      8,
      "",
      0,
      0,
      "yildun"
    ),
    yildun: new Star(
      "yildun",
      true,
      document.querySelector("#yildun"),
      "aries",
      130,
      8,
      "",
      0,
      0,
      "polaris",
      "epsilon_ursae"
    ),
    epsilon_ursae: new Star(
      "epsilon_ursae",
      true,
      document.querySelector("#epsilon_ursae"),
      "aries",
      130,
      8,
      "",
      0,
      0,
      "yildun",
      "zeta_ursae"
    ),
    zeta_ursae: new Star(
      "zeta_ursae",
      true,
      document.querySelector("#zeta_ursae"),
      "aries",
      130,
      8,
      "",
      0,
      0,
      "epsilon_ursae",
      "kochab",
      "eta_ursae"
    ),
    eta_ursae: new Star(
      "eta_ursae",
      true,
      document.querySelector("#eta_ursae"),
      "libra",
      130,
      8,
      "",
      0,
      0,
      "zeta_ursae",
      "pherkad",
      "alradif"
    ),
    pherkad: new Star(
      "pherkad",
      true,
      document.querySelector("#pherkad"),
      "virgo",
      130,
      8,
      "",
      0,
      0,
      "eta_ursae",
      "kochab",
      "thuban",
      "kuma"
    ),
    kochab: new Star(
      "kochab",
      true,
      document.querySelector("#kochab"),
      "gemini",
      130,
      8,
      "",
      0,
      0,
      "pherkad",
      "zeta_ursae",
      "alkaid",
      "phi_camelopardalis"
    ),
  },

  scutum: {
    alpha_scuti: new Star(
      "alpha_scuti",
      true,
      document.querySelector("#alpha_scuti"),
      "sagittarius",
      100,
      6,
      "",
      0,
      0,
      "delta_lyrae",
      "gamma_scuti",
      "beta_scuti",
      "sagittarius"
    ),
    beta_scuti: new Star(
      "beta_scuti",
      true,
      document.querySelector("#beta_scuti"),
      "scorpio",
      100,
      6,
      "",
      0,
      0,
      "alpha_scuti",
      "delta_scuti",
      "scorpio"
    ),
    delta_scuti: new Star(
      "delta_scuti",
      true,
      document.querySelector("#delta_scuti"),
      "scorpio",
      100,
      6,
      "",
      0,
      0,
      "beta_scuti",
      "gamma_scuti",
      "rho_serpentis"
    ),
    gamma_scuti: new Star(
      "gamma_scuti",
      true,
      document.querySelector("#gamma_scuti"),
      "sagittarius",
      100,
      6,
      "",
      0,
      0,
      "delta_scuti",
      "alpha_scuti"
    ),
  },
  cauda: {
    iota_serpentis: new Star(
      "iota_serpentis",
      true,
      document.querySelector("#iota_serpentis"),
      "sagittarius",
      100,
      6,
      "",
      0,
      0,
      "xi_serpentis",
      "athebyne"
    ),
    xi_serpentis: new Star(
      "xi_serpentis",
      true,
      document.querySelector("#xi_serpentis"),
      "scorpio",
      100,
      6,
      "",
      0,
      0,
      "iota_serpentis",
      "mu_serpentis"
    ),
    mu_serpentis: new Star(
      "mu_serpentis",
      true,
      document.querySelector("#mu_serpentis"),
      "scorpio",
      100,
      6,
      "",
      0,
      0,
      "xi_serpentis",
      "rho_serpentis"
    ),
    rho_serpentis: new Star(
      "rho_serpentis",
      true,
      document.querySelector("#rho_serpentis"),
      "scorpio",
      100,
      6,
      "",
      0,
      0,
      "delta_scuti",
      "mu_serpentis",
      "sigma_serpentis"
    ),
    sigma_serpentis: new Star(
      "sigma_serpentis",
      true,
      document.querySelector("#sigma_serpentis"),
      "scorpio",
      100,
      6,
      "",
      0,
      0,
      "rho_serpentis",
      "libra",
      "delta_serpentis"
    ),
  },
  caput: {
    unukalhai: new Star(
      "unukalhai",
      true,
      document.querySelector("#unukalhai"),
      "libra",
      100,
      6,
      "",
      0,
      0,
      "tyl",
      "gamma_serpentis"
    ),
    beta_serpentis: new Star(
      "beta_serpentis",
      true,
      document.querySelector("#beta_serpentis"),
      "virgo",
      100,
      6,
      "",
      0,
      0,
      "unukalhai",
      "gamma_serpentis"
    ),
    gamma_serpentis: new Star(
      "gamma_serpentis",
      true,
      document.querySelector("#gamma_serpentis"),
      "virgo",
      100,
      6,
      "",
      0,
      0,
      "beta_serpentis",
      "delta_serpentis"
    ),
    delta_serpentis: new Star(
      "delta_serpentis",
      true,
      document.querySelector("#delta_serpentis"),
      "virgo",
      100,
      6,
      "",
      0,
      0,
      "gamma_serpentis",
      "beta_berenices",
      "epsilon_serpentis",
      "sigma_serpentis"
    ),
    epsilon_serpentis: new Star(
      "epsilon_serpentis",
      true,
      document.querySelector("#epsilon_serpentis"),
      "virgo",
      100,
      6,
      "",
      0,
      0,
      "delta_serpentis",
      "zeta_serpentis",
      "theta_serpentis"
    ),
    theta_serpentis: new Star(
      "theta_serpentis",
      true,
      document.querySelector("#theta_serpentis"),
      "virgo",
      100,
      6,
      "",
      0,
      0,
      "epsilon_serpentis",
      "eta_serpentis"
    ),
    eta_serpentis: new Star(
      "eta_serpentis",
      true,
      document.querySelector("#eta_serpentis"),
      "virgo",
      100,
      6,
      "",
      0,
      0,
      "theta_serpentis",
      "zeta_serpentis",
      "libra"
    ),
    zeta_serpentis: new Star(
      "zeta_serpentis",
      true,
      document.querySelector("#zeta_serpentis"),
      "virgo",
      100,
      6,
      "",
      0,
      0,
      "eta_serpentis",
      "epsilon_serpentis",
      "virgo"
    ),
  },
  berenices: {
    beta_berenices: new Star(
      "beta_berenices",
      true,
      document.querySelector("#beta_berenices"),
      "virgo",
      100,
      6,
      "",
      0,
      0,
      "delta_serpentis",
      "alpha_berenices"
    ),
    alpha_berenices: new Star(
      "alpha_berenices",
      true,
      document.querySelector("#alpha_berenices"),
      "leo",
      100,
      6,
      "",
      0,
      0,
      "beta_berenices",
      "gamma_berenices",
      "alpha_leonis_minoris"
    ),
    gamma_berenices: new Star(
      "gamma_berenices",
      true,
      document.querySelector("#gamma_berenices"),
      "virgo",
      100,
      6,
      "",
      0,
      0,
      "alpha_berenices"
    ),
  },
  leo_minor: {
    alpha_leonis_minoris: new Star(
      "alpha_leonis_minoris",
      true,
      document.querySelector("#alpha_leonis_minoris"),
      "leo",
      100,
      6,
      "",
      0,
      0,
      "alpha_berenices",
      "Beta_leonis_minoris",
      "leo"
    ),
    Beta_leonis_minoris: new Star(
      "Beta_leonis_minoris",
      true,
      document.querySelector("#Beta_leonis_minoris"),
      "leo",
      100,
      6,
      "",
      0,
      0,
      "alpha_leonis_minoris",
      "kappa_leonis_minoris",
      "epsilon_leonis_minoris"
    ),
    kappa_leonis_minoris: new Star(
      "kappa_leonis_minoris",
      true,
      document.querySelector("#kappa_leonis_minoris"),
      "leo",
      100,
      6,
      "",
      0,
      0,
      "Beta_leonis_minoris",
      "zeta_leonis_minoris"
    ),
    zeta_leonis_minoris: new Star(
      "zeta_leonis_minoris",
      true,
      document.querySelector("#zeta_leonis_minoris"),
      "cancer",
      100,
      6,
      "",
      0,
      0,
      "kappa_leonis_minoris",
      "epsilon_leonis_minoris",
      "cancer"
    ),
    epsilon_leonis_minoris: new Star(
      "epsilon_leonis_minoris",
      true,
      document.querySelector("#epsilon_leonis_minoris"),
      "leo",
      100,
      6,
      "",
      0,
      0,
      "zeta_leonis_minoris",
      "epsilon_lyncis",
      "Beta_leonis_minoris"
    ),
  },
  lynx: {
    alsciaukat: new Star(
      "alsciaukat",
      true,
      document.querySelector("#alsciaukat"),
      "cancer",
      100,
      6,
      "",
      0,
      0,
      "arrakis",
      "phi_lyncis"
    ),
    phi_lyncis: new Star(
      "phi_lyncis",
      true,
      document.querySelector("#phi_lyncis"),
      "cancer",
      100,
      6,
      "",
      0,
      0,
      "alsciaukat",
      "epsilon_lyncis"
    ),
    epsilon_lyncis: new Star(
      "epsilon_lyncis",
      true,
      document.querySelector("#epsilon_lyncis"),
      "cancer",
      100,
      6,
      "",
      0,
      0,
      "phi_lyncis",
      "epsilon_leonis_minoris",
      "nu_lyncis"
    ),
    nu_lyncis: new Star(
      "nu_lyncis",
      true,
      document.querySelector("#nu_lyncis"),
      "cancer",
      100,
      6,
      "",
      0,
      0,
      "tania",
      "epsilon_lyncis",
      "delta_lyncis"
    ),
    delta_lyncis: new Star(
      "delta_lyncis",
      true,
      document.querySelector("#delta_lyncis"),
      "cancer",
      100,
      6,
      "",
      0,
      0,
      "nu_lyncis",
      "kappa_lyncis"
    ),
    kappa_lyncis: new Star(
      "kappa_lyncis",
      true,
      document.querySelector("#kappa_lyncis"),
      "cancer",
      100,
      6,
      "",
      0,
      0,
      "hassaleh",
      "lambda_lyncis",
      "delta_lyncis",
      "cancer"
    ),
    lambda_lyncis: new Star(
      "lambda_lyncis",
      true,
      document.querySelector("#lambda_lyncis"),
      "cancer",
      100,
      6,
      "",
      0,
      0,
      "kappa_lyncis",
      "omega_lyncis"
    ),
    omega_lyncis: new Star(
      "omega_lyncis",
      true,
      document.querySelector("#omega_lyncis"),
      "cancer",
      100,
      6,
      "",
      0,
      0,
      "lambda_lyncis",
      "gemini"
    ),
  },
  auriga: {
    capella: new Star(
      "capella",
      true,
      document.querySelector("#capella"),
      "taurus",
      100,
      6,
      "",
      0,
      0,
      "menkalinan",
      "theta_aurigae"
    ),
    menkalinan: new Star(
      "menkalinan",
      true,
      document.querySelector("#menkalinan"),
      "gemini",
      100,
      6,
      "",
      0,
      0,
      "capella",
      "mahasim",
      "theta_aurigae"
    ),
    mahasim: new Star(
      "mahasim",
      true,
      document.querySelector("#mahasim"),
      "gemini",
      100,
      6,
      "",
      0,
      0,
      "menkalinan",
      "alula_borealis",
      "hassaleh"
    ),
    hassaleh: new Star(
      "hassaleh",
      true,
      document.querySelector("#hassaleh"),
      "cancer",
      100,
      6,
      "",
      0,
      0,
      "mahasim",
      "kappa_lyncis",
      "almaaz"
    ),
    almaaz: new Star(
      "almaaz",
      true,
      document.querySelector("#almaaz"),
      "gemini",
      100,
      6,
      "",
      0,
      0,
      "hassaleh",
      "theta_aurigae",
      "gemini"
    ),
    theta_aurigae: new Star(
      "theta_aurigae",
      true,
      document.querySelector("#theta_aurigae"),
      "gemini",
      100,
      6,
      "",
      0,
      0,
      "capella",
      "menkalinan",
      "almaaz"
    ),
  },
  cassiopeia: {
    schedar: new Star(
      "schedar",
      true,
      document.querySelector("#schedar"),
      "aries",
      100,
      6,
      "",
      0,
      0,
      "niham",
      "saph"
    ),
    saph: new Star(
      "saph",
      true,
      document.querySelector("#saph"),
      "aries",
      100,
      6,
      "",
      0,
      0,
      "schedar",
      "alpha_trianguli",
      "tsih"
    ),
    tsih: new Star(
      "tsih",
      true,
      document.querySelector("#tsih"),
      "taurus",
      100,
      4,
      "",
      0,
      0,
      "saph",
      "dubhe",
      "ruchbah"
    ),
    ruchbah: new Star(
      "ruchbah",
      true,
      document.querySelector("#ruchbah"),
      "taurus",
      100,
      6,
      "Chaos",
      0,
      0,
      "tsih",
      "segin",
      "aries"
    ),
    segin: new Star(
      "segin",
      true,
      document.querySelector("#segin"),
      "taurus",
      100,
      6,
      "",
      0,
      0,
      "ruchbah",
      "theta_aurigae",
      "taurus"
    ),
  },
  triangulum: {
    beta_trianguli: new Star(
      "beta_trianguli",
      true,
      document.querySelector("#beta_trianguli"),
      "pisces",
      100,
      6,
      "",
      0,
      0,
      "markab",
      "alpha_trianguli",
      "gamma_trianguli",
      "pisces"
    ),
    alpha_trianguli: new Star(
      "alpha_trianguli",
      true,
      document.querySelector("#alpha_trianguli"),
      "aries",
      100,
      6,
      "",
      0,
      0,
      "beta_trianguli",
      "saph",
      "gamma_trianguli"
    ),
    gamma_trianguli: new Star(
      "gamma_trianguli",
      true,
      document.querySelector("#gamma_trianguli"),
      "aries",
      100,
      6,
      "",
      0,
      0,
      "beta_trianguli",
      "alpha_trianguli",
      "aries"
    ),
  },
  pegasus: {
    enif: new Star(
      "enif",
      true,
      document.querySelector("#enif"),
      "aquarius",
      100,
      6,
      "",
      0,
      0,
      "scheat",
      "algenib"
    ),
    scheat: new Star(
      "scheat",
      true,
      document.querySelector("#scheat"),
      "aquarius",
      100,
      6,
      "",
      0,
      0,
      "enif",
      "rotanev",
      "matar",
      "homam",
      "markab"
    ),
    markab: new Star(
      "markab",
      true,
      document.querySelector("#markab"),
      "pisces",
      100,
      6,
      "",
      0,
      0,
      "scheat",
      "niham",
      "algenib",
      "beta_trianguli"
    ),
    algenib: new Star(
      "algenib",
      true,
      document.querySelector("#algenib"),
      "pisces",
      100,
      6,
      "",
      0,
      0,
      "enif",
      "markab",
      "aquarius"
    ),
    matar: new Star(
      "matar",
      true,
      document.querySelector("#matar"),
      "aquarius",
      100,
      6,
      "",
      0,
      0,
      "scheat",
      "beta_camelopardalis"
    ),
    homam: new Star(
      "homam",
      true,
      document.querySelector("#homam"),
      "pisces",
      100,
      6,
      "",
      0,
      0,
      "scheat",
      "salm"
    ),
    salm: new Star(
      "salm",
      true,
      document.querySelector("#salm"),
      "pisces",
      100,
      6,
      "",
      0,
      0,
      "homam"
    ),
    niham: new Star(
      "niham",
      true,
      document.querySelector("#niham"),
      "aries",
      100,
      6,
      "",
      0,
      0,
      "markab",
      "iota_pegasi",
      "schedar"
    ),
    iota_pegasi: new Star(
      "iota_pegasi",
      true,
      document.querySelector("#iota_pegasi"),
      "aries",
      100,
      6,
      "",
      0,
      0,
      "niham",
      "iota_camelopardalis",
      "aries"
    ),
  },
  delphinus: {
    rotanev: new Star(
      "rotanev",
      true,
      document.querySelector("#rotanev"),
      "aquarius",
      100,
      6,
      "",
      0,
      0,
      "sualocin",
      "delta_delphini",
      "scheat"
    ),
    sualocin: new Star(
      "sualocin",
      true,
      document.querySelector("#sualocin"),
      "capricorn",
      100,
      6,
      "",
      0,
      0,
      "deneb",
      "rotanev",
      "capricorn"
    ),
    deneb: new Star(
      "deneb",
      true,
      document.querySelector("#deneb"),
      "capricorn",
      100,
      6,
      "",
      0,
      0,
      "sualocin",
      "sulafat",
      "gamma_delphini",
      "delta_delphini"
    ),
    delta_delphini: new Star(
      "delta_delphini",
      true,
      document.querySelector("#delta_delphini"),
      "capricorn",
      100,
      6,
      "",
      0,
      0,
      "deneb",
      "rotanev"
    ),
    gamma_delphini: new Star(
      "gamma_delphini",
      true,
      document.querySelector("#gamma_delphini"),
      "sagittarius",
      100,
      6,
      "",
      0,
      0,
      "deneb",
      "epsilon_lyrae",
      "alderamin"
    ),
  },
  lyra: {
    vega: new Star(
      "vega",
      true,
      document.querySelector("#vega"),
      "capricorn",
      100,
      6,
      "",
      0,
      0,
      "sheliak",
      "sulafat",
      "capricorn"
    ),
    sheliak: new Star(
      "sheliak",
      true,
      document.querySelector("#sheliak"),
      "capricorn",
      100,
      6,
      "",
      0,
      0,
      "vega",
      "delta_lyrae",
      "epsilon_lyrae",
      "sulafat"
    ),
    sulafat: new Star(
      "sulafat",
      true,
      document.querySelector("#sulafat"),
      "capricorn",
      100,
      6,
      "",
      0,
      0,
      "vega",
      "sheliak",
      "deneb"
    ),
    delta_lyrae: new Star(
      "delta_lyrae",
      true,
      document.querySelector("#delta_lyrae"),
      "capricorn",
      100,
      6,
      "",
      0,
      0,
      "sheliak",
      "alpha_scuti",
      "zeta_lyrae"
    ),
    zeta_lyrae: new Star(
      "zeta_lyrae",
      true,
      document.querySelector("#zeta_lyrae"),
      "sagittarius",
      100,
      6,
      "",
      0,
      0,
      "delta_lyrae",
      "epsilon_lyrae"
    ),
    epsilon_lyrae: new Star(
      "epsilon_lyrae",
      true,
      document.querySelector("#epsilon_lyrae"),
      "sagittarius",
      100,
      6,
      "",
      0,
      0,
      "zeta_lyrae",
      "gamma_delphini",
      "sheliak"
    ),
  },
  draco: {
    etamin: new Star(
      "etamin",
      true,
      document.querySelector("#etamin"),
      "libra",
      100,
      6,
      "",
      0,
      0,
      "rastaban",
      "eldib"
    ),
    rastaban: new Star(
      "rastaban",
      true,
      document.querySelector("#rastaban"),
      "libra",
      100,
      6,
      "",
      0,
      0,
      "etamin",
      "altais"
    ),
    altais: new Star(
      "altais",
      true,
      document.querySelector("#altais"),
      "libra",
      100,
      6,
      "",
      0,
      0,
      "rastaban",
      "eldib"
    ),
    eldib: new Star(
      "eldib",
      true,
      document.querySelector("#eldib"),
      "libra",
      100,
      6,
      "",
      0,
      0,
      "etamin",
      "altais",
      "athebyne"
    ),
    athebyne: new Star(
      "athebyne",
      true,
      document.querySelector("#athebyne"),
      "libra",
      100,
      6,
      "",
      0,
      0,
      "alfirk",
      "iota_serpentis",
      "thuban"
    ),
    thuban: new Star(
      "thuban",
      true,
      document.querySelector("#thuban"),
      "libra",
      100,
      6,
      "",
      0,
      0,
      "athebyne",
      "tyl",
      "pherkad"
    ),
    tyl: new Star(
      "tyl",
      true,
      document.querySelector("#tyl"),
      "libra",
      100,
      6,
      "",
      0,
      0,
      "thuban",
      "unukalhai",
      "gianfar"
    ),
    gianfar: new Star(
      "gianfar",
      true,
      document.querySelector("#gianfar"),
      "virgo",
      100,
      6,
      "",
      0,
      0,
      "tyl",
      "grumium"
    ),
    grumium: new Star(
      "grumium",
      true,
      document.querySelector("#grumium"),
      "leo",
      100,
      6,
      "",
      0,
      0,
      "gianfar",
      "kuma"
    ),
    kuma: new Star(
      "kuma",
      true,
      document.querySelector("#kuma"),
      "leo",
      100,
      6,
      "",
      0,
      0,
      "pherkad",
      "grumium",
      "arrakis"
    ),
    arrakis: new Star(
      "arrakis",
      true,
      document.querySelector("#arrakis"),
      "leo",
      100,
      6,
      "",
      0,
      0,
      "alkaid",
      "kuma",
      "alsciaukat"
    ),
  },
  ursa_major: {
    dubhe: new Star(
      "dubhe",
      true,
      document.querySelector("#dubhe"),
      "taurus",
      100,
      6,
      "",
      0,
      0,
      "tsih",
      "merak",
      "alioth"
    ),
    merak: new Star(
      "merak",
      true,
      document.querySelector("#merak"),
      "taurus",
      100,
      6,
      "",
      0,
      0,
      "dubhe",
      "zeta_camelopardalis",
      "phad",
      "alioth"
    ),
    phad: new Star(
      "phad",
      true,
      document.querySelector("#phad"),
      "gemini",
      100,
      6,
      "",
      0,
      0,
      "merak",
      "mizar",
      "megrez"
    ),
    megrez: new Star(
      "megrez",
      true,
      document.querySelector("#megrez"),
      "gemini",
      100,
      6,
      "",
      0,
      0,
      "phad",
      "tania",
      "alula_borealis",
      "alioth"
    ),
    alioth: new Star(
      "alioth",
      true,
      document.querySelector("#alioth"),
      "taurus",
      100,
      6,
      "",
      0,
      0,
      "merak",
      "megrez",
      "alula_australis",
      "dubhe"
    ),
    mizar: new Star(
      "mizar",
      true,
      document.querySelector("#mizar"),
      "gemini",
      100,
      6,
      "",
      0,
      0,
      "phad",
      "alkaid"
    ),
    alkaid: new Star(
      "alkaid",
      true,
      document.querySelector("#alkaid"),
      "gemini",
      100,
      6,
      "",
      0,
      0,
      "mizar",
      "kochab",
      "arrakis"
    ),
    tania: new Star(
      "tania",
      true,
      document.querySelector("#tania"),
      "gemini",
      100,
      6,
      "",
      0,
      0,
      "megrez",
      "nu_lyncis"
    ),
    alula_borealis: new Star(
      "alula_borealis",
      true,
      document.querySelector("#alula_borealis"),
      "gemini",
      100,
      6,
      "",
      0,
      0,
      "megrez",
      "mahasim"
    ),
    alula_australis: new Star(
      "alula_australis",
      true,
      document.querySelector("#alula_australis"),
      "taurus",
      100,
      6,
      "",
      0,
      0,
      "alioth"
    ),
  },
  camelopardus: {
    beta_camelopardalis: new Star(
      "beta_camelopardalis",
      true,
      document.querySelector("#beta_camelopardalis"),
      "aquarius",
      100,
      6,
      "",
      0,
      0,
      "matar",
      "cs_camelopardalis"
    ),
    cs_camelopardalis: new Star(
      "cs_camelopardalis",
      true,
      document.querySelector("#cs_camelopardalis"),
      "aquarius",
      100,
      6,
      "",
      0,
      0,
      "beta_camelopardalis",
      "alpha_camelopardalis"
    ),
    alpha_camelopardalis: new Star(
      "alpha_camelopardalis",
      true,
      document.querySelector("#alpha_camelopardalis"),
      "pisces",
      100,
      6,
      "",
      0,
      0,
      "cs_camelopardalis",
      "alradif",
      "gamma_camelopardalis"
    ),
    gamma_camelopardalis: new Star(
      "gamma_camelopardalis",
      true,
      document.querySelector("#gamma_camelopardalis"),
      "pisces",
      100,
      6,
      "",
      0,
      0,
      "alpha_camelopardalis",
      "zeta_camelopardalis",
      "iota_pegasi",
      "iota_camelopardalis"
    ),
    iota_camelopardalis: new Star(
      "iota_camelopardalis",
      true,
      document.querySelector("#iota_camelopardalis"),
      "pisces",
      100,
      6,
      "",
      0,
      0,
      "gamma_camelopardalis",
      "zeta_camelopardalis",
      "sigma_camelopardalis"
    ),
    sigma_camelopardalis: new Star(
      "sigma_camelopardalis",
      true,
      document.querySelector("#sigma_camelopardalis"),
      "pisces",
      100,
      6,
      "",
      0,
      0,
      "iota_camelopardalis"
    ),
    zeta_camelopardalis: new Star(
      "zeta_camelopardalis",
      true,
      document.querySelector("#zeta_camelopardalis"),
      "aries",
      100,
      6,
      "",
      0,
      0,
      "gamma_camelopardalis",
      "phi_camelopardalis",
      "merak"
    ),
    phi_camelopardalis: new Star(
      "phi_camelopardalis",
      true,
      document.querySelector("#phi_camelopardalis"),
      "aries",
      100,
      6,
      "",
      0,
      0,
      "zeta_camelopardalis",
      "kochab"
    ),
  },
  cepheus: {
    alderamin: new Star(
      "alderamin",
      true,
      document.querySelector("#alderamin"),
      "sagittarius",
      100,
      6,
      "",
      0,
      0,
      "gamma_delphini",
      "alfirk",
      "epsilon_cephei"
    ),
    alfirk: new Star(
      "alfirk",
      true,
      document.querySelector("#alfirk"),
      "sagittarius",
      100,
      6,
      "",
      0,
      0,
      "alderamin",
      "athebyne",
      "errai"
    ),
    errai: new Star(
      "errai",
      true,
      document.querySelector("#errai"),
      "sagittarius",
      100,
      6,
      "",
      0,
      0,
      "alfirk",
      "alradif"
    ),
    alradif: new Star(
      "alradif",
      true,
      document.querySelector("#alradif"),
      "sagittarius",
      100,
      6,
      "",
      0,
      0,
      "errai",
      "eta_ursae",
      "alpha_camelopardalis",
      "epsilon_cephei"
    ),
    epsilon_cephei: new Star(
      "epsilon_cephei",
      true,
      document.querySelector("#epsilon_cephei"),
      "sagittarius",
      100,
      6,
      "",
      0,
      0,
      "alderamin",
      "alradif"
    ),
  },
};

(function giveConstellationToEachStar() {
  const constellations = Object.keys(stars);

  universeStars.forEach((starElement) => {
    const starId = starElement.id;

    constellations.forEach((constellation) => {
      if (Object.hasOwn(stars[constellation], starId)) {
        stars[constellation][starId]["constellation"] = constellation;
        starElement["constellation"] = constellation;
      }
    });

    // navigator.clipboard.writeText(`${event.currentTarget.id}`);
  });
})();

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    battleDialog.close();
  }
});
