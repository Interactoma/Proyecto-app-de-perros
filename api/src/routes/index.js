const { Router } = require('express');
//const axios = require('axios');
const { getAllDogs } = require('../api/getDogs')
const { getTemperaments } = require('../api/getTemperament')
const { Op } = require("sequelize");
const { Dog, Temperament } = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
/* const dogs = require('./dogs');
const dog = require('./dog');
const idDog = require('./idDog');
const temperament = require('./temperament'); */




const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//router.get('/dogs', dogs);
//router.get('/:id', idDog);
router.get('/dogs', getAllDogs)
//router.get('/dogs/:name', getAllDogs)


router.get('/dogs/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id)
    await getAllDogs()

    if (id) {
        let unDogo = await Dog.findAll({

            where: {
                id: {
                    [Op.eq]: id
                }
            },
            include: [Temperament]
        })
        unDogo.length > 0 ? res.status(200).json(unDogo) : res.status(404).send('DogoId no encontrado')
    } else {
        res.status(404).send("Error al enviar dogoId")
    }

})

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
