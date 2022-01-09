import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getTemperaments, createDogo } from '../actions';
import { useEffect, useState } from "react";
import Navbar from './Navbar';
import style from './CreateDog.module.css'

function check(newDogo){
    let errors = {
        ok: false
    }

    if(!newDogo.name){
        errors.name = 'Agrega un nombre'
    }
    else if(newDogo.name.length>30){
        errors.name = 'Utiliza un nombre mas corto'
    }
    else if(typeof parseInt(newDogo.heightMin) !== 'number'){
        errors.heightMin = 'Debe ser un numero'
    }
    else if(newDogo.heightMin< 1 ){
        errors.heightMin = 'Su altura minima no puede ser menor a 1'
    }
    else if(newDogo.heightMin> 99 ){
        errors.heightMin = 'Su altura minima no puede ser mayor a 99'
    }
    if(typeof parseInt(newDogo.heightMax) !== 'number'){
        errors.heightMax = 'Debe ser un numero'
    }
    else if(newDogo.heightMax< 1 ){
        errors.heightMax = 'Su altura minima no puede ser menor a 1'
    }
    else if(newDogo.heightMax> 99 ){
        errors.heightMax = 'Su altura minima no puede ser mayor a 99'
    }
   
    if(typeof parseInt(newDogo.weightMin) !== 'number'){
        errors.weightMin = 'Debe ser un numero'
    }
    else if(newDogo.weightMin< 1 ){
        errors.weightMin = 'Su peso minimo no puede ser menor a 1'
    }
    else if(newDogo.weightMin> 99 ){
        errors.weightMin = 'Su peso minimo no puede ser mayor a 99'
    }
    else if(typeof parseInt(newDogo.weightMax) !== 'number'){
        errors.weightMax = 'Debe ser un numero'
    }
    else if(newDogo.weightMax< 1 ){
        errors.weightMax = 'Su peso maximo no puede ser menor a 1'
    }
    else if(newDogo.weightMax> 99 ){
        errors.weightMax = 'Su peso maximo no puede ser mayor a 99'
    }
    else if(typeof parseInt(newDogo.life_span) !== 'number'){
        errors.life_span = 'Debe ser un numero'
    }
    else if(newDogo.life_span< 1 ){
        errors.life_span = 'Su esperanza de vida no puede ser menor a 1'
    }
    else if(newDogo.life_span> 30 ){
        errors.life_span = 'Su esperanza de vida no puede ser mayor a 30'
    }
    else {
        errors = {}
        errors.ok = true
    }




/*     console.log(errors)
    console.log(newDogo) */
    console.log(errors)
    return errors
}

export default function CreateDog(){
    const dispatch = useDispatch()
    const temperaments = useSelector(state => state.temperaments).sort((a, b) => {
        return a.name.localeCompare(b.name)
      } )

    useEffect(()=>{

        dispatch(getTemperaments());
        // eslint-disable-next-line
    },[])

    const [errors, setErrors] = useState({})

    const [newDogo, setDogo] = useState({
        name: "",
        heightMin: "",
        heightMax: "",
        weightMin: "",
        weightMax: "",
        life_span: "",
        temperament: []
    })
    function onChange(e){
        setDogo({
            ...newDogo,
            [e.target.name]: e.target.value
        })

        setErrors(check({
            ...newDogo,
            [e.target.name]: e.target.value
        }))
        
    }
    function addTemperament(e){

        if(!newDogo.temperament.includes(e)){
            setDogo({
                ...newDogo,
                temperament: [...newDogo.temperament, e.target.value]
                
            })
        }  
    }
    function submitDogo(e){
        e.preventDefault();
        let dogo = {
            name: newDogo.name,
            height: `${newDogo.heightMin} - ${newDogo.heightMax}`,
            weight: `${newDogo.weightMin} - ${newDogo.weightMax}`,
            life_span: newDogo.life_span,
            temperament: newDogo.temperament
        }
        dispatch(createDogo(dogo))
        alert("Dogo creato, Hurra!")
        setDogo({
            name: "",
            heightMin: "",
            heightMax: "",
            weightMin: "",
            weightMax: "",
            life_span: "",
            temperament: []
        })

    }
    //console.log(newDogo)
    return(
        <>
        <Navbar />
        <form onSubmit={e => submitDogo(e)} className={style.container}>
            <div className={style.input}>
                <label>Nombre de la raza </label>
                <input type="text" value={newDogo.name} name ="name" onChange={e => onChange(e)} />
                {errors.name && (
                    <p className={style.error}>{errors.name}</p>
                )}
            </div>

            <div className={style.input}>
                <label>Altura minima </label>
                <input type="number" value={newDogo.heightMin} name ="heightMin" onChange={e => onChange(e)} />
                {errors.heightMin && (
                    <p className={style.error}>{errors.heightMin}</p>
                )}
            </div>

            <div className={style.input}>
                <label>Altura maxima </label>
                <input type="number" value={newDogo.heightMax} name ="heightMax" onChange={e => onChange(e)}/>
                {errors.heightMax && (
                    <p className={style.error}>{errors.heightMax}</p>
                )}
            </div>

            <div className={style.input}>
                <label>Peso minimo </label>
                <input type="number" value={newDogo.weightMin} name ="weightMin" onChange={e => onChange(e)}/>
                {errors.weightMin && (
                    <p className={style.error}>{errors.weightMin}</p>
                )}
            </div>

            <div className={style.input}>
                <label>Peso maximo </label>
                <input type="number" value={newDogo.weightMax} name ="weightMax" onChange={e => onChange(e)}/>
                {errors.weightMax && (
                    <p className={style.error}>{errors.weightMax}</p>
                )}
            </div>

            <div className={style.input}>
                <label>Esperanza de vida en años </label>
                <input type="number" value={newDogo.life_span} name ="life_span" onChange={e => onChange(e)}/>
                {errors.life_span && (
                    <p className={style.error}>{errors.life_span}</p>
                )}
            </div>

            <div className={style.input}>
                <select onChange={e => addTemperament(e)}>
                    <option value="">Select temperament:</option>
                    {
                    temperaments? temperaments.map(temp => {
                        const {name, id} = temp
                        return(
                        <option value={name} key={id} >{name}</option>
                        )
                    }): console.log('cargo despues temperamentos')
                    }
                </select> 
                {errors.temperament && (
                    <p className={style.error}>{errors.temperament}</p>
                )}   
            </div>

            <div className={style.input}>
                {newDogo.temperament.length>0? newDogo.temperament.map(temp=>{
                    return(
                        <div key={temp}>
                            <p>{temp}</p>
                        </div>
                    )
                }):null}
            </div>
            <div>
                {errors.ok? <button type='submit'>Crear Nuevo Dogo</button>: <p className={style.error}>Verifica todos los campos</p>}
                    
                  
                
            </div>
        </form>
        </>
    )
}