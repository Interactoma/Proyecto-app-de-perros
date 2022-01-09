const { Temperament } = require('../db');



async function  ordTemp(req, res){
    const {temperament} = req.body
    let dogosBS = await Temperament.finAll({
        where: {
            name: temperament
        }
    })

    res.status(200).json(dogosBS)

}

module.exports = {ordTemp}


