import React, {useEffect, useState, useContext} from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from '../helpers/AuthContext';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';


function Idea() {
    let {id} =useParams();
    const [ ideaObject, setIdeaObject]= useState({});
    const [comments, setComments] = useState([]);
    
    const [newComment, setNewComment] = useState("");
    const {authState}=useContext(AuthContext)
    let navigate=useNavigate()
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

  const deleteIdea=(id)=>{
    axios.delete(`http://localhost:3001/ideas/${id}`, {headers:{
      accessToken: localStorage.getItem("accessToken")
    }})
    .then((response)=>{
      alert(response.data)
      navigate("/")
   });
  }


  return (
    <div className='ideaPage'>
        <div className='ideax'>
          {authState.username===ideaObject.username&&(<HighlightOffIcon onClick={()=>{deleteIdea(ideaObject.id)}} className='delicon'/>)}
            <div className='title'>

              
              <div className='titleName'>{ideaObject.title}</div>
              
            </div>
            <div className='body'>{ideaObject.ideaText}</div>
            <div className='footer'>{ideaObject.username}</div>
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
                {authState.username===comment.username && <HighlightOffIcon className='delCom' onClick={()=>{deleteComment(comment.id)}}/>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default Idea