import { useEffect, useState } from "react";

export const useSession = () => {
  const [session, setSession] = useState(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:443/");
    setSession(ws);
    onSessionOpen(ws);
    onSessionListen(ws);
    onSessionClose(ws);
  }, []);

  const sendMessageToWS = (msg) => {
    if (!session) return;
    session.send(msg);
  };

  const onSessionListen = (ws) => {
    ws.onmessage = (event) => {
      setMsg(event.data);
    };
  };

  const onSessionOpen = (ws) => {
    ws.onopen = () => {
      console.log("WS Connected");
    };
  };

  const onSessionClose = (ws) => {
    ws.onclose = () => {
      console.log("WS Disconnected");
    };
  };

  return [session, sendMessageToWS, msg];
};
