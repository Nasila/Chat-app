import React,{useState, useEffect} from 'react';
import AvailableUsers from './AvailableUsers';
import Contacts from './Contacts';
import { useFetchCurrectUser, useFectchAvailableUsers } from '../hooks/CustomHooks';
import { Tabs, Tab, Col, ListGroup, InputGroup, FormControl, Button } from 'react-bootstrap';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import './Dashboard.css';
import ChatMessage from './ChatMessage';
import {withRouter} from "react-router-dom";
import LoaderBar from './LoaderBar';
import ChatInput from './ChatInput';
import axios from 'axios';

const Dashboard =(props) => {
  const socket = props.socket;
  const {id, name} = props.location.state;
  const listOfUsersObj = useFectchAvailableUsers(id);
  const currentUserObj = useFetchCurrectUser(id);
  const currentUser = currentUserObj.currentUser;
  const listOfUsers = listOfUsersObj.listOfUsers;
  const [ username, setUsername ] = useState('');
  const [ chatId, setChatId ] = useState('');
  const [ activeUsers, setActiveUsers ] = useState([]);
  const [ showChat,setShowChat ] = useState(null);
  const [ messages, setMessage] = useState([]);
  const [ showMsg, setShowMsg ] = useState(false);
  const style1 = {
    fontSize: '90%',
    marginLeft: 0,
    textAlign: 'center',
    marginRight: 0,
    width: '100%'
};
const [isLoaded, setIsLoaded] = useState(false);
  
useEffect(() => {
  setTimeout(() => {
    setIsLoaded(true);
  }, 3000);
}, []);

useEffect(() => {
  if(socket) {
   socket.on('online', ({onlineUsers}) => {
     
      setActiveUsers(activeUsers.concat(onlineUsers));
   });

   socket.on('private-chat', message => {
    console.log("private chat", message.username+message.message);
    addMessage(message);
  });
  }
  return () => {
    if(socket) {
      socket.emit('disconnect', {
        id,
      });
      socket.off();
    }
    
  }
 
},[]);

console.log("online:", activeUsers);

 const handleChat = (id,name) => {
  console.log("chat Id username:",chatId, username);
  setChatId(id);
  setUsername(name);
  setMessage([]);
  setShowMsg(false);
  setShowChat(true);
} 
 

const sendMessage =(message) => {
  const curUser = currentUser.username;
  if(message !== " ") {
  const messageObject = {
    username: username,
    message
  };

  // Emit the message to the server
  socket.emit('private_chat', messageObject);
  messageObject.fromMe = true;
 addMessage(messageObject);

  const addMessage = (message) => {
      // Append the message to the component state
      setMessage(msgs => [...msgs,message]);
      setShowMsg(true);
    };
    axios.post("http://localhost:5000/user/addMessage", {
           curUser,username, message
       })
       .then(response => {
            console.log(response.data.result);

       })
       .catch(err => {
         console.log("error", err);
       })
    }
};
    console.log(messages,messages.length);

return ( <>
  {isLoaded ?   
  <div className = "main-container">
   
    <Col sm={4} className="left-container">
    
      <Tabs defaultActiveKey="new" id="noanim-tab-example" style={style1}>
        <Tab eventKey="new" title="Add Contacts">

          <AvailableUsers data={listOfUsers} userId={id} />
        
        </Tab>
        <Tab eventKey="contact" title="Contacts">
            <Contacts data={listOfUsers} currentUserObj={currentUserObj} userId={id} activeUsers={activeUsers} handleChat={handleChat}/>
        </Tab>
      </Tabs>
    </Col>
    <Col sm={8} className="right-container" id="right">
      <h1>Hi {name} Welcome to Chit-Chat</h1>
      <div className="mesgs" id="messageList">
        <div className="msg_history">
          {showMsg ? <ChatMessage messages={messages}/> : null}  
        </div>
      </div>
      {showChat ? <ChatInput onSend={sendMessage}/> : null}
     
    </Col>
  </div> : <LoaderBar/>}
</>)

  }
export default withRouter(Dashboard);