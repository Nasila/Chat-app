import React, { useEffect,useHistory } from 'react';
const history = useHistory();

const Intermediate =() => {
    useEffect(() => {
        const token = localStorage.getItem("CC_Token");
    if(!token) {
        history.push("/login");
    }
    else {
        history.push("/dashboard");
    }
},[]);
    
}

export default Intermediate;