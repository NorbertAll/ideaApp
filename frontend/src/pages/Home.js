import React, { useContext } from 'react'
import axios from "axios";
import {useEffect, useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { AuthContext } from '../helpers/AuthContext';


function Home() {
    const {authState}=useContext(AuthContext)
    const [listOfIdeas, setListOfIdeas]=useState([]);
    const [likedList, setLikedList]=useState([]);
    let navigate=useNavigate();
    
  useEffect(()=>{
     axios.get("http://localhost:3001/ideas", {headers: {accessToken:localStorage.getItem("accessToken")}}).then((response)=>{
        setListOfIdeas(response.data.listOfIdeas)
        setLikedList(response.data.likedIdea.map((like)=>{return like.IdeaId}))
        
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
        }));
        if(likedList.includes(ideaId)){
          setLikedList(likedList.filter((id)=>{
            return id != ideaId
          }))
        }else{
          setLikedList([...likedList, ideaId])
        }
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
                <div className='username'><Link to ={`/profile/${value.id}`}> {value.username} </Link></div> 
                <div className='buttons'>
                  <ThumbUpIcon onClick={()=>likeIdea(value.id)} className={likedList.includes(value.id)?"unlikeBtn":"likeBtn"} />
                 

                  <label>{value.Likes.length}</label>
                </div>
              </div>
            </div>
          })}
        </div>
    </div>
  )
}

export default Home