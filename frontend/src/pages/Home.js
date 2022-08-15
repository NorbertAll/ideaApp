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
    }, []);

  const likeIdea= (ideaId)=> {
    axios.post("http://localhost:3001/likes", {IdeaId: ideaId}, {headers: {accessToken:localStorage.getItem("accessToken")}}).then((response)=>{
      
        setListOfIdeas(listOfIdeas.map((idea)=>{
          if(idea.id===ideaId){
            if(response.data.liked===true){
              return {...idea, Likes: [...idea.Likes, 0]}
            }else{
             const likeArray=idea.Likes
             likeArray.pop()
              return {...idea, Likes: likeArray}
            }
            
          }else{
            return idea
          }
        }))
     }) 
  }

  return (
    <div>
        <div className="content">
        {listOfIdeas.map((value, key)=>{
            return <div className="idea" key={value.id} >
              <div className='title'>{value.title}</div>
              <div className='body'  onClick={()=>{navigate(`/idea/${value.id}`)}}>{value.ideaText}</div>
              <div className='footer'>
                {value.username} 
                <button onClick={()=>likeIdea(value.id)}>
                  {" "}
                  Like
                </button>
                <label>{value.Likes.length}</label>
              </div>
            </div>
          })}
        </div>
    </div>
  )
}

export default Home