import { User } from './socketIO.types';

const users: User[] = [];
function joinUser(socketId: string, userName: string, roomName: string): User {
  const user = {
    socketID: socketId,
    username: userName,
    roomname: roomName,
  };
  users.push(user);
  return user;
}

function removeUser(id: string): User | undefined {
  const index = users.findIndex(user => user.socketID === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }

  return undefined;
}

export { joinUser, removeUser };
