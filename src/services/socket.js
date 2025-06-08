
import { io } from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
  }

  connect() {
    this.socket = io('http://localhost:3000', { 
      withCredentials: true 
    });

    this.socket.on('connect', () => {
      this.isConnected = true;
      console.log('Connected to socket server');
    });

    this.socket.on('disconnect', () => {
      this.isConnected = false;
      console.log('Disconnected from socket server');
    });

    this.socket.on('error', (error) => {
      console.error('Socket error:', error);
      alert(error);
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  joinRoom(roomId) {
    if (this.socket) {
      this.socket.emit('join-room', { room_id: roomId });
    }
  }

  sendMessage(roomId, message) {
    if (this.socket) {
      this.socket.emit('send-message', { room_id: roomId, message });
    }
  }

  onReceiveMessage(callback) {
    if (this.socket) {
      this.socket.on('receive-message', callback);
    }
  }

  onJoinedRoom(callback) {
    if (this.socket) {
      this.socket.on('joined-room', callback);
    }
  }

  offReceiveMessage() {
    if (this.socket) {
      this.socket.off('receive-message');
    }
  }

  offJoinedRoom() {
    if (this.socket) {
      this.socket.off('joined-room');
    }
  }
}

export default new SocketService();
