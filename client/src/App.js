import { useState } from "react";
import "./App.css";
import { Input, Button, Label, FormGroup, Container, Form } from "reactstrap";
import { useSession } from "./hooks/useSession";

function App() {
  const [msg, setMsg] = useState("");
  const [msgList, setMsgList] = useState([]);
  const [connection, sendMessage, closeConnection] = useSession();
  console.log({msgList});
  const handleMsg = (e) => {
    setMsg(e.target.value);
  };

  const handleSendMessage = (e) => {
    console.log("ws message");
    e.preventDefault();
    sendMessage(msg);
    // ws.send(msg);
  };

  connection.onmessage = (event) => {
    setMsgList([...msgList, event.data]);
  };

  return (
    <Container>
      <Form onSubmit={handleSendMessage}>
        <FormGroup>
          <Label for="msg">Type something</Label>
          <Input
            id="msg"
            name="msg"
            type="text"
            placeholder="Type something"
            value={msg}
            onChange={handleMsg}
          />
        </FormGroup>
        <Button color="secondary">Send</Button>
      </Form>
    </Container>
  );
}

export default App;
