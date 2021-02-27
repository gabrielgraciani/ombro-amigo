import { Socket, Server as SocketServer } from 'socket.io';
import { Server } from 'http';

import { joinUser, removeUser } from './userActions';
import { RoomProps, MessageProps } from './socketIO.types';

export default class SocketIO {
  private server: Server;

  private thisRoom: string;

  constructor(server: Server) {
    this.server = server;
  }

  private joinRoom(socket: Socket): void {
    socket.on('join room', (data: RoomProps) => {
      console.log('in room', data);
      const Newuser = joinUser(socket.id, data.username, data.roomName);
      // io.to(Newuser.roomname).emit('send data' , {username : Newuser.username,roomname : Newuser.roomname, id : socket.id})
      // io.to(socket.id).emit('send data' , {id : socket.id ,username:Newuser.username, roomname : Newuser.roomname });
      socket.emit('send data', {
        id: socket.id,
        username: Newuser.username,
        roomName: Newuser.roomName,
      });

      this.thisRoom = Newuser.roomName;
      console.log(Newuser);
      socket.join(Newuser.roomName);
    });
  }

  private manageMessages(socket: Socket, io: SocketServer): void {
    socket.on('chat message', (data: MessageProps) => {
      console.log('chegou aqui message', data);
      io.to(this.thisRoom).emit('chat message', { data, id: socket.id });
    });
  }

  private disconnect(socket: Socket): void {
    socket.on('disconnect', () => {
      const user = removeUser(socket.id);
      console.log(user);
      if (user) {
        console.log(`${user.username} has left`);
      }
      console.log('disconnected');
    });
  }

  public execute(): void {
    const io = new SocketServer(this.server, {
      transports: ['websocket', 'polling'],
    });

    io.on('connection', (socket: Socket) => {
      console.log('[IO] Connection => Server has a new connection');

      this.joinRoom(socket);

      this.manageMessages(socket, io);

      this.disconnect(socket);
    });
  }
}
