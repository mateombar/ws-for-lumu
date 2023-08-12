export const connectWS = () => new WebSocket("ws://localhost:443/");

export const onOpenWS = (ws) => {
  ws.addEventListener("open", () => {
    console.log("We are connected");
  });
};

// maybe usecallback or something like that
export const getMsFromWS = (ws, event) => {
  ws.onmessage = (event) => {
    console.log(event);
    // document.getElementById('messages').innerHTML +=
    //   'Message from server: ' + event.data + "<br>";
  };
};

export const closeWS = (ws) => {
  ws.close();
};

export const onCloseWS = (ws) => {
  ws.onclose = () => {
    console.error("WS closed");
  };
};
