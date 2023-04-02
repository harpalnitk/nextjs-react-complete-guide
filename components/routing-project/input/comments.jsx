import { useState,useEffect } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments,setComments] = useState([]);

  useEffect(()=>{
    if(showComments){
fetch(`/api/routing-project/comments/${eventId}`)
.then(res=>res.json())
.then(data=>{
  console.log('data',data);
  setComments(data.comments);
})
    }
  },[showComments])

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
    //the above line will not be executed immediately by react
    //it will only be done after below code is 
    //executed in the next render cycle
  }

  function addCommentHandler(commentData) {
    // send data to API
    fetch(`/api/routing-project/comments/${eventId}`,{
      method:'POST',
      body: JSON.stringify(commentData),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(res=>res.json())
    .then(data=>console.log(data));
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments}/>}
    </section>
  );
}

export default Comments;
