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
        // eslint-disable-next-line
        let dogosFiltrados = dogosSinFiltro.map(perro => {
            if(perro.temperament){
                if(perro.temperament.includes(temperamento)){
                    return perro
                }
            }
            if(perro.temperaments){
                let cond = false
                // eslint-disable-next-line
                perro.temperaments.map(perrito => {
                    if(perrito.name.includes(temperamento)){
                        cond = true
                    }
                })
                if(cond) {return perro}
            }
        })
        // eslint-disable-next-line
        dogosFiltrados = dogosFiltrados.filter(perro => {if(perro !== null) return perro})
        return(
            dispatch({type:"FILTER_TEMPERAMENTS", payload:dogosFiltrados})
        )
    }
};

export function orderByAlphabet(tipo){

    return async function (dispatch){
        let value = await axios.get(`http://localhost:3001/dogs`)
        value = value.data
       if(tipo === 'ORDER_A-Z'){
           value = value.sort((a, b) => {
               return a.name.localeCompare(b.name)
           } )
       }
       if(tipo === 'ORDER_Z-A'){
           value = value.sort((a, b) => {
               return b.name.localeCompare(a.name)
           } )
       }
        return(
            dispatch({type: tipo, payload: value})
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
                let A = a.weight.length > 2 ? parseInt(a.weight.split(' ')[2], 10): parseInt(a.weight, 10);
                let B = b.weight.length > 2 ? parseInt(b.weight.split(' ')[2], 10): parseInt(b.weight, 10);
                if(a.weight.length===3 && !Number.isNaN(parseInt(a.weight[2],10))) A = a.weight;
                if(b.weight.length===3 && !Number.isNaN(parseInt(b.weight[2],10))) B = b.weight;
                return Number.isNaN(B) || typeof(B)==='string' || A > B ? -1 : 1;
            } )
        }
        if(tipo === "ORDER_MEN-MAY"){
            dogosOrdenados = dogosSinOrden.sort((a, b) => {
                let MaxA = a.weight.length > 2 ? parseInt(a.weight.split(' ')[0], 10): parseInt(a.weight, 10);
                let MaxB = b.weight.length > 2 ? parseInt(b.weight.split(' ')[0], 10): parseInt(b.weight, 10);
                return Number.isNaN(MaxB) || typeof(MaxB)==='string' || MaxA < MaxB ? -1 : 1;
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

export function createDogo(newDogo){
    return async function(){
        return axios.post('http://localhost:3001/dog', newDogo)
    } 
}

/* export function orderByOrigen(ori){
    return function(dispatch){
        return(
            dispatch({type: ori, payload: ori})
        )
    }
} */

export function orderByOrigen(ori){
    return async function(dispatch){
        let dogosSinFiltro = await axios('http://localhost:3001/dogs')
        dogosSinFiltro = dogosSinFiltro.data
        let dogosFiltrados = dogosSinFiltro.map(perro => {
            
            if(typeof perro.id === 'string' && ori === "FROM_DB" && perro !== null){
                if(perro) return perro
            }
            else if(typeof perro.id === 'number' && ori === "FROM_API" && perro !== null){
                if(perro) return perro
            }
        })
        dogosFiltrados = dogosFiltrados.filter(perro => perro !== undefined)
        return(
            dispatch({type: ori, payload: dogosFiltrados})
        )
    }
}