const express = require('express');
const http = require('http');
const morgan = require('morgan');
const cors = require('cors');
const twitchChat = require('./twitchChat');

const app = express();
const server = http.createServer(app);
twitchChat(server);

app.use(morgan('dev'));
app.use(cors());

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`App running on port ${PORT}`));