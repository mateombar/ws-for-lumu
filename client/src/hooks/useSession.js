import { useEffect, useState } from "react";

export const useSession = () => {
  const ws = new WebSocket("ws://localhost:443/");
  const [session] = useState(ws);

  const updateOpenHandler = () => {
    if (!session) return;
    session.addEventListener("open", () => {
      console.log("ws open and connected");
    });
    return () => {
      session.removeEventListener("open", () => {});
    };
  };

  const sendMessage = (msg) => {
    if (!session) return;
    session.send(msg);
  };

  const updateCloseHandler = () => {
    if (!session) return;
    session.addEventListener("close", () => {
      session.close();
      console.log("ws closed");
    });
    return () => {
      session.removeEventListener("close", () => {
        console.log("removed event listenner");
      });
    };
  };

  useEffect(updateOpenHandler, [session]);
  // useEffect(updateCloseHandler, [session]);

  return [session, sendMessage, updateCloseHandler];
};
