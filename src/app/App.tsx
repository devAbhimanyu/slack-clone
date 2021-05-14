import { useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Register, Spinner } from 'components';
import { Login, setUser } from 'features/Auth/';
import { RootReducer, AuthState } from 'types';
import firebase from 'firebase';
import './App.css';

function App() {
  const navigate = useHistory();
  const dispatch = useDispatch();
  const { loader } = useSelector<RootReducer, AuthState>((state) => state.auth);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const { uid, displayName, photoURL, email, emailVerified } = user;
        dispatch(setUser({ uid, displayName, photoURL, email, emailVerified }));
        navigate.push('/');
      } else {
        navigate.push('/login');
      }
    });
  }, []);
  return (
    <div className='App'>
      {loader ? (
        <Spinner displayText='Getting ready ...' />
      ) : (
        <Switch>
          <Route exact path='/' render={() => <div>authenticated</div>} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
        </Switch>
      )}
    </div>
  );
}

export default App;
