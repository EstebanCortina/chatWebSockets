class listaUsuarios {
  constructor() {
    this.lista = [];
  }
  addUser(newUser) {
    this.lista.push(newUser);
    return true;
  }
  findUser(param) {
    for (let i = 0; i < this.lista.length; i++) {
      if (this.lista[i].ws === param) {
        return this.lista[i];
      }
    }
    return false;
  }

  broadcastExcept(id) {
    let aux = [];
    for (let i = 0; i < this.lista.length; i++) {
      if (id !== this.lista[i].id) {
        aux.push(this.lista[i]);
      }
    }
    return aux;
  }
}

module.exports = new listaUsuarios();