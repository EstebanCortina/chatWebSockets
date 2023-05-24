class User {
  constructor(id, name, ws) {
    this.id = id;
    this.name = name;
    this.ws = ws;
  }
  newUser(id, name, ws) {
    return new User(id, name, ws);
  }
}

module.exports = User;