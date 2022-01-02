import React from "react";
import style from './Card.module.css'


export default function Card({name, image, temperament, height, weight}){
    
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
            <img src={image} className={style.image} alt="Imagen no encontrada" />
            <div className={style.info}>
                <h4 className={style.name}>{name}</h4>
                <p>temperamento: {temperament}</p>
                <p>{weight}</p>
            </div>

            
        </div> 
    )
    
}