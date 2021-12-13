import './App.css';
import Cards from './components/cards';
const axios = require('axios')

function App(dogs) {
  function dogs(){
    fetch('http://localhost:3001/dogs')
    .then(e =>{
      const dogs = {
        
      }
    })
  }
  return (
    <div className="App">
      <h1>Henry Dogs</h1>
      <Cards props={dogs}/>
    </div>
  );
}

export default App;
