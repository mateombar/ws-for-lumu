const { WebSocketServer } = require('ws')
const express = require("express");

const webserver = express()
  .use((req, res) =>
    res.sendFile("/websocket-client.html", { root: __dirname })
  )
  .listen(3002, () => console.log(`Listening on ${3002}`));

const wss = new WebSocketServer({ port: 445 });

wss.on("connection", (ws) => {
  console.log("New client connected!");
  ws.send("connection established");
  ws.on("close", () => console.log("Client has disconnected!"));

  ws.on("error", console.error);

  ws.on("message", (data) => {
    sockserver.clients.forEach((client) => {
      console.log(`distributing message: ${data}`);
      client.send(`${data}`);
    });
  });
});
