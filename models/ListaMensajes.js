class ListaMensajes {
  constructor() {
    this.lista = [];
  }
  addMessage(newMessage) {
    this.lista.push(newMessage);
    return true;
  }

}

module.exports = new ListaMensajes();