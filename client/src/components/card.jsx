import React from "react";

export default function Card(props){
    return(
        <>
            <h4>{props.name}</h4>
            <img src={props.image} alt="Imagen no encontrada" />
        </> 
    )
    
}