import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/login/Login';
import Chat from './components/chat/Chat';
import Register from './components/register/Register';
import Home from './components/home/Home';
import Dashboard from './components/dashboard/Dashboard';

export default function Routes(props) {
    return (
    <Switch>
        <Route path='/index' component={Home} exact/>
        <Route path='/register' component={Register} exact/>
        <Route path='/' render={()=> <Login setupSocket={props.setupSocket} socket={props.socket}/>} exact/>
        <Route path='/dashboard' render={()=> <Dashboard socket={props.socket}/>} exact/>
    </Switch>
    );
}
 
 
