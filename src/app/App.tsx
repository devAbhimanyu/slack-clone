import { useEffect } from 'react';
import './App.css';
import { Register } from 'components';
import Login from 'features/Auth/Login';
import { Switch, Route, useHistory } from 'react-router-dom';
import firebase from 'firebase';

function App() {
  const navigate = useHistory();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        navigate.push('/');
      } else {
        navigate.push('/login');
      }
    });
  }, []);
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/' render={() => <div>authenticated</div>} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
      </Switch>
    </div>
  );
}

export default App;
