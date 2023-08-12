import { useEffect, useState } from "react";

export const useSession = (onOpen, onMessage, onClose) => {
  const ws = new WebSocket("ws://localhost:443/");
  const [session] = useState(ws);

  const updateOpenHandler = () => {
    if (!session) return;
    session.addEventListener("open", onOpen);
    return () => {
      session.removeEventListener("open", onOpen);
    };
  };

  const updateMessageHandler = () => {
    if (!session) return;
    session.addEventListener("message", onMessage);
    return () => {
      session.removeEventListener("message", onMessage);
    };
  };

  const updateCloseHandler = () => {
    if (!session) return;
    session.addEventListener("close", onClose);
    return () => {
      session.removeEventListener("close", onClose);
    };
  };

  useEffect(updateOpenHandler, [session, onOpen]);
  useEffect(updateMessageHandler, [session, onMessage]);
  useEffect(updateCloseHandler, [session, onClose]);
};
