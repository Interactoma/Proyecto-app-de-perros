import React from "react";
import style from './Card.module.css'
import { NavLink } from 'react-router-dom';


export default function Card({id, name, image, temperament, height, weight}){
    
    if(image === 'https://cdn2.thedogapi.com/images/undefined.jpg'){
        image = 'lostDog.png'
    }
    
    if(typeof temperament !== 'string' && temperament !== undefined){
        let newTemperament ='';
        temperament.map(data => (
            newTemperament += ` ${data.name},`
        ))
        temperament = newTemperament.slice(0, -1)
    }

    return(
        <div className={style.container}>
            <NavLink to={`/dog-detail/${id}`} className={style.link}>
                
                <div className={style.info}>
                <img src={image} className={style.image} alt="Imagen no encontrada" />
                    <h4 className={style.name}>{name}</h4>
                    <div>
                        <p>temperamento</p>
                        <p>{temperament}</p>
                    </div>
                    
                    <div>
                        <p>Peso</p>
                        <p>{weight} kg</p>
                    </div>
                </div>
            </NavLink>
            


            
        </div> 
    )
    
}