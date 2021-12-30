const { Op } = require("sequelize");
const { Dog, Temperament } = require('../db');
const {getAllDogs} = require('../api/getDogs')
const axios = require('axios');

async function getDogId(req, res) {

    const { idRaza } = req.params

    console.log(idRaza.length + ' ' + idRaza)
    if (idRaza.length < 4) {
        let dogos = await axios(`https://api.thedogapi.com/v1/breeds`)
        console.log('Paso 2')
        const dogo = await dogos.data.map(dog => {
            return {
                id: dog.id,
                name: dog.name,
                height: dog.height.metric,
                weight: dog.weight.metric,
                life_span: dog.life_span,
                image: dog.image.url,
                temperament: dog.temperament
            }
        }) 
        let unDogo = dogo.filter(e => e.id == idRaza)
        unDogo.length ? res.status(200).json(unDogo) : res.status(404).send('DogoId no encontrado')
    } else {
        let unDogo = await Dog.findByPk(idRaza, {
            include: [Temperament]
        })
        unDogo ? res.status(200).json(unDogo) : res.status(404).send('DogoId no encontrado')
    }
}

module.exports = {getDogId}