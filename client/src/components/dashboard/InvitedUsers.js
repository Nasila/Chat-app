import React, { useState,useEffect } from 'react';
import { Button, ListGroupItem } from "react-bootstrap";

export default function InvitedUsers(props) {
  const [invitedUsers, setInvitedUsers] = useState([]);
  useEffect(() => {
    const {currentUser,listOfUsers} = props;
  
    const invites = currentUser.invites;
    console.log("inside custom hook", invites);
    const invitedUsers = listOfUsers.filter(user => {
      for(let i=0;i<invites.length;i++) {
          if((user._id === invites[i].id) && (invites[i].approved === false))
              return user;
      }

  });
  setInvitedUsers([...invitedUsers]);
  },[]);
    


const displayList = invitedUsers && invitedUsers.map((user) => (
    
           <ListGroupItem key={user._id} className="list-group">
             <span>{user.username}</span>
             <span>{user.email}</span>
             <Button name={user._id} onClick = {e => props.handleClick(e)}>Accept</Button>
           </ListGroupItem>
        ));

    return (
        <div>
            <h4>New Invites</h4>
            {displayList}
        </div>
    );
}


    