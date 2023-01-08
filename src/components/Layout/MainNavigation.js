import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import classes from './MainNavigation.module.css';
// import { useHistory } from 'react-router-dom';

const MainNavigation = () => {
  const authCtx = useContext(AuthContext)
  console.log(authCtx)
  const isLoggedIn = authCtx.isLoggedIn
  console.log(isLoggedIn)
  // const history = useHistory()


  const onLogoutHandler = () =>{
    authCtx.logout()
    // history.replace('/auth') // 
  }

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to='/auth'>Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to='/profile'>Profile</Link>
            </li>
          )}
          {isLoggedIn && (
          <li>
            <button onClick={onLogoutHandler}>Logout</button>
          </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
