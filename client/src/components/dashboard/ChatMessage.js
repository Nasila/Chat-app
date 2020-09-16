import React, { useState,useEffect } from 'react';
import { FormControl, Button } from 'react-bootstrap';
import axios from 'axios';
import ChatInput from './ChatInput';
import Messages from './Messages';
import './Dashboard.css';
import './ChatMessage.css';

const ChatMessage = (props) => {
    // const [messages, setMessage] = useState([]);
    // const [showMsg, setShowMsg ] = useState(null);
    // const socket = props.socket;
    // const username = props.name;
    // const chatId = props.id;
    // const curUser = props.currentUser.username;

    const {messages} = props;
    console.log("inside chat", messages);
 
    return(
      <>
      <Messages messages={messages} />  
      </>
    )
}

export default ChatMessage;