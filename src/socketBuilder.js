export default class Socket {
  constructor(server, config) {
    //server: http.server, config:KeyValuePair<any>
    this.io = io(server, config["options"]);
  }

  get sockets() {
    return this.io.sockets;
  }

  get connected() {
    return this.sockets.connected;
  }

  getConnectedClients(rooms) {
    if (!this.connected) return [];
    if (rooms) {
      if (!Array.isArray(rooms)) {
        rooms = [rooms];
      }
      let clients = {};

      for (let roomId of rooms) {
        let room = this.io.sockets.adapter.rooms[roomId];

        if (!room || !room.sockets) {
          continue;
        }

        for (let i in room.sockets) {
          if (this.connected[i]) {
            clients[i] = this.connected[i];
          }
        }
      }
      return _.values(clients);
    }
    return _.values(this.connected);
  }

  emit(event, args) {
    return this.io.emit(event, args);
  }

  of(namespace) {
    return this.io.of(namespace);
  }

  to(room) {
    return this.io.to(room);
  }

  on(event, listener) {
    this.io.on(event, listener);
    return this;
  }
}

// connect() {
//   var self = this;
//   if (self.socket) {
//     self.socket.destroy();
//     delete self.socket;
//     self.socket = null;
//   }
//   this.socket = io.connect(
//     "http://127.0.0.1:3000",
//     {
//       reconnection: true,
//       reconnectionDelay: 1000,
//       reconnectionDelayMax: 5000,
//       reconnectionAttempts: Infinity
//     }
//   );
//   this.socket.on("connect", function() {
//     console.log("connected to server");
//   });
//   this.socket.on("disconnect", function() {
//     console.log("disconnected from server");
//     window.setTimeout("app.connect()", 5000);
//   });
// }
