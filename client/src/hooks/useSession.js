import {useEffect, useState} from "react";

export const useSession = () => {
  const [session, setSession] = useState(null);
  const [newMsg, setNewMsg] = useState("");
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    if (authToken) {
      let updates = {};
      updates.ws = connectToWS();
      setSession(updates);
      onSessionOpen(updates);
      onSessionListen(updates);
      onSessionClose(updates);
    }
  }, [authToken]);

  const wsUrl = (path) => {
    let url = new URL(path, window.location.href);
    url.protocol = url.protocol.replace('http', 'ws');

    let params = url.searchParams
    params.append("access_token", authToken)
    url.search = params.toString()
    return url.href
  }

  const connectToWS = () => {
    return new WebSocket(wsUrl('http://127.0.0.1/data-api/incidents/msp/open-incidents/subscribe', authToken));
  }

  const sendAuthToken = (token) => {
    setAuthToken(token)
  };

  const onSessionListen = (updates) => {
    updates.ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      setNewMsg(msg);
    };
  };

  const onSessionOpen = (updates) => {
    updates.ws.onopen = () => {
      console.log("WS Connected");
      updates.heartbeat = setInterval(() => {
        if (updates.ws && updates.ws.readyState === updates.ws.OPEN) {
          updates.ws.send('Listening');
        }
      }, 3000);
    };
  };

  const onSessionClose = (ws) => {
    ws.onclose = () => {
      console.log("WS Disconnected");
    };
  };

  return [session, sendAuthToken, newMsg];
};
