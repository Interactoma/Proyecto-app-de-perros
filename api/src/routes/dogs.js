const { Router } = require('express');
const { Op } = require("sequelize");
const { Dog } = require('../db');
const {getAllDogs} = require('../api/getDogs')

const router = Router();

router.get('/dogs', async (req, res, next) => {
    const {name} = req.query;
    await getAllDogs()
    if(name){
        let unDogo = await Dog.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            }
        })
        unDogo.length > 0 ? res.status(200).json(unDogo[0].dataValues) : res.status(404).send('Dogo no encontrado')
    }else{
        const alldogs = await Dog.findAll();
        alldogs ? res.status(200).json(alldogs): res.status(404).send("Error al enviar getAllDogs")
    }

})

module.exports = router;

