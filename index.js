const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("A user connected.");

  // Log disconnect from client.
  socket.on("disconnect", () => {
    console.log("User disconnected.");
  });

  // On a message from the client, reemit it on the 'chat' namespace
  // which will send it to everyone but the sender.
  socket.on("client-message", (message) => {
    socket.broadcast.emit("chat", message);
  });

  // When a user emits to 'join-room', subscribe them to the string they provide
  // Then, tell them they joined the room
  socket.on("join", async (room) => {
    socket.join(room);
    const rooms = [...socket.rooms.values()];
    socket.emit(
      "chat",
      `Joined '${room}' room! Rooms are: ${rooms.reduce(
        (acc, room) => acc + room + ", ",
        ""
      )}`
    ); // Tell them they are joining the room. Only emit to the sender...
  });

  socket.on("leave", async (room) => {
    socket.leave(room);
    const rooms = [...socket.rooms.values()];
    socket.emit(
      "chat",
      `Left '${room}' room! Rooms are: ${rooms.reduce(
        (acc, room) => acc + room + ", ",
        ""
      )}`
    ); // Tell them they are joining the room. Only emit to the sender...
  });

  // Only re-broadcast messages out to users in the special room.
  // We still need to specify the namespace, in our case, the "chat" namespace
  socket.on("special-message", (message) => {
    console.log("Special message is: ", message);
    socket.to("special").emit("chat", message);
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/client.js", (req, res) => {
  res.sendFile(__dirname + "/client.js");
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
