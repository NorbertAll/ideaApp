import React, {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";

function Idea() {
    let {id} =useParams();
    const [ ideaObject, setIdeaObject]= useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    useEffect(()=>{
        axios.get(`http://localhost:3001/ideas/byId/${id}`).then((response)=>{
            setIdeaObject(response.data)
         });
         axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
          setComments(response.data);
        }); 
   }, [])
        const addComment = () => {
          axios
            .post("http://localhost:3001/comments", {
              commentBody: newComment,
              IdeaId: id,
            }, {headers:{
              accessToken: localStorage.getItem("accessToken")
            }})
            .then((response) => {
              if(response.data.error){
                console.log(response.data.error)
              }else{
              const commentToAdd = { commentBody: newComment ,username:response.data.username};
              setComments([...comments, commentToAdd]);
              setNewComment("");}
            });
        };
      
   
  return (
    <div className='ideaPage'>
        <div className='ideax'>
            <div className='titlex'>Nazwa Pomysłu: <b>{ideaObject.title}</b></div>
            <div className='ideaTextx'>Opis Pomysłu: <b>{ideaObject.ideaText}</b></div>
            <div className='usernamex'>Autor Pomysłu: <b>{ideaObject.username}</b></div>
        </div>
        <hr/>
        <div className="commentx">
        <div className="addCommentContainer">
          <input
            type="text"
            placeholder="Comment..."
            value={newComment}
            onChange={(event) => {
              setNewComment(event.target.value);
            }}
          /><br/>
          <button onClick={addComment}> Add Comment</button>
        </div>
        <div className="listOfComments">
          {comments.map((comment, key) => {
            return (
              <div key={key} className="comment">
                {comment.commentBody}<br/>
                <label>Username:{comment.username}</label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default Idea