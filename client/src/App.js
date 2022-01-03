import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home'
import LandinPage from './components/LandingPage';
import DogDetail from './components/DogDetail';
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
          <Route path='/dog-detail/:id' component={DogDetail} />
        </Switch>
        
      </div>
    </BrowserRouter>

  );
}

export default App;
