class User {
  constructor(health, damage, experience) {
    this.health = health;
    this.damage = damage;
    this.experience = experience;
  }
}

let users = {
  me: new User(100, 5, 0),
};
