const { Router } = require('express');
const { API_KEY } = process.env;
const axios = require('axios');
const { Dog, Temperament} = require('../db');

const router = Router();

router.get('/dogs', async (req, res, next) => {
    const allDogsApi = await getAllDogs()
    console.log('La data ha sido descargada de la API de perros')
    allDogsApi ? res.status(200).send(allDogsApi) : res.status(404)
})

async function getAllDogs(){
    const allDogsApi =  await (axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`))

    allDogsApi.data.map(dog => {
        Dog.findOrCreate({
            where: {
                id: dog.id,
                name: dog.name,
                height: dog.height.metric,
                weight: dog.weight.metric,
                life_span: dog.life_span,
                image: dog.image.url
            }
        })
    })
    return allDogsApi.data
}

module.exports = router;

