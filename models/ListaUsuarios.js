class listaUsuarios {
  constructor() {
    this.lista = [];
    this.listaNames = [];
  }
  addUser(newUser) {
    this.lista.push(newUser);
    return true;
  }
  findUser(index) {
    return this.lista[index];
  }

  findListaNames(id) {
    for (let i = 0; i < array.length; i++) {
      if (this.lista[i].id == id) {
        retu
      }

    }
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