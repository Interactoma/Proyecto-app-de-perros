import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home'
import LandinPage from './components/LandingPage';
//const axios = require('axios')

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path = '/' component={LandinPage} />
          <Route exact path = '/home' component={Home} />
          <Route exact path= '/create-dog' />
        </Switch>
        
      </div>
    </BrowserRouter>

  );
}

export default App;
