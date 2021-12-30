import React from 'react';
import Card from '../Card/Card';
import { useSelector } from "react-redux";
import { connect } from 'react-redux';
import {getDogs} from "../../actions/index"
import style from './Cards.module.css'

function existe(perro){
  console.log(perro)
  if(perro.name){
    return(
      <Card
      height = {perro.height}
      key = {perro.id}
      id = {perro.id}
      image = {perro.image}
      life_span = {perro.life_span}
      name = {perro.name}
      temperament = {perro.temperament}
      />
    )
  } else{
    return "Perro no encontrado"
  }
}

function Cards({dog}) {
  const dogos = useSelector(state => state.dogos)
  return (
  <div>
    <input type="text" onChange={(e)=>dog(e.target.value)} />
    <button onClick={()=>dog()}>Buscar</button>
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
      dogos: state.dogos
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dog: name => dispatch(getDogs(name))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
//export default Cards;