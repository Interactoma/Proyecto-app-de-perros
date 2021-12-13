const axios = require('axios');
const { API_KEY } = process.env;
const { Temperament } = require('../db');

async function getTemperaments(){
    const allDogsApi =  await (axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`))

    allDogsApi.data.map(t => {
        if(t.temperament){
            var temperamentos = t.temperament
            temperamentos = temperamentos.split(', ')
            for (let i = 0; i < temperamentos.length; i++) {
                
                Temperament.findOrCreate({
                    where: {
                        name: temperamentos[i]
                    }
                })
            }
        }


    })
    console.log('Temperamentos creados')
}

module.exports = {getTemperaments};