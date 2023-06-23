class ListaChats {
  constructor() {
    this.lista = [];
  }
  findById(searchId) {
    for (let i = 0; i < this.lista.length; i++) {
      if (this.lista[i].id === searchId) {
        return this.lista[i];
      }
    }
  }
}

module.exports = new ListaChats();