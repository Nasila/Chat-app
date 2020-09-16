import React,{useState} from 'react';
import { FormControl, Button } from 'react-bootstrap';

function ChatInput (props) {
    const [chatInput, setChatInput] = useState('');
  
 const submitHandler = (event) => {
    event.preventDefault();
    props.onSend(chatInput);
    setChatInput('');
  };

  const handleChange = (event) => {
    setChatInput(event.target.value);
  };

    return (
    <div className = "msg-bar">
            <FormControl
            placeholder="Write a message.."
            aria-label="message"
            onChange ={handleChange}
            value={chatInput}
            style={{width:'90%', padding: '10px', borderRadius: '10px' }}
            />
            <Button onClick={submitHandler} style={{background:'none', display: 'inline', height: '40px', border: 'none', outline: 'none'}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" 
            viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
            </Button>
        </div>
    )
}

export default ChatInput;