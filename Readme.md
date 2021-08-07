## SocketIO Cheat Sheet

This is a dummy repository that shows how to send messages using SocketIO.

Users can send messages back and forth using the normal "chat" namespace.

They can also join the "special" room by emitting the "join-special" event back to the server, which joins the user's socket to the special room. They can then recieve messages in the special room.

When users want to leave the special room, they emit the "leave-special" event, which will tell the server to make their socket leave the room.

We could theoretically have lots of different rooms for various subjects/chats.
