const User = require('../models/user.js');
const listaUsuarios = require('../models/ListaUsuarios.js');
const Message = require('../models/message.js');
const listaMensajes = require('../models/ListaMensajes.js');
const Chat = require('../models/chat_model.js');
const listaChats = require('../models/ListaChats.js');




function sendAll(message, ws) {
  return new Promise((resolve) => {
    listaUsuarios.lista.forEach((connection) => {
      connection.send(JSON.stringify(message));
    });
    resolve();
  })
}

module.exports = (ws) => {
  console.log("Nueva conexion");

  ws.on('message', (message) => {

    const data = JSON.parse(message);
    if (data.type === 1) {
      let newUser = new User(listaUsuarios.lista.length, data.value, ws, data.type);
      listaUsuarios.addUser(ws);
      listaUsuarios.listaNames.push({ "id": newUser.id, "name": newUser.name });
      sendAll({ "id": newUser.id, "newUser": newUser.name, "list": listaUsuarios.listaNames, "type": 1 }, ws);
    } else if (data.type === 2) {
      let newMessage = new Message(data.timeStamp, data.user, data.value, data.type);
      listaMensajes.addMessage(newMessage);
      sendAll(newMessage, ws);
    } else if (data.type === 5) {
      let newChat = new Chat(listaChats.lista.length, ws, listaUsuarios.findUser(data.userId));
      listaChats.lista.push(newChat);
      newChat.userB.send(JSON.stringify({ "type": 5, "chatId": newChat.id }));
    }
  });
  ws.on('close', async () => {
    const index = listaUsuarios.lista.indexOf(ws);
    let newUser = listaUsuarios.listaNames[index];
    console.log(index);
    if (index !== -1) {
      listaUsuarios.lista.splice(index, 1);
      listaUsuarios.listaNames.splice(index, 1);
    }
    try {
      await sendAll({ "type": 3, "user": newUser.name }, ws);
      await sendAll({ "id": newUser.id, "newUser": newUser.name, "list": listaUsuarios.listaNames, "type": 4 }, ws);
    } catch (error) {
      console.error(new Error(error));
    }


    console.log("cerrado");
  });

};
