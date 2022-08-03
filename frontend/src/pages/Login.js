import axios from "axios";
import React, { useState } from "react";

const Login = () => {
    const [username, setUsername]=useState("");
    const [password, setPassword]=useState("");
    const login=()=>{
        const data={username:username, password:password};
        console.log(data);
        axios.post("http://localhost:3001/auth/login", data).then((response) => {
            console.log(response.data);
        });
    }
  return (
    <div className="loginContainer">
        <label>Username:</label>
        <input type="text" onChange={(event)=>{setUsername(event.target.value);}}/>
        <label>Password:</label>
        <input type="password" onChange={(event)=>{setPassword(event.target.value);}}/>
        <button onClick={login}>Login</button>
    </div>

  );
};

export default Login;
