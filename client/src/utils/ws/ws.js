const webSocket = new WebSocket("ws://localhost:443/");
webSocket.onmessage = (event) => {
  console.log("jola");
  console.log(event);
  // document.getElementById('messages').innerHTML +=
  //   'Message from server: ' + event.data + "<br>";
};

webSocket.addEventListener("open", () => {
  console.log("We are connected");
});

export default webSocket;