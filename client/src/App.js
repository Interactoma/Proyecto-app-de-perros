import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home'
import LandinPage from './components/LandingPage';
import DogDetail from './components/DogDetail';
import CreateDog from './components/CreateDog';
//const axios = require('axios')

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path = '/' component={LandinPage} />
          <Route exact path = '/home' component={Home} />
          <Route exact path= '/create-dog' component={CreateDog}/>
          <Route path='/dog-detail/:id' component={DogDetail} />
        </Switch>
        
      </div>
    </BrowserRouter>

  );
}

export default App;
