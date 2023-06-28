import cors from 'cors';
import express from 'express';
import { Server } from 'socket.io';

const app = express();
app.use(cors());

const server = app.listen(7777, () => {
  console.log('Listening at port 7777...');
});

const io = new Server(server);

io.on('connection', (socket) => {
  socket.on('message', (content) => {
    io.emit('message', { content, timeStamp: Date.now() });
  });
});

io.engine.on('headers', (headers) => {
  headers['Access-Control-Allow-Origin'] = 'http://localhost:5173';
  headers['Access-Control-Allow-Methods'] = 'GET, POST';
  headers['Access-Control-Allow-Credentials'] = 'true';
});
