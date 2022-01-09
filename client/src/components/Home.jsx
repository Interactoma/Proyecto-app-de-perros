import Cards from "./Cards/cards"
import Paginado from "./Paginado";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDogs } from "../actions";
import Navbar from "./Navbar";


export default function Home(){
    const dispatch = useDispatch()
    
    useEffect(()=>{

        dispatch(getDogs());
        // eslint-disable-next-line
    },[dispatch])
    
    const dogos = useSelector(state => state.dogos)
    const [currentPage, setCurrentPage] = useState(1);
    const [dogosForPage] = useState(8);
    const ultimoDogo = currentPage * dogosForPage;
    const primerDogo = ultimoDogo - dogosForPage;
    const currentDogs = dogos.slice(primerDogo, ultimoDogo)
    const page = (NumPag) => {setCurrentPage(NumPag);};

    return(
        <>
            <Navbar />
            <Cards
            currentDogs = {currentDogs}
            />
            <Paginado
                dogosForPage={dogosForPage}
                allDogos={dogos.length}
                page={page}
            />
        </>
    )
}