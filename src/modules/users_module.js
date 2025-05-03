export { users };

class User {
  constructor(zodiacSign, health, damage, experience) {
    this.zodiacSign = zodiacSign;
    this.health = health;
    this.damage = damage;
    this.experience = experience;
  }
}

let users = {
  me: new User('scorpio', 100, 5, 0),
};
