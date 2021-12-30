import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Cards from './components/Cards/cards';
import Navbar from './components/Navbar';
import Home from './components/Home'
//const axios = require('axios')

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path = '/' component={Home} />
          <Route exact path = '/home' component={Cards} />
        </Switch>
        
      </div>
    </BrowserRouter>

  );
}

export default App;
