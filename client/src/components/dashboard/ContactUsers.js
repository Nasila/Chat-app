import React from 'react';
import './Dashboard.css';
import { ListGroupItem } from "react-bootstrap";
import { green } from '@material-ui/core/colors';

export default function ContactUsers(props) {
    const {currentUser,listOfUsers,activeUsers} = props;
    const contacts = currentUser.contacts;
    
    console.log("contacts:",contacts);
    console.log("type of", typeof listOfUsers);
    const contactUsers = listOfUsers.filter(user => {
      for(let i=0;i<contacts.length;i++) {
          if(user._id === contacts[i].id)
              return user;
      }
  });
  console.log("active users", activeUsers);
  
 
  const displayList = contactUsers && contactUsers.map((user) => {
    let style= {};
    if(activeUsers.indexOf(user._id) !== -1) {
      console.log("active");
      style={
        background: "#a1dd70",
        
      }
    }
    return (
       <ListGroupItem name={user.username} id={user._id} key={user._id} className="list-group" onClick={e =>props.handleChat(e)} style={style}>
         
            <span className="click">{user.username}</span>
            <span className="click">{user.email}</span>
         
       </ListGroupItem>
    )
  });
  
  return (
    <div>
        <h4>Your contacts</h4>
        {displayList}
    </div>
  );
  
  } 