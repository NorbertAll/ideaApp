import React, {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";

function Idea() {
    let {id} =useParams();
    const [ ideaObject, setIdeaObject]= useState({});
    useEffect(()=>{
        axios.get(`http://localhost:3001/ideas/byId/${id}`).then((response)=>{
            setIdeaObject(response.data)
         }) 
    })
  return (
    <div className='ideaPage'>
        <div className='ideax'>
            <div className='titlex'>Nazwa Pomysłu: <b>{ideaObject.title}</b></div>
            <div className='ideaTextx'>Opis Pomysłu: <b>{ideaObject.ideaText}</b></div>
            <div className='usernamex'>Autor Pomysłu: <b>{ideaObject.username}</b></div>
        </div>
        <hr/>
    </div>
  )
}

export default Idea