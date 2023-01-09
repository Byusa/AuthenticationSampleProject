// import { useState, useRef } from 'react';
import { useState, useContext } from 'react';
import AuthContext from '../../store/auth-context';
import classes from './AuthForm.module.css';
import { useHistory } from 'react-router-dom';

const AuthForm = () => {
  // const emailInputRef = useRef();
  // const passwordInputRef = useRef();
  const history = useHistory()
  const [enteredEmail, setEnteredEmail] = useState('')
  const [enteredPassword, setEnteredPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const authCtx = useContext(AuthContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const emailChangeHandler = event => {
    setEnteredEmail(event.target.value)
  }
  const passwordChangeHandler = event => {
    setEnteredPassword(event.target.value)
  }


  const submitHandler = event => {
    event.preventDefault();

    // const enteredEmail = emailInputRef.current.value;
    // const enteredPassword = passwordInputRef.current.value;

    // Optional validation
    setIsLoading(true);
    let url;
    if(isLogin){
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API_KEY}`
    }else{
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API_KEY}`
    }
      
    fetch(url,
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken:true,
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      ).then( res =>{
        if (res.ok) {
          return res.json();
          // ...
        }else {
          res.json().then(data => {
            // show an error modal
            let errorMessage = "Authentication Failed"
            if (data && data.error && data.error.message){
              errorMessage = data.error.message
            }
            alert(errorMessage)
            throw new Error(errorMessage);
          })
        }
      })
      .then( (data) => { 
        console.log(data)
        const expirationTime = new Date(
          new Date().getTime() + (data.expiresIn * 1000)
        );
        authCtx.login(data.idToken, expirationTime.toISOString()) // keeping the token to useContext
        history.replace('/') // not allow the user to go back to the previous page
      })
      .catch((err) => {
        alert(err.message);
      });
    setIsLoading(false);
  }


  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
        {/* <input type='email' id='email' required ref={emailInputRef}/> */}
        <input type='email' id='email' required value={enteredEmail} onChange={emailChangeHandler}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          {/* <input type='password' id='password' required ref={passwordInputRef}/> */}
          <input type='password' id='password' required value={enteredPassword} onChange={passwordChangeHandler}/>
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <p>Sending request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
