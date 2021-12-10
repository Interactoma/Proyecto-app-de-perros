const { Router } = require('express');
const axios = require('axios');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogs = require('./dogs');
const dog = require('./dog');
const temperament = require('./temperament');



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/dogs', async (req, res, next) => {
    
    const allDogsApi = await getAllDogs()
    console.log('La data ha sido descargada de la API de perros')
    allDogsApi ? res.status(200).send(allDogsApi.data) : res.status(404)
})

async function getAllDogs(){
    const allDogsApi =  await (axios.get('https://api.thedogapi.com/v1/breeds'))
    return allDogsApi
}

module.exports = router;
