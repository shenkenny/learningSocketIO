const socket = io();

// Normal messages: User submits a form, and that
// sends a 'client-message' message to the server.
// The server then picks up that message and broadcasts it
// back out on the "chat" event, which will send that
// message to everyone but the current user.
const form = document.getElementById("form");
const input = document.getElementById("input");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (input.value) {
    socket.emit("client-message", input.value);
    input.value = "";
  }
});

const disconnect = document.getElementById("disconnect");
disconnect.addEventListener("click", () => {
  socket.disconnect();
});

// Log messages from other users on the "chat" namespace.
socket.on("chat", (data) => {
  console.log(data);
});

// A user can click on this button to join the "special" room
// They will then recieve messages emitted to that room.
const joinSpecial = document.getElementById("join-special");
joinSpecial.addEventListener("click", () => {
  socket.emit("join", "special");
});

// Leave the special room
const leaveSpecial = document.getElementById("leave-special");
leaveSpecial.addEventListener("click", () => {
  socket.emit("leave", "special");
});

// This form only emits to the special room.
// Users must join that room to recieve the messages.
const specialForm = document.getElementById("specialForm");
const specialInput = document.getElementById("specialInput");
specialForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (specialInput.value) {
    socket.emit("special-message", specialInput.value);
    specialInput.value = "";
  }
});
