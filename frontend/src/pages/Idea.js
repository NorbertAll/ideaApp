import React, {useEffect, useState, useContext} from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from '../helpers/AuthContext';

function Idea() {
    let {id} =useParams();
    const [ ideaObject, setIdeaObject]= useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const {authState}=useContext(AuthContext)

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
      
  const deleteComment=(id)=>{
    axios.delete(`http://localhost:3001/comments/${id}`, {headers:{
      accessToken: localStorage.getItem("accessToken")
    }})
    .then(()=>{
      setComments(comments.filter((val)=>{
        return val.id!=id;
        
      }));
   });
  }
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
                {authState.username===comment.username&& <button onClick={()=>{deleteComment(comment.id)}}>X</button>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default Idea