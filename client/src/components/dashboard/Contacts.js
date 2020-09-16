import React,{ useState,useEffect,withRouter, useRef } from 'react';
import axios from 'axios';
import InvitedUsers from './InvitedUsers';
import ContactUsers from './ContactUsers';
import './Dashboard.css';

const Contacts = (props) => {

    const {currentUserObj} = props;
    const {activeUsers} = props;
    const userId = props.userId;
    const listOfUsers = props.data;
    const socket = props.socket;
    const [ chatId, setChatId ] = useState('');
    const [ username, setUsername ] = useState('');

const handleChat = (event) => {
  event.preventDefault();
  setChatId(event.currentTarget.id);
  setUsername(event.currentTarget.name);
  console.log("id name:", chatId,username);
  props.handleChat(chatId, username);
};
   
    return (
        <div>
           
          <InvitedUsers listOfUsers={listOfUsers} currentUser={currentUserObj.currentUser} handleClick={currentUserObj.handleClick}/>
        
          <ContactUsers activeUsers={activeUsers} listOfUsers={listOfUsers} currentUser={currentUserObj.currentUser} handleChat={handleChat}/>
          
         </div>
       );

}

export default Contacts;