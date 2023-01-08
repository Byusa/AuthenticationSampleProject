import classes from './ProfileForm.module.css';
import { useState, useContext } from 'react';
import AuthContext from '../../store/auth-context';
import { useHistory } from 'react-router-dom';

const ProfileForm = () => {
  const authCtx = useContext(AuthContext)
  const history = useHistory()

  const [newPasswordInput, setNewPasswordInput] = useState('');

  const submitHandler = event =>{
    event.preventDefault()
    console.log(newPasswordInput)
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_FIREBASE_API_KEY}`
    fetch(url, 
      {
        method: "POST",
        body: JSON.stringify({
          idToken:authCtx.token,
          password: newPasswordInput,
          returnSecureToken: true,
        }), 
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        // Assumption: Always succeds!!
        history.replace('/')
      })
  }

  const onChangeHandler = event =>{
    setNewPasswordInput(event.target.value)
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input 
          type='password' 
          id='new-password' 
          value={newPasswordInput} 
          onChange={onChangeHandler}
          />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
