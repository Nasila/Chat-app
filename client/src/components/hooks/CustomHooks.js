import {useState,useEffect} from 'react';
import axios from 'axios';

export const useFetchCurrectUser = (userId) => {
    const [currentUser, setCurrentUser] = useState({});
    useEffect(() => {
        axios.get(`http://localhost:5000/user/currentUser/${userId}`, {
      headers: { 'Content-Type' : 'application/json'}
      })
      .then(res => {
      
      const data = res.data.result;
      console.log(data);
      setCurrentUser({...data});
      
      })
      .catch(err => {
      if(err && err.response && err.response.data) {
        const error = err.response.data.error;
       console.log("error",error);
      }
      });
      
      },[]);

      const handleClick = (event) => {
        event.preventDefault();
        const inviteId = event.target.name;
        axios.put(`http://localhost:5000/user/updateContact/${userId}`,
        {
          inviteId,
        })
        .then(response => {
          const data = response.data.result;
          console.log("contacts upated", response.data.result);
          setCurrentUser({...data});
        })
        .catch(err => {
          console.log("Error", err);
        })
  
        addContactToInvite(inviteId);
      };
  
      const addContactToInvite = (inviteId) => {
        axios.put(`http://localhost:5000/user/updateInInvite/${inviteId}`,
        {
          userId,
        })
        .then(response => {
          console.log("contact updated in the invited user", response.data.result);
          
        })
        .catch(err => {
          console.log("Error", err);
        })
      
      };
      return {currentUser, handleClick};
};

export const useFectchAvailableUsers = (id) => {
    const [listOfUsers, setUsers] = useState([]);
    useEffect(() => {
      let isMounted = true;
      if(isMounted) {
        const token = localStorage.getItem("CC_Token");
        axios.get(`http://localhost:5000/user/userlist/${id}`, {
          headers: { 'Content-Type' : 'application/json',
          'Authorization': `Bearer ${token}` }
        })
        .then(res => {
          const data = res.data.result;
          setUsers([...data]);
          console.log(data);
        })
        .catch(err => {
          if(err && err.response && err.response.data) {
            const error = err.response.data.error;
           console.log("error",error);
          }
        });
      }

      return () => {
        isMounted = false;
      }
       },[]);
      
       return {listOfUsers};
}


