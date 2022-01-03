const axios = require('axios')

export function getDogs(name){
    return function(dispatch){
        let addName
        if(name){
            addName = `?name=${name}`
        } else {
            addName = ''
        }
        return axios.get(`http://localhost:3001/dogs${addName}`)
        .then(data => {
            dispatch({type: "GET_DOGS", payload: data.data})
        })
    }
};

export function getTemperaments(){
    return async function (dispatch){
        const temperaments = await axios('http://localhost:3001/temperament')
        return(
            dispatch({type: "GET_TEMPERAMENTS", payload: temperaments.data})
        )
    }
};

export function filterByTemperaments(temperamento){
    return async function (dispatch){
        let dogosSinFiltro = await axios('http://localhost:3001/dogs')
        dogosSinFiltro = dogosSinFiltro.data
        let dogosFiltrados = dogosSinFiltro.map(perro => {
            if(perro.temperament){
                if(perro.temperament.includes(temperamento)){
                    return perro
                }
            }
            if(perro.temperaments){
                let cond = false
                perro.temperaments.map(perrito => {
                    if(perrito.name.includes(temperamento)){
                        cond = true
                    }
                })
                if(cond) {return perro}
            }
        })
        dogosFiltrados = dogosFiltrados.filter(perro => {if(perro !== null) return perro})
        return(
            dispatch({type:"FILTER_TEMPERAMENTS", payload:dogosFiltrados})
        )
    }
};

export function orderByAlphabet(tipo){
    return async function (dispatch){
        let dogosOrdenados;
        let dogosSinOrden = await axios('http://localhost:3001/dogs')
        dogosSinOrden = dogosSinOrden.data
        if(tipo === "ORDER_A-Z"){
            dogosOrdenados = dogosSinOrden.sort((a, b) => {
                return a.name.localeCompare(b.name)
            } )
        }
        if(tipo === "ORDER_Z-A"){
            dogosOrdenados = dogosSinOrden.sort((a, b) => {
                return b.name.localeCompare(a.name)
            } ) 
        }
        return(
            dispatch({type: tipo, payload: dogosOrdenados})
        )
    }
};

export function orderByWeight(tipo){
    return async function(dispatch){
        let dogosOrdenados;
        let dogosSinOrden = await axios('http://localhost:3001/dogs')
        dogosSinOrden = dogosSinOrden.data
        if(tipo === "ORDER_MAY-MEN"){
            dogosOrdenados = dogosSinOrden.sort((a, b) => {
                let MaxA = a.weight.length > 2 ? parseInt(a.weight.split(' ')[2], 10): parseInt(a.weight, 10);
                let MaxB = b.weight.length > 2 ? parseInt(b.weight.split(' ')[2], 10): parseInt(b.weight, 10);
                if(a.weight.length===3 && !Number.isNaN(parseInt(a.weight[2],10))) MaxA = a.weight;
                if(b.weight.length===3 && !Number.isNaN(parseInt(b.weight[2],10))) MaxB = b.weight;
                return Number.isNaN(MaxB) || typeof(MaxB)==='string' || MaxA > MaxB ? -1 : 1;
            } )
        }
        if(tipo === "ORDER_MEN-MAY"){
            dogosOrdenados = dogosSinOrden.sort((a, b) => {
                let pesoMaxA = a.weight.length > 2 ? parseInt(a.weight.split(' ')[0], 10): parseInt(a.weight, 10);
                let pesoMaxB = b.weight.length > 2 ? parseInt(b.weight.split(' ')[0], 10): parseInt(b.weight, 10);
                return Number.isNaN(pesoMaxB) || typeof(pesoMaxB)==='string' || pesoMaxA < pesoMaxB ? -1 : 1;
            }) 
        }
        return(
            dispatch({type: tipo, payload:dogosOrdenados})
        )
    }
};

export function getDetail(id){
    return async function(dispatch){
        let dogoDetalle = await axios(`http://localhost:3001/dogs/${id}`)
        return(
            dispatch({type: "GET_DETAIL", payload: dogoDetalle.data})
        )
    }
}