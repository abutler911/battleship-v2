const express = require("express");
const path = require("path");
const http = require("http");
const PORT = process.env.PORT || 3000;
const socketio = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketio(server);

//Set static folder
app.use(express.static(path.join(__dirname, "public")));

//Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
const connections = [null, null];

io.on("connection", (socket) => {
  //   console.log("New socket connection");
  //find an available player number
  let playerIndex = -1;
  for (const i in connections) {
    if (connections[i] === null) {
      playerIndex = 1;
      break;
    }
  }

  //tell the connecting clinent what player number they are
  socket.emit("player-number", playerIndex);

  console.log(`Player ${playerIndex} has connected`);
  //ignore player #3
  if (playerIndex === -1) return;
});
