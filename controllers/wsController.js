const connections = [];
const User = require('../models/user.js');
const listaUsuarios = require('../models/ListaUsuarios.js');
const Message = require('../models/message.js');
const listaMensajes = require('../models/ListaMensajes.js');

const broadcastMessage = (message, senderConnection) => {
  connections.forEach((connection) => {
    if (connection !== senderConnection) {
      connection.send(JSON.stringify(message));
    }
  });
};



module.exports = (ws) => {
  console.log("Nueva conexion");

  ws.on('message', (message) => {

    const data = JSON.parse(message);
    if (data.type === 1) {
      let newUser = new User(listaUsuarios.lista.length, data.value, ws);
      listaUsuarios.addUser(newUser);
      console.log(newUser);
    } else {
      console.log(data.timeStamp);
      let newMessage = new Message(data.timeStamp, data.user, data.value);
      listaMensajes.addMessage(newMessage);
      console.log(listaMensajes.lista);
      listaUsuarios.lista.forEach((connection) => {

        if ((connection.ws !== ws)) {
          connection.ws.send(JSON.stringify(newMessage));
        }
      });
    }




  });
  ws.on('close', () => {
    const index = connections.indexOf(ws);
    if (index !== -1) {
      connections.splice(index, 1);
    }
  });

  // Agregar la nueva conexión al array
  connections.push(ws);
};
