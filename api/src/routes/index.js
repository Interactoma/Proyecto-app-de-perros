const { Router } = require('express');
//const axios = require('axios');
const { getAllDogs } = require('../controller/getDogs')
const { getTemperaments } = require('../controller/getTemperament')

const { getDogId } = require('./idDog')
const { Dog, Temperament } = require('../db');
const { ordTemp } = require('./orTemperament')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get('/dogs', getAllDogs)
router.get('/dogs/:idRaza', getDogId)
router.get('/temperaments/v2', async (req, res) => {
    const { temperament } = req.body

    let dogosBS = await Temperament.findAll({
        where: {
            name: temperament
        }
    })
    res.status(200).json(dogosBS)
})
router.get('/temperament', (req, res) => {
    getTemperaments()
    .then(
        Temperament.findAll()
        .then(data =>{
            res.status(200).json(data)
        })
    )
    
})


router.post('/dog', async (req, res) => {
    const { name, height, weight, life_span, temperament } = req.body
    try {
        const newDog = await Dog.create({
            name, height, weight, life_span
        })
        const newTemperament = await Temperament.findAll({
            where: {
                name: temperament
            }
        })
        newDog.addTemperament(newTemperament)
        res.status(200).json({ msg: "perro creado" })
    } catch (error) {
        console.log(error)
    }

})






module.exports = router;
