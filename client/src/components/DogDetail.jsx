import { useSelector, useDispatch } from "react-redux";
import Card from "./Card/Card";
import { useEffect } from "react";
import { getDetail } from "../actions";
import { useParams } from 'react-router-dom';

export default function DogDetail(){
    const dispatch = useDispatch()
    const{ id }= useParams();
    let perro

    useEffect(()=>{

        dispatch(getDetail(id));
    },[])

    perro = useSelector(state => state.detail);
    if(perro[0]){
        perro = perro[0]
    }

    if(perro.image === 'https://cdn2.thedogapi.com/images/undefined.jpg'){
        perro.image = 'lostDog.png'
    }
    
    if(perro.temperaments  && perro.temperaments !== undefined){
        let newTemperament ='';
        perro.temperaments.map(data => (
            newTemperament += ` ${data.name},`
        ))
        perro.temperaments = newTemperament.slice(0, -1)
    }

    return(
        <>
            <div>

                <div>
                    <h1>{perro.name}</h1>
                </div>

                <div>
                    <img src={perro.image} alt="Not found :C" />
                </div>

                <div>
                    <p>Informacion</p>
                    <div>
                    <p>Temperamento</p>
                    <p>{perro.temperament? perro.temperament: perro.temperaments}</p>
                    </div>
                    <div>
                        <p>Altura</p>
                        <p>{perro.height} cm</p>
                    </div>
                    <div>
                        <p>Peso</p>
                        <p>{perro.weight} kg</p>
                    </div>
                    <div>
                        <p>Esperanza de vida</p>
                        <p>{perro.life_span} años</p>
                    </div>
                </div>

            </div>
        </>
    )
};

