import {useEffect, useState} from "react";
import "./App.css";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import {useSession} from "./hooks/useSession";

function App() {
  const [msg, setMsg] = useState("");
  const [msgList, setMsgList] = useState([]);
  const [connection, sendAuthToken, sessionMsg] = useSession();

  useEffect(() => {
    if (sessionMsg) {
      setMsgList([...msgList, sessionMsg])
    }
  }, [sessionMsg])

  const handleMsg = (e) => {
    setMsg(e.target.value);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    console.log("Token send");
    sendAuthToken(msg);
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
