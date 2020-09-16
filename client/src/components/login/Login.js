import React, { useState } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Link, useHistory, withRouter } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import './Login.css';
import axios from "axios";


const Login = (props) => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ errorMessage, setMesssage ] = useState('');
    const socket = props.socket;
    const style1 = {
      marginBottom: 0,
      width: '100%',
    };
    //const history = useHistory();

    function validateForm() {
        return email.length > 0 && password.length > 0;
      }

    const handleSubmit = (event) => {
      event.preventDefault();
        axios.post("http://localhost:5000/user/login", {
           email, password
       })
       .then((response) => {
         const {id,name,token} = response.data;
        if(token) {
          localStorage.setItem("CC_Token", token);
          props.history.push({
            pathname: '/dashboard',
            state: {id: id,
            name: name}
          }); 
          props.setupSocket();     
          socket.emit('join', {id});
        }
       })
       .catch((err) => {
         if(err && err.response && err.response.data) {
           setMesssage(err.response.data.error);
          console.log("error",errorMessage);
         }
          
       })
    }

    return (
      <>
       <Navbar sticky="top" collapseOnSelect style={style1}>
        <Navbar.Header>
          <Navbar.Brand>
            Chit-Chat
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
      <div className={errorMessage? "showMessage": ""}>
        <p id="#messsage">{errorMessage}</p>
      </div>
        <div className="Login">
      <form onSubmit={e => handleSubmit(e)}>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button className="btn-submit" bsSize="large" disabled={!validateForm()} type="submit">
          Login
        </Button>
        
      </form>
      <footer>
        <span>New User?</span>
        <Link to="/register">Sign Up</Link>
      </footer>
    </div>
    </>
    );
}

export default withRouter(Login);