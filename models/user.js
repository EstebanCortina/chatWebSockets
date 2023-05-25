class User {
  constructor(id, name, ws, type) {
    this.id = id;
    this.name = name;
    this.ws = ws;
    this.type = type;
  }
  newUser(id, name, ws) {
    return new User(id, name, ws);
  }
}

module.exports = User;