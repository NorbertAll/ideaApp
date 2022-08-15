import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from 'react-router-dom';
import Home from './pages/Home';
import CreateIdea from './pages/CreateIdea';
import Idea from './pages/Idea';
import Login from './pages/Login';
import Registration from './pages/Registration';
import { AuthContext } from './helpers/AuthContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PageNoteFound from './pages/PageNoteFound';

function App() {
    const[authState, setAuthState]= useState({username: "", id:0, status:false});
    useEffect(()=>{
      axios.get("http://localhost:3001/auth/token", {headers:{
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
    
    <div className="App">
      <AuthContext.Provider value={{authState, setAuthState}}>
        <Router>
          <div className='navbar'>
            <Link to="/createidea">Nowy pomysł</Link>
            <Link to="/">Strona Główna</Link>
            {!authState.status ?(<>
            <Link to="/login">Login</Link>
            <Link to="/registration">Registraion</Link>
            </>): (
              <div className='loggedInContainer' >
              <h1>{authState.username}</h1>
              {authState.status &&<button onClick={logout}>Logout</button>}
              </div>
            )}
            
          </div>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/createidea" element={<CreateIdea/>}/>
            <Route path="/idea/:id" element={<Idea/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/registration" element={<Registration/>}/>
            <Route path="/*" exact element={<PageNoteFound/>}/>
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
