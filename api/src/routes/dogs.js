const { Router } = require('express');
const { Op } = require("sequelize");
const { Dog } = require('../db');
const {getAllDogs} = require('../controller/getDogs')

const router = Router();

router.get('/', async (req, res) => {
    const {name} = req.query;
    await getAllDogs()
    console.log('todo bien hasta aqui')
    try {
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
    } catch (error) {
        res.status(500).json(error)
    }


})






module.exports = router;

