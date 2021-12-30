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

