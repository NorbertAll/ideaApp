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

function App() {
    const[authState, setAuthState]= useState(false);
    useEffect(()=>{
      axios.get("http://localhost:3001/auth/token", {headers:{
        accessToken:localStorage.getItem('accessToken')
      }}).then((response)=>{
        if(response.data.error){
          setAuthState(false);
        }else{
          setAuthState(true);
        }
      })
        
      
    }, [])

  
    return (
    
    <div className="App">
      <AuthContext.Provider value={{authState, setAuthState}}>
        <Router>
          <div className='nav'>
            <Link to="/createidea">Nowy pomysł</Link>
            <Link to="/">Strona Główna</Link>
            {!authState&&(<>
            <Link to="/login">Login</Link>
            <Link to="/registration">Registraion</Link>
            </>)}
          </div>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/createidea" element={<CreateIdea/>}/>
            <Route path="/idea/:id" element={<Idea/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/registration" element={<Registration/>}/>
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
