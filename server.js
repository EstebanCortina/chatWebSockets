const { PORT } = require('./config/config.js');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const http = require('http');
const WebSocket = require('ws');
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static(__dirname + '/public'));

const wsController = require('./controllers/wsController.js');
wss.on('connection', wsController);


const router = require('./routes');
app.use('/', router);


server.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});