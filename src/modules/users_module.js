export { users };
const soulsAmount = document.querySelector("#soulsAmount");

class User {
  constructor(zodiacSign, health, damage, souls, experience) {
    this.zodiacSign = zodiacSign;
    this.health = health;
    this.damage = damage;
    this.souls = 10;
    this.experience = experience;
    this.soulsReload();
  }

  soulsReload() {
    setInterval(() => {
      if (this.souls < 10) {
        this.souls += 1;
        soulsAmount.textContent = users.me.souls;
      }
    }, 2000);
  }
}

let users = {
  me: new User("scorpio", 100, 5, 10, 0),
};

// zodiac sign choices

const firstSixSigns = Array.from(
  document.querySelector("#firstSixSigns").children
);

const secondSixSigns = Array.from(
  document.querySelector("#secondSixSigns").children
);

const allZodiacSignsElements = [...firstSixSigns, ...secondSixSigns];
const allZodiacSigns = [
  "aries",
  "taurus",
  "gemini",
  "cancer",
  "leo",
  "virgo",
  "libra",
  "scorpio",
  "sagittarius",
  "capricorn",
  "aquarius",
  "pisces",
];

for (let i = 0; i <= 11; i++) {
  allZodiacSignsElements[i].addEventListener("click", (event) => {
    users.me.zodiacSign = allZodiacSigns[i];
  });
}
