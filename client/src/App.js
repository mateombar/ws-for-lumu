import {useEffect, useState} from "react";
import "./App.css";
import {Button, Card, CardBody, CardHeader, CardText, Container, Form, FormGroup, Input, Label} from "reactstrap";
import {useSession} from "./hooks/useSession";
import {IncidentMutedItem} from "./components/IncidentMutedItem";
import {IncidentUnmutedItem} from "./components/IncidentUnmutedItem";
import {IncidentCommentItem} from "./components/IncidentCommentItem";

function App() {
  const [msg, setMsg] = useState("");
  const [msgList, setMsgList] = useState([]);
  const [connection, sendAuthToken, sessionMsg] = useSession();
  console.log({msgList})

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
    <Container className="py-5">
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
      <Card className="mt-5">
        <CardHeader>
          <CardText>New messages</CardText>
        </CardHeader>
        <CardBody>
          <ul>
            {
              msgList.map(item => <SessionMsgItem item={item}/>)
            }
          </ul>
        </CardBody>
      </Card>
    </Container>
  );
}

export default App;

const SessionMsgItem = ({item}) => {
  let msg = {};
  switch (Object.keys(item)[0]) {
    // case 'NEW-INCIDENT':
    //   msg = {title: 'NEW-INCIDENT', body: msg["NewIncidentCreated"]}
    //   break;
    // case 'IncidentClosed':
    //   dispatch({type: 'INCIDENT-CLOSED', payload: msg["IncidentClosed"]});
    //   break;
    case 'IncidentMuted':
      return <IncidentMutedItem msg={item['IncidentMuted']}/>
    case 'IncidentUnmuted':
      return <IncidentUnmutedItem msg={item['IncidentUnmuted']}/>
    case 'IncidentCommentAdded':
      return <IncidentCommentItem msg={item['IncidentCommentAdded']}/>
    // case 'OpenIncidentsStatusUpdated':
    //   dispatch({type: 'INCIDENT-STATUS-UPDATED', payload: msg["OpenIncidentsStatusUpdated"]});
    //   break;
    // case 'IncidentAssigned':
    //   dispatch({type: 'INCIDENT-ASSIGNED', payload: msg["IncidentAssigned"]});
    //   break;
    // case 'IncidentMarkedAsRead':
    //   dispatch({type: 'INCIDENT-MARKED-AS-READ', payload: msg["IncidentMarkedAsRead"]});
    //   break;
    default:
      return null
  }
}