const { Router } = require('express');
const { Op } = require("sequelize");
const { Dog } = require('../db');
const {getAllDogs} = require('../api/getDogs')

const router = Router();

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id)
    await getAllDogs()

/*     if(id){
        let unDogo = await Dog.findAll({
            where: {
                id: {
                    [Op.eq]: id
                }
            }
        }) 
    } */

    if(id) {
        let unDogo = await Dog.findAll({
            
            where: {
                id: {
                    [Op.eq]: id
                }
            }
        })
        unDogo.length > 0 ? res.status(200).json(unDogo) : res.status(404).send('DogoId no encontrado')
    } else {
        res.status(404).send("Error al enviar dogoId")
    }

})

module.exports = router;