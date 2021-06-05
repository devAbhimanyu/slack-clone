import { useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Register, Spinner } from 'components';
import { Login, setUser, closeLoader } from 'features/Auth/';
import { RootReducer, AuthState } from 'types';
import firebase from 'config/firebase';
import './App.css';
import Home from 'features/Home/Home';

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
        dispatch(closeLoader());
        navigate.push('/login');
      }
    });
  }, []);
  return (
    <div className='app'>
      {loader ? (
        <Spinner displayText='Getting ready ...' />
      ) : (
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
        </Switch>
      )}
    </div>
  );
}

export default App;
