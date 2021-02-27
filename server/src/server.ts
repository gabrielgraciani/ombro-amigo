import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';

import { createServer } from 'http';
import { Socket } from 'socket.io';

import '@shared/database';
import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';

import routes from '@shared/routes';

import { joinUser, removeUser } from './shared/websocket/functions';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return res.status(500).json({
    status: 'Error',
    message: err.message || 'Internal server error',
  });
});

// app.listen(process.env.PORT || 3333, () => {
//   console.log(`server started on port ${process.env.PORT || 3333}`);
// });

const server = createServer(app);

// eslint-disable-next-line @typescript-eslint/no-var-requires
const io = require('socket.io')(server, {
  cors,
  transports: ['websocket', 'polling', 'flashsocket'],
});

interface RoomProps {
  username: string;
  roomName: string;
}

interface MessageProps {
  value: string;
  user: string;
}

let thisRoom = '';
io.on('connection', (socket: Socket) => {
  console.log('[IO] Connection => Server has a new connection');

  socket.on('join room', (data: RoomProps) => {
    console.log('in room', data);
    const Newuser = joinUser(socket.id, data.username, data.roomName);
    // io.to(Newuser.roomname).emit('send data' , {username : Newuser.username,roomname : Newuser.roomname, id : socket.id})
    // io.to(socket.id).emit('send data' , {id : socket.id ,username:Newuser.username, roomname : Newuser.roomname });
    socket.emit('send data', {
      id: socket.id,
      username: Newuser.username,
      roomname: Newuser.roomname,
    });

    thisRoom = Newuser.roomname;
    console.log(Newuser);
    socket.join(Newuser.roomname);
  });
  socket.on('chat message', (data: MessageProps) => {
    console.log('chegou aqui message', data);
    io.to(thisRoom).emit('chat message', { data, id: socket.id });
  });
  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    console.log(user);
    if (user) {
      console.log(`${user.username} has left`);
    }
    console.log('disconnected');
  });
});

server.listen(process.env.PORT || 3333, () => {
  console.log(`server started on port ${process.env.PORT || 3333}`);
});
