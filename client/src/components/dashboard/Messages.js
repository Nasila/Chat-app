import React, { useState,useEffect } from 'react';
import './ChatMessage.css';
import Message from './Message';

function Messages(props) {
    
    const {messages} = props;
    useEffect(() => {
    const objDiv = document.getElementById('messageList');
    objDiv.scrollTop = objDiv.scrollHeight;
    });

    console.log("inside messages",messages);
    const messageBar = messages.map((item,i) => {
      const me = item.fromMe ? true : false;
      const curTime = new Date().toLocaleString();
      console.log("from me", me,item.message);
        return (
          <div key={i} className={me ? "outgoing_msg" : "incoming_msg"}>
            <div className={me ? "sent_msg" : "received_msg"}>
              <div className="received_withd_msg">
                <p>{item.message}</p>
                <span className="time_date"> {curTime}</span>
            </div> 
        </div>
    </div>
        );
      });

    return ( <div id="messageList">
              { messageBar }
            </div>
    );
  }

  export default Messages;