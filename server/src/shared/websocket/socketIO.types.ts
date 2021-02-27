interface RoomProps {
  username: string;
  roomName: string;
}

interface MessageProps {
  value: string;
  user: string;
}

interface User {
  socketID: string;
  username: string;
  roomName: string;
}

export { RoomProps, MessageProps, User };
