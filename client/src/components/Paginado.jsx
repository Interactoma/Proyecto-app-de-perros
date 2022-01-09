import React from "react";
import style from './Paginado.module.css';

export default function Paginado ({dogosForPage, allDogos, page}) {
    let pagNum = []

    for(let i = 0;  i <= Math.ceil(allDogos / dogosForPage)-1; i++){
        pagNum.push(i +1)
    }
    return (
        <nav className={style.nav}>

            {pagNum && pagNum.map( (number) => (
                
                <button href= "#/" onClick={()=> page(number)} key={number} className={style.listElement}>{number}</button>
                
            ))}

        </nav>
    )
}