/* eslint-disable global-require */
import cors from 'cors';
import { Socket } from 'socket.io';
import { Server } from 'http';

import { joinUser, removeUser } from './userActions';
import { RoomProps, MessageProps } from './socketIO.types';

export default class SocketIO {
  private server: Server;

  constructor(server: Server) {
    this.server = server;
  }

  public execute(): void {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const io = require('socket.io')(this.server, {
      cors,
      transports: ['websocket', 'polling', 'flashsocket'],
    });

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
  }
}
