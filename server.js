const express = require('express'); // For making the connections between the computers
const chalk = require('chalk'); // For outputting colored text (such as gren, purpe)
const http = require('http');
const settings = require('./settings.json');

const app = express();
const server = http.createServer(app);
const port = settings.port;

app.use('/web', express.static(__dirname + '/web'));

app.get('/', (req, res) => {
    console.log('Get \'/\' - Sending \'/web/index.html\'!');
    res.sendFile(__dirname + '/web/index.html');
});

server.listen(80);
server.on('listening', () => {
    console.log(`Server started on port ${chalk.rgb(150, 175, 235)(port)}!`);
});