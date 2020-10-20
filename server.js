"use strict";

const express = require("express");
const socketIO = require("socket.io");

const PORT = process.env.PORT || 5000;
const INDEX = "/index.html";

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("new connection", socket);
  socket.send("Bienvenida Guapi");
  socket.on("stream", (image) => {
    socket.emit("stream", image); //emitir el evento a todos los sockets conectados
  });

  socket.on("disconnect", (data) => {
    console.log("Alguien se ha pirado");
  });
  socket.on("message", (data) => {
    console.log(data);
  });
});

io.on("evento_video", (dato) => {
  console.log("datos recibidos" + dato);
});

io.serveClient();

setInterval(() => io.emit("time", new Date().toTimeString()), 1000);
//Y si comentamos la hora y hacemos push a heroku de manera que nuestro socket solo esté para vídeo??
