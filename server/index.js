import cors from 'cors';
import express from 'express';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());

const server = app.listen(process.env.PORT, () => {
  console.log(`Listening at port ${process.env.PORT}...`);
});

const io = new Server(server);

io.on('connection', (socket) => {
  socket.on('message', ({ username, content }) => {
    io.emit('message', { username, content, timeStamp: Date.now() });
  });
});

io.engine.on('headers', (headers) => {
  headers['Access-Control-Allow-Origin'] = process.env.CLIENT_URL;
  headers['Access-Control-Allow-Methods'] = 'GET, POST';
  headers['Access-Control-Allow-Credentials'] = 'true';
});
