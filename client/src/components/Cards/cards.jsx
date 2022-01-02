import React from 'react';
import Card from '../Card/Card';
import { useSelector } from "react-redux";
import { connect } from 'react-redux';
import {getDogs, getTemperaments, filterByTemperaments, orderByAlphabet, orderByWeight} from "../../actions/index"
import style from './Cards.module.css'

function existe(perro){
  if(perro.name){
    return(
      <Card
      height = {perro.height}
      weight = {perro.weight}
      key = {perro.id}
      id = {perro.id}
      image = {perro.image}
      life_span = {perro.life_span}
      name = {perro.name}
      temperament = {perro.temperament ? perro.temperament:perro.temperaments}
      />
    )
  } else{
    return "Perro no encontrado"
  }
}

function Cards({dog, filterByTemp, orderByAlp, orderByWei}) {
  const dogos = useSelector(state => state.dogos)
  const temperaments = useSelector(state => state.temperaments).sort((a, b) => {
    return a.name.localeCompare(b.name)
  } )

  return (
  <div>

    <div>

      <div>
        <p>search bar</p>
        <input type="text" onChange={(e)=>dog(e.target.value)} />
        <button onClick={()=>dog()}>Buscar</button>
      </div>
      
      <div>
        <p>Orden por temperamentoa</p>
        <select name="" id="" onChange={(e)=>filterByTemp(e.target.value)}>
          {
          temperaments? temperaments.map(temp => {
            const {name, id} = temp
            return(
              <option value={name} key={id} >{name}</option>
            )
          }): console.log('cargo despues temperamentos')}
        </select>
      </div>
      
      <div>
        <p>Orden alfabetico</p>
        <button onClick={(e) => orderByAlp("ORDER_A-Z")}>A - Z</button>
        <button onClick={(e) => orderByAlp("ORDER_Z-A")}>Z - A</button>
      </div>

      <div>
        <p>peso</p>
        <button onClick={(e) => orderByWei("ORDER_MAY-MEN")}>Mayor a menor</button>
        <button onClick={(e) => orderByWei("ORDER_MEN-MAY")}>Menor a mayor</button>
      </div>

    </div>


    
    <div className={style.container}>
    {
      
      dogos.map(perro => (
        existe(perro)
      ))

    }
    </div>


  </div>
  )
};

function mapStateToProps(state) {
  return {
      dogos: state.dogos,
      temperaments: state.temperaments
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dog: name => dispatch(getDogs(name)),
    temperament: dispatch(getTemperaments()),
    filterByTemp: temp => dispatch(filterByTemperaments(temp)),
    orderByAlp: tipo => dispatch(orderByAlphabet(tipo)),
    orderByWei: tipo => dispatch(orderByWeight(tipo))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
//export default Cards;