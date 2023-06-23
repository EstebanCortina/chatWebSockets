//const ws=new WebSocket("ws://localhost:3000");
let ws;

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
  if (res.type === 1) {
    txtZone.innerHTML += `<br><p class="responseMsj in">${res.name} ha entrado al chat</p>`;
  } else if (res.type === 2) {
    txtZone.innerHTML += `<p class="responseMsj">[${res.timeStamp}]${res.user}:${res.payload}</p>`;
    if (res.payload.toLowerCase().includes(frase)) {
      contador++;
      txtContador.innerHTML = `contador: ${contador}`;
    }
  } else {

    txtZone.innerHTML += `<br><p class="responseMsj out">${res.user} ha salido al chat</p>`;
  }

  txtZone.scrollTop = txtZone.clientHeight;
}

loginBtn.addEventListener('click', async () => {
  console.log("login");

  const newUser = {
    "value": txtName.value,
    "type": 1
  };
  try {
    if (!ws) {
      console.log("vacio");
      await createWs();
      txtName.disabled = true;
    }
    await wsSend(newUser);

  } catch (error) {

  }


  //console.log(localStorage.getItem('user'));
})

logoutBtn.addEventListener('click', () => {
  if (ws) {
    ws.close();
    ws = null;
    console.log("Session cerrada");
  }
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
