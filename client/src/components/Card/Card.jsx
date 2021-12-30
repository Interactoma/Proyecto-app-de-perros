import React from "react";
import style from './Card.module.css'


export default function Card({name, image, temperament, weight, height}){
    if(image === 'https://cdn2.thedogapi.com/images/undefined.jpg'){
        image = 'lostDog.png'
    }
    if(typeof temperament !== 'string'){
        let newTemperament;
        while (temperament) {
            
        }
    }
    return(
        <div className={style.container}>
            <img src={image} className={style.image} alt="Imagen no encontrada" />
            <div className={style.info}>
                <h4 className={style.name}>{name}</h4>
                <p>temperamento: {temperament}</p>
                <p>{height}</p>
            </div>

            
        </div> 
    )
    
}