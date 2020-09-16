import React from 'react';
import './Dashboard.css';
import './ChatMessage.css';

export default function Message (props) {
    const { username,message } = props;
    const fromMe = props.fromMe ? true : false;
    console.log("inside message", message);
return (
    <div className={fromMe ? "outgoing_msg" : "incoming_msg"}>
        <div className={fromMe ? "sent_msg" : "received_msg"}>
            <div className="received_withd_msg">
            <p>{message}</p>
            <span className="time_date"> {Date().toString}</span>
            </div> 
        </div>
    </div>
)
}



// <div className="mesgs">
//           <div className="msg_history">
//             <div className="incoming_msg">
//              <div className="received_msg">
//                 <div className="received_withd_msg">
//                   <p>Test which is a new approach to have all
//                     solutions</p>
//                   <span className="time_date"> 11:01 AM    |    June 9</span>
//                 </div>
//               </div>
//             </div>
//             <div className="outgoing_msg">
//                 <div className="sent_msg">
//                     <p>Test which is a new approach to have all
//                     solutions</p>
//                     <span className="time_date"> 11:01 AM    |    June 9</span> 
//                 </div>
//             </div>
//             <div className="outgoing_msg">
//               {submitted? renderSentMessage(): ''}
//             </div>
//             <div className="incoming_msg">
//               <div className="received_msg">
                
//                   {recMessage.map(msg => (
//                     <div className="received_withd_msg">
//                     <p>{msg}</p>
//                   <span className="time_date"> {Date().toString()}</span>
//                   </div>
//                   ))}  
                
//               </div>
//             </div>
            
           
//             </div>
//     )