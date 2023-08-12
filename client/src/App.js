import { useState } from "react";
import "./App.css";
import { Input, Button, Label, FormGroup, Container, Form } from "reactstrap";
import { useSession } from "./hooks/useSession";

function App() {
  const [msg, setMsg] = useState("");

  const onOpen = () => {
    console.log("ws open xd");
  };

  const onMessage = () => {
    console.log("ws message xd");
  };

  const onClose = () => {
    console.log("ws close xd");
  };

  useSession(onOpen, onMessage, onClose);

  const handleMsg = (e) => {
    setMsg(e.target.value);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    // ws.send(msg);
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
