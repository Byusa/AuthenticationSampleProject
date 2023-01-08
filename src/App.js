import { useContext } from 'react'
;import { Switch, Route, Redirect } from 'react-router-dom';
import AuthContext from '../src/store/auth-context';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';

function App() {
  const authCtx = useContext(AuthContext)
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        {!authCtx.isLoggedIn && 
          (<Route path='/auth'>
            <AuthPage />
          </Route>)
        }
       <Route path='/profile'>
          {authCtx.isLoggedIn && (<UserProfile />)}
          {!authCtx.isLoggedIn && (<Route path='/auth'/>)}
        </Route>
        {/* Redirect the user to the homepage if they go a different link */}
        <Route path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
