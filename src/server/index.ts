import express from 'express';
import bodyParser from 'body-parser';
import routers from '../routes/index.js';
const server = express()

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: false }))

routers(server);

export default server;