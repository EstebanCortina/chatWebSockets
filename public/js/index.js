let ws = new WebSocket("wss://chatdelamor.onrender.com");

const txtName = document.getElementById('txtName');
const txtMsj = document.getElementById('txtMsj')
const loginBtn = document.getElementById('loginBtn');
const sendBtn = document.getElementById('sendBtn');
const logoutBtn = document.getElementById('logoutBtn')
const msjResponse = document.getElementById('msjResponse');
const msj = document.getElementById('msj');
const txtZone = document.getElementById('txtZone');
const txtContador = document.getElementById('contador');
let contador = 0;
let frase = "te amo";

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
