const User = require('../models/user.js');
const listaUsuarios = require('../models/ListaUsuarios.js');
const Message = require('../models/message.js');
const listaMensajes = require('../models/ListaMensajes.js');
const ListaUsuarios = require('../models/ListaUsuarios.js');


function sendAll(message, ws) {
  listaUsuarios.lista.forEach((connection) => {

    if ((connection.ws !== ws)) {
      connection.ws.send(JSON.stringify(message));
    }
  });
}

module.exports = (ws) => {
  console.log("Nueva conexion");

  ws.on('message', (message) => {

    const data = JSON.parse(message);
    if (data.type === 1) {
      let newUser = new User(listaUsuarios.lista.length, data.value, ws, data.type);
      listaUsuarios.addUser(newUser);
      sendAll(newUser, ws);
    } else {
      let newMessage = new Message(data.timeStamp, data.user, data.value, data.type);
      listaMensajes.addMessage(newMessage);
      sendAll(newMessage, ws);
    }
  });
  ws.on('close', () => {
    let user = ListaUsuarios.findUser(ws);
    const index = ListaUsuarios.lista.indexOf(ws);
    if (index !== -1) {
      ListaUsuarios.lista.splice(index, 1);
    }
    sendAll({ "type": 3, "user": user.name }, ws);
    console.log("cerrado");
  });

};
