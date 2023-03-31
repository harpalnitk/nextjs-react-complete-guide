import { useRef,useState } from "react";
import Link from 'next/link';


function HomePage(){
const emailInputRef = useRef();
const feedbackInputRef= useRef();
const [message,setMessage] = useState();
const [feedbackItems,setFeedbackItems] = useState([]);



const submitHandler =()=>{

 
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;
    const reqBody = {email:enteredEmail,text:enteredFeedback}

    fetch('/api/feedback',{
        method:'POST',
        body:JSON.stringify(reqBody),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(
        res=> res.json()
    ).then(
        data => {
            console.log(data);
           setMessage(data.message);
        }
    ).catch(
        err=> console.log(err)
    )

}

const loadFeedbackHandler = ()=>{
    fetch('/api/feedback').then(
        res=> res.json()
    ).then(
        data => {
           console.log(data);
           setFeedbackItems(data.feedback);
        }
    ).catch(
        err=> console.log(err)
    ) 
}

    return(
        <div className="center">
            <h1>The Server Project</h1>
            <form onSubmit={submitHandler}>
                <div>
                    {message}
                </div>
              <div>
                <label htmlFor="email">Your Email Address</label>
                <input type="email" id='email' ref={emailInputRef}/>
              </div>
              <div>
                <label htmlFor="feedback">Your Feedback</label>
                <textarea rows="5" id='feedback' ref={feedbackInputRef}/>
              </div>
              <button type="submit">Send Feedback</button>
            </form>
            <hr/>
            <Link href="/server-project/feedback">View All Feedbacks in Separate Page</Link>
            <button onClick={loadFeedbackHandler}>Load All Feedback here</button>
            <ul>
                {
                    feedbackItems.map(item=><li key={item.id}>{item.feedback}</li>)
                }
            </ul>
        </div>
    )
}

export default HomePage;