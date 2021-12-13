const axios = require('axios');
const { Dog } = require('../db');


async function getAllDogs(req, res) {

    const { name } = req.query;
    var allDogsApi;
    if(name){
        allDogsApi = await axios(`https://api.thedogapi.com/v1/breeds/search?q=${name}`)
    } else {
        allDogsApi = await axios(`https://api.thedogapi.com/v1/breeds`)
    }

    const dogo = await allDogsApi.data.map(dog => {
        return {
            id: dog.id,
            name: dog.name,
            height: dog.height.metric,
            weight: dog.weight.metric,
            life_span: dog.life_span,
            image: dog.image
        }
    }) 

    const dogoBase = await Dog.findAll()
    const dogoFinal = dogoBase.filter(e => e.name.toLowerCase().includes(`%name%`.toLowerCase()))
    const resultadoFinal = dogo.concat(dogoFinal)
    allDogsApi = '';
    resultadoFinal.length? res.status(200).json(resultadoFinal) : res.status(404).json("Dogo no encontrado")

}




module.exports = { getAllDogs };