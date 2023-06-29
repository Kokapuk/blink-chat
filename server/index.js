import { Server } from 'socket.io';
import dotenv from 'dotenv';

dotenv.config();

const io = new Server(process.env.PORT);

io.on('connection', (socket) => {
  socket.on('join', (room) => {
    socket.join(room);
  });

  socket.on('message', ({ username, content, to }) => {
    if (!to) {
      return;
    }

    io.to(to).emit('message', { username, content, timeStamp: Date.now() });
  });
});

io.engine.on('headers', (headers) => {
  headers['Access-Control-Allow-Origin'] = process.env.CLIENT_URL;
  headers['Access-Control-Allow-Methods'] = 'GET, POST';
  headers['Access-Control-Allow-Credentials'] = 'true';
});
