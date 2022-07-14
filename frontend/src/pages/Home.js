import React from 'react'
import axios from "axios";
import {useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
function Home() {

    const [listOfIdeas, setListOfIdeas]=useState([]);
    let navigate=useNavigate();
    
  useEffect(()=>{
     axios.get("http://localhost:3001/ideas").then((response)=>{
        setListOfIdeas(response.data)
     }) 
    }, [])
  return (
    <div>
        <div className="content">
        {listOfIdeas.map((value, key)=>{
            return <div className="idea" key={value.id} onClick={()=>{navigate(`/idea/${value.id}`)}}>
              <div className='title'>{value.title}</div>
              <div className='body'>{value.ideaText}</div>
              <div className='footer'>{value.username}</div>
            </div>
          })}
        </div>
    </div>
  )
}

export default Home