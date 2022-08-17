import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const Profile = () => {
    const [username, setUsername]= useState("");
    const [listIdea, setListIdea]= useState([]);
    let {id}=useParams();
    useEffect(()=>{
        axios.get(`http://localhost:3001/user/profile/${id}`).then((response)=>{
            setUsername(response.data.username)
        })
        axios.get(`http://localhost:3001/ideas/byuserId/${id}`).then((response)=>{
            setListIdea(response.data)
        })
    }, [])
    let navigate= useNavigate()
  return (
    <div className='profilePAgeContainer'>
        <div className='basicInfo'>
            <h1>Username: {username}</h1>
        </div>
        <div className='basicInfo'>
        {listIdea.map((value, key)=>{
            return <div className="idea" key={value.id} >
              <div className='title'>{value.title}</div>
              <div className='body'  onClick={()=>{navigate(`/idea/${value.id}`)}}>{value.ideaText}</div>
              <div className='footer'>
                <div className='username'> {value.username} </div> 
                
              </div>
            </div>
          })}
        </div>
    </div>
  )
}

export default Profile   



//<div className='buttons'>
//                  <ThumbUpIcon onClick={()=>likeIdea(value.id)} className={likedList.includes(value.id)?"unlikeBtn":"likeBtn"} />
//                 
//
//                  <label>{value.Likes.length}</label>
//                </div>