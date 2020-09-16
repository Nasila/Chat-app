import React, { useState } from 'react';
import { Link, useHistory, withRouter } from 'react-router-dom';
import {
  Form,
    Button,
    FormGroup,
    FormControl,
    ControlLabel,
    HelpBlock
  } from "react-bootstrap";
import './Register.css';
import axios from "axios";
import { Navbar } from "react-bootstrap";

const Register = (props) => {
    const [ username, setUsername ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ errors, setError ] = useState({});
    const [ errorMessage, setMessage ] = useState(false);
    const history = useHistory();
    const style1 = {
      marginBottom: 0,
      width: '100%',
    };
    
      function validateForm() {
        if(username.length < 3) {
          setError({usernameError: "Username must be atleast 4 characters long"});
          return false;
        }
        else if(email.indexOf(".") && email.indexOf("@") == -1) {
          setError({emailError: "!Please enter a valid email"});
          console.log("Error", errors.emailError);
          return false;
        }
          
        else if(password !== confirmPassword) {
          setError({confirmPasswdError: "!Password and Confirm Password doen not match"});
          console.log("Error", errors.confirmPasswdError);
          return false;
        }
          
        else if(password.length < 6) {
          setError({passwdError: "!Password must be atleast 6 characters long"});
          return false;
        }
        else {
          return true;
        }
        
      }
      
      

      // function validateForm() {
      //   return (
      //     email.length > 0 &&
      //     password.length > 5 &&
      //     password === confirmPassword
      //   );
      // }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(validateForm()) {
          axios.post("http://localhost:5000/user/register", {
           username, email, password
       })
       .then(response => {
            history.push('/index');
            console.log(response.data.message);

       })
       .catch(err => {
        setMessage(err.response.data.error)
         console.log(errorMessage);
       })
        }
        

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
        <Form className="SignUp" onSubmit={e => handleSubmit(e)}>
        <FormGroup controlId="username" bsSize="large">
          <ControlLabel>Username</ControlLabel>
          <FormControl
            autoFocus
            type="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <span class="help-block">{errors.usernameError}</span>
        </FormGroup>
        
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <span class="help-block">{errors.emailError}</span>
        </FormGroup>
        <span className="help-block">{errors.emailError}</span>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <span class="help-block">{errors.passwdError}</span>
        </FormGroup>
        
        <FormGroup controlId="confirmPassword" bsSize="large">
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl
            type="password"
            onChange={e => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            required
          />
          <span class="help-block">{errors.confirmPasswdError}</span>
        </FormGroup>
        
        <Button className="btn-submit" bsSize="large" type="submit">
          Sign Up
        </Button>
      </Form>
      </>
    )
}

export default withRouter(Register);