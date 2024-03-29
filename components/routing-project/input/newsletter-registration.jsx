import classes from './newsletter-registration.module.css';
import { useRef,useContext } from 'react';
import NotificationContext from '@/store/notification-context';

function NewsletterRegistration() {
  const emailInputRef = useRef();
  const notificationCtx = useContext(NotificationContext);


  function registrationHandler(event) {
    event.preventDefault();

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
    const eneteredEmail = emailInputRef.current.value;

    notificationCtx.showNotification({
      title: 'Signing Up...',
      message:'Registering for newsletter',
      status: 'pending'
    });


   
    fetch('/api/routing-project/newsletter',{
      method:'POST',
      body: JSON.stringify({email:eneteredEmail}),
      headers:{
        'Content-Type':'application/json'
      }
    })
    .then(res=> {
    if(res.ok){
      return res.json();
    }
     //!  in case of fetch API , 400 or 500 status code
    //! does not cause this promise to show error; but we want that
    
    //nested promise used here and returned
    return res.json().then(data => {
      throw new Error(data.message || 'Something went wrong!');
    })
     
    
    })
    .then(data=> {
      console.log(data);
      notificationCtx.showNotification({
        title: 'Success...',
        message:'Successfully registered for newsletter',
        status: 'success'
      });
    }).catch(
      err=>{
        notificationCtx.showNotification({
          title: 'Error...',
          message:err.message || 'Something went wrong!',
          status: 'error'
        });
      }
    )
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
