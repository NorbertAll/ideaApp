
import './App.css';
import axios from "axios";
import {useEffect, useState} from "react"
function App() {
  const [listOfIdeas, setListOfIdeas]=useState([]);
  useEffect(()=>{
     axios.get("http://localhost:3001/ideas").then((response)=>{
        setListOfIdeas(response.data)
     }) 
    }, [])
    return (
    
    <div className="App">
      <header className="App-header">
       
        <p>
          {listOfIdeas.map((value, key)=>{
            return <div className="idea">
              <div className='title'>{value.title}</div>
              <div className='body'>{value.ideaText}</div>
              <div className='footer'>{value.username}</div>
            </div>
          })}

        </p>

      </header>
    </div>
  );
}

export default App;
