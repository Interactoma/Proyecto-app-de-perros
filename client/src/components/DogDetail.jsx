import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getDetail } from "../actions";
import { useParams } from 'react-router-dom';
import style from './DogDetail.module.css'
import Navbar from './Navbar'

export default function DogDetail(){
    const dispatch = useDispatch()
    const{ id }= useParams();
    let perro

    useEffect(()=>{

        dispatch(getDetail(id));
        // eslint-disable-next-line
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
            <Navbar />
            <div className={style.container}>

                <div className={style.titleContainer}>
                    <h1 className={style.title}>{perro.name}</h1>
                </div>

                <div className={style.imgContainer}>
                    <img src={perro.image} alt="Not found :C" className={style.img}/>
                </div>

                <div className={style.info}>

                    <div className={style.infoContainer}>
                    <p>Temperamento</p>
                    <p>{perro.temperament? perro.temperament: perro.temperaments}</p>
                    </div>

                    <div className={style.infoContainer}>
                        <p>Altura</p>
                        <p>{perro.height} cm</p>
                    </div>

                    <div className={style.infoContainer}>
                        <p>Peso</p>
                        <p>{perro.weight} kg</p>
                    </div>

                    <div className={style.infoContainer}>
                        <p>Esperanza de vida</p>
                        <p>{perro.life_span}</p>
                    </div>
                </div>

            </div>
        </>
    )
};

