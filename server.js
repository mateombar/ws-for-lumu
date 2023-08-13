const { WebSocketServer } = require('ws')

const socketServer = new WebSocketServer({ port: 443 });

socketServer.on("connection", (ws) => {
  console.log("New client connected!");
  ws.send("connection established");
  ws.on("close", () => console.log("Client has disconnected!"));

  ws.on("error", console.error);

  ws.on("message", (data) => {
    socketServer.clients.forEach((client) => {
      console.log(`distributing message: ${data}`);
      client.send(`You thype this: ${data}`);
    });
  });
});
