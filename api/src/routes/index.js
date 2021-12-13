const { Router } = require('express');
//const axios = require('axios');
const { getAllDogs } = require('../api/getDogs')
const { getTemperaments } = require('../api/getTemperament')

const { getDogId } = require('./idDog')
const { Dog, Temperament } = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get('/dogs', getAllDogs)
router.get('/dogs/:idRaza', getDogId)

router.get('/temperament', async (req, res) => {
    await getTemperaments()
    res.status(200).json(await Temperament.findAll())
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
