import './App.css';
import { Register } from 'components';
import Login from 'features/Auth/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
