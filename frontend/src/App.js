import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate
} from 'react-router-dom';
import Home from './pages/Home';
import CreateIdea from './pages/CreateIdea';
import Idea from './pages/Idea';
import Login from './pages/Login';
import Registration from './pages/Registration';
import { AuthContext } from './helpers/AuthContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
//import Button from '@mui/material/Button';
import Profile from './pages/Profile';
import Button from 'react-bootstrap/Button';

function App() {
    const[authState, setAuthState]= useState({username: "", id:0, status:false});
   
    useEffect(()=>{
      axios.get("http://localhost:3001/user/token", {headers:{
        accessToken:localStorage.getItem('accessToken')
      }}).then((response)=>{
        if(response.data.error){
          setAuthState({username: "", id:0, status:false});
        }else{
          setAuthState({
            username: response.data.username, 
            id:response.data.id, 
            status:true
          });
        }
      })
        
      
    }, [])

    const logout=()=>{
        localStorage.removeItem("accessToken");
        setAuthState({username: "", id:0, status:false});
        
    }
    return (
    
    <div className="app">
      <AuthContext.Provider value={{authState, setAuthState}}>
        <Router>
          <div className='navbar'>

           
            {!authState.status ?(<div>
            <Link to="/login">Login</Link>
            <Link to="/registration">Registraion</Link>
            </div>): ( 
            <>
            <div>
            <Link to="/createidea">Nowy pomysł</Link>
            <Link to="/">Strona Główna</Link>
            </div>
              <div className='loggedInContainer' >
              <h1>{authState.username}</h1>
              {authState.status &&<Button variant="outline-danger" onClick={logout}>Logout</Button>}
              </div></>
            )}
            
          </div>
          <Routes>
          {!authState.status ?(<> 
            <Route path="/login" element={<Login/>}/>
            <Route path="/registration" element={<Registration/>}/>
            <Route path="/*" exact element={<Login/>}/>
            </>): ( 
            <>
            <Route path="/" element={<Home/>}/>
            <Route path="/createidea" element={<CreateIdea/>}/>
            <Route path="/idea/:id" element={<Idea/>}/>
            <Route path="/profile/:id" element={<Profile/>}/>
            <Route path="/*" exact element={<Home/>}/>
            </>)}
           
            
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
