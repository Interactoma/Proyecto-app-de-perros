import React from 'react';
import Card from '../Card/Card';
import { useSelector } from "react-redux";
import { connect } from 'react-redux';
import {getDogs, getTemperaments, filterByTemperaments, orderByAlphabet, orderByWeight, orderByOrigen} from "../../actions/index"
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

function Cards( {dog, filterByTemp, orderByAlp, orderByWei, currentDogs, orderByOri}) {
  const dogos = useSelector(state => state.dogos)
  const temperaments = useSelector(state => state.temperaments).sort((a, b) => {
    return a.name.localeCompare(b.name)
  } )

  return (
  <div>

    <div className={style.containerFilters}>

      <div className={style.containerOneFilter}>
        <p>Buscar raza por nombre</p>
        <input type="text" onChange={(e)=>dog(e.target.value)} />
      </div>
      
      <div className={style.containerOneFilter}>
        <p>Orden por temperamento</p>
        <select name="" id="" onChange={(e)=>filterByTemp(e.target.value)}>
        <option disabled selected value hidden>Seleccionar temperamento</option>
          {
          temperaments? temperaments.map(temp => {
            const {name, id} = temp
            return(
              <option value={name} key={id} >{name}</option>
            )
          }): console.log('cargo despues temperamentos')}
        </select>
      </div>
      
      <div className={style.containerOneFilter}>
      <p>Orden alfabetico</p>
        <select name="alp" id="alp" onChange={(e) => orderByAlp(e.target.value)}>
          <optgroup label='Ordenarar alfabéticamente'>
            <option disabled selected value hidden>Ordenarar alfabéticamente</option>
            <option value="ORDER_A-Z" >A - Z</option>
            <option value="ORDER_Z-A" >Z - A</option>
          </optgroup>
        </select>
      </div>

      <div className={style.containerOneFilter}>
        <p>Orden por peso</p>
        <select name="" id="" onChange={(e) => orderByWei(e.target.value, dogos)}>
          <optgroup label='Ordenarar por peso'>
            <option disabled selected value hidden>Ordenarar por peso</option>
            <option value="ORDER_MAY-MEN">Mayor a menor</option>
            <option value="ORDER_MEN-MAY">Menor a mayor</option>
          </optgroup>
        </select>
      </div>

      <div className={style.containerOneFilter}>
        <p>Orden por origen</p>
        <select name="" id="" onChange={(e) => orderByOri(e.target.value)}>
        <option disabled selected value hidden>Ordenarar por origen</option>
          <option value="FROM_DB">Creados</option>
          <option value="FROM_API">De la API</option>
        </select>
      </div>

      <div className={style.containerOneFilter}>
        <button onClick={()=>dog()} className={style.btn}>Reset filters</button>
      </div>

    </div>


    
    <div className={style.container}>
    {
      
      currentDogs.map(perro => (
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
    orderByWei: tipo => dispatch(orderByWeight(tipo)),
    orderByOri: ori => dispatch(orderByOrigen(ori))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
//export default Cards;