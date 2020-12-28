import io from 'socket.io-client';

class Socket {
  constructor (address) {
    this.address = address;
    this.socket = io(address, { transports: ['websocket']});
  }

  sendMessage (route, payload) {
    this.socket.emit(route, payload);
  }
  receiveMessages (route, callback) {
    this.socket.on(route, callback);
  }
}

export default Socket;