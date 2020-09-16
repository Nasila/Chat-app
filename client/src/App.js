import React,{ useState } from 'react';
import "./App.css";
import Routes from "./routes";
import io from "socket.io-client";

function App() {
  const [socket, setSocket] = useState(null);
  const setupSocket = () => {
    const token = localStorage.getItem("CC_Token");
    if(token && !socket) {
      const newSocket = io("http://localhost:5000", {
      query: {
        token: localStorage.getItem("CC_Token") 
      },
    });

    newSocket.on("disconnect", () => {
      setSocket(null);
      setTimeout(setupSocket, 3000);
      console.log("error", "Socket disconnected!");
    });

    newSocket.on("connect", () => {
      console.log("success", "Socket connected!");
    });

    
    setSocket(newSocket);
    }
    
  };

  React.useEffect(()=> {
    setupSocket();
   
  },[]);
 
  return (
    <div className="App container">
      <Routes socket={socket} setupSocket={setupSocket}/>
    </div>
  );
}

export default App;
