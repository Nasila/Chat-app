import React from "react";
import axios from "axios";
import { Button, ListGroup, ListGroupItem } from "react-bootstrap";
import "./Dashboard.css";
import AddIcon from '@material-ui/icons/Add';
import io from 'socket.io-client';


const AvailableUsers = (props) => {
    const listOfUsers = props.data;
    const userId = props.userId;
  
    console.log("Available users", listOfUsers);
    //update invites list of the invited id
    const handleClick = (event) =>{
      event.preventDefault();
      const button = event.target;
      const inviteId = event.target.name;
      console.log("button id", inviteId);
      axios.put(`http://localhost:5000/user/addInvites/${inviteId}`, {
         userId,
         approved: false,
     })
     .then((response) => {
       console.log(response.data.message);
       
       button.value = "Invite sent!";
       button.disabled = true;
     })
     .catch((err) => {
       if(err && err.response && err.response.data) {
         
        console.log("error",err);
       }
        
     });
    
    };

   const displayList = listOfUsers.map((user) => {
     console.log("inside display list");
       return (
        
          <ListGroupItem key={user._id} className="list-group">
            <span>{user.username}</span>
            <span>{user.email}</span>
            <Button name={user._id} id="icon-button" onClick = {e =>handleClick(e)}><AddIcon style={{pointerEvents: "none"}}/></Button>
          </ListGroupItem>
        
       );
    
    });
   

   return (
     <div>
        <h4>Available Users</h4>
        {displayList}
      </div>
    );
}

export default AvailableUsers;