const axios = require('axios');
const { Dog, Temperament } = require('../db');


async function getAllDogs(req, res) {
    const { name } = req.query;
    var allDogsApi;
    if (name) {
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
            image: name ? `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg` : dog.image.url,
            temperament: dog.temperament ? dog.temperament : dog.temperaments
        }
    })

/*     function setTemperament(temperamento) {
        if (typeof temperamento !== 'string') {
            let temp;
            console.log(temperamento)
            return temperamento
        }
        return temperamento
    } */

    /*     resultadoFinal = resultadoFinal.map(e => {
            if (typeof e.temperaments === 'object') {
                let newTempreamentsString
                for (let i = 0; i < e.temperaments.length; i++) {
                    newTempreamentsString += e.temperaments[i]
                }
                e.temperaments = newTempreamentsString
                console.log(e.temperaments)
                return e.temperaments[0].name
            } else {
                return e
            }
        })
        console.log(resultadoFinal) */

    if (name) {
        const dogoBase = await Dog.findAll({ include: [Temperament] })
        const dogoFinal = dogoBase.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
        let resultadoFinal = dogo.concat(dogoFinal)
        allDogsApi = '';
        resultadoFinal.length ? res.status(200).json(resultadoFinal) : res.status(404).json("Dogo no encontrado")
    } else {
        const dogoBase = await Dog.findAll({ include: [Temperament] })
        const dogoFinal = dogoBase.filter(e => e.name.toLowerCase())
        const resultadoFinal = dogo.concat(dogoFinal)
        allDogsApi = '';
        resultadoFinal.length ? res.status(200).json(resultadoFinal) : res.status(404).json("Dogo no encontrado")
    }

}




module.exports = { getAllDogs };