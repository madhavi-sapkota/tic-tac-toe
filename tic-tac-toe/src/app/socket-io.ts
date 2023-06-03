import { Socket, io } from 'socket.io-client';
import { UserServiceService } from './services/user-service.service';
import { GameService } from './services/game.service';

let userService = new UserServiceService(null);
let gameService = new GameService(null);

let socket: Socket;

const connect = () => {
  socket = io('http://localhost:3000');

  socket.on('usersUpdated', (data: any) => {
    userService.usersUpdated(data);
  });
  socket.on('userScoresUpdated', (data: any) => {
    userService.userScoresUpdated(data);
  });

  socket.on('userSymbolUpdated', (data: any) => {
    userService.userSymbolUpdated(data);
  });
  socket.on('nextSymbolUpdated', (data: any) => {
    userService.nextSymbolUpdated(data);
  });
  socket.on('gridUpdated', (data: any) => {
    gameService.gridUpdated(data);
  });
  socket.on('winningIndexesUpdated', (data: any) => {
    gameService.winningIndexesUpdated(data);
  });
};

const sendMessage = (messageName: string, message: any) => {
  socket.emit(messageName, message);
};

export { connect, sendMessage, socket };
