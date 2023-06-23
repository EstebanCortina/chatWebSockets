//let ws = new WebSocket("wss://chatdelamor.onrender.com");
let ws = new WebSocket("ws://localhost:3000");

const txtName = document.getElementById('txtName');
const txtMsj = document.getElementById('txtMsj')
const loginBtn = document.getElementById('loginBtn');
const sendBtn = document.getElementById('sendBtn');
const logoutBtn = document.getElementById('logoutBtn')
const msjResponse = document.getElementById('msjResponse');
const msj = document.getElementById('msj');
const txtZone = document.getElementById('txtZone');
const txtContador = document.getElementById('contador');
const txtUsersList = document.getElementById('txtUsersList');
const txtPrivateChat = document.getElementById('txtPrivateChat');
let contador = 0;
let frase = "frase";
function updateDivListeners() {
  const tags = document.querySelectorAll('.privateUserId');

  console.log(tags);

  tags.forEach(tag => {
    tag.addEventListener('click', () => {
      sendPrivateMessage(tag.id);
    });
  });
}

function sendPrivateMessage(userId) {
  ws.send(JSON.stringify({ "type": 5, "userId": userId }));
}

ws.onopen = (event) => {
  console.log("Conectado");
}
ws.onmessage = (event) => {
  let res = JSON.parse(event.data);
  console.log(res);
  if (res.type === 1) {
    txtZone.innerHTML += `<br><p class="responseMsj in">${res.newUser} ha entrado al chat</p>`;

    let content = '';
    res.list.forEach(user => {
      content += `<div class="privateUserId" id="${user.id}">${user.name}</div>`;
    })
    txtUsersList.innerHTML = content;
    updateDivListeners();

  } else if (res.type === 2) {
    txtZone.innerHTML += `<p class="responseMsj">[${res.timeStamp}]${res.user}:${res.payload}</p>`;
    if (res.payload.toLowerCase().includes(frase)) {
      contador++;
      txtContador.innerHTML = `contador: ${contador}`;
    }
  } else if (res.type === 3) {

    txtZone.innerHTML += `<br><p class="responseMsj out">${res.user} ha salido al chat</p>`;
  } else if (res.type === 4) {
    let content = '';
    res.list.forEach(user => {
      content += `<div id="${user.id}">${user.name}</div>`;
    })
    txtUsersList.innerHTML = content;
    updateDivListeners();
  } else if (res.type === 5) {
    //console.log(res.chat);
    /*
    sessionStorage.setItem('userA', JSON.stringify(res.chat.userA));
    sessionStorage.setItem('userB', JSON.stringify(res.chat.userB));

    txtPrivateChat.disabled = false;
    txtPrivateChat.innerHTML += sessionStorage.getItem('userB');
    */

    const url = '/dm';
    const params = {
      parametro1: 'valor1'
    };

    // Construir la URL con los parámetros de consulta
    const queryParams = new URLSearchParams(params);
    const urlWithParams = `${url}?${queryParams}`;
    fetch(urlWithParams);
  }

  txtZone.scrollTop = txtZone.clientHeight;
}

loginBtn.addEventListener('click', () => {
  console.log("login");
  const newUser = {
    "value": txtName.value,
    "type": 1
  };
  ws.send(JSON.stringify(newUser));
  txtName.disabled = true;
  //console.log(localStorage.getItem('user'));
})

sendBtn.addEventListener('click', () => {
  const newMessage = {
    "timeStamp": new Date().toTimeString(),
    "user": txtName.value,
    "value": txtMsj.value,
    "type": 2,
  };
  if (newMessage.value !== "") {
    txtZone.innerHTML += `<p class="msj">[${newMessage.timeStamp}]${newMessage.user}:  ${newMessage.value}</p>`;
    ws.send(JSON.stringify(newMessage));
  }
  if (newMessage.value.toLowerCase().includes(frase)) {
    contador++;
    txtContador.innerHTML = `contador: ${contador}`;
  }
  //let isScrolledToBottom = txtZone.scrollHeight - txtZone.clientHeight <= txtZone.scrollTop + 1;
  txtMsj.value = "";
  txtMsj.focus();
  txtZone.scrollTop = txtZone.clientHeight;





})
