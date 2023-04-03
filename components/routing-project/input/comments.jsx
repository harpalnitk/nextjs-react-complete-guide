import { useState, useEffect, useContext } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from '@/store/notification-context';

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isFetchingComments, setIsFetchingComments] = useState(false);
  const notificationCtx = useContext(NotificationContext);

  useEffect(() => {
    if (showComments) {
      setIsFetchingComments(true);
      fetch(`/api/routing-project/comments/${eventId}`)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          //!  in case of fetch API , 400 or 500 status code
          //! does not cause this promise to show error; but we want that
          //nested promise used here and returned
          return res.json().then((data) => {
            throw new Error(data.message || 'Something went wrong!');
          });
        })
        .then((data) => {
          console.log('data', data);
          setComments(data.comments);
          setIsFetchingComments(false);
        })
        .catch((err) => {
          setIsFetchingComments(false);
          notificationCtx.showNotification({
            title: 'Error!',
            message: err.message || 'Something went wrong!',
            status: 'error',
          });
        });
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
    //the above line will not be executed immediately by react
    //it will only be done after below code is
    //executed in the next render cycle
  }

  function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: 'Sending Comment...',
      message: 'Your comment is currently being stored',
      status: 'pending',
    });
    // send data to API
    fetch(`/api/routing-project/comments/${eventId}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        //!  in case of fetch API , 400 or 500 status code
        //! does not cause this promise to show error; but we want that

        //nested promise used here and returned
        return res.json().then((data) => {
          throw new Error(data.message || 'Something went wrong!');
        });
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: 'Success...',
          message: 'Comment added successfully!',
          status: 'success',
        });
        console.log(data);
      })
      .catch((err) => {
        notificationCtx.showNotification({
          title: 'Error!',
          message: err.message || 'Something went wrong!',
          status: 'error',
        });
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && <CommentList items={comments} />}
    {showComments && isFetchingComments && <p>Loading...</p>}
    </section>
  );
}

export default Comments;
