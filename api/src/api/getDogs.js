const axios = require('axios');
const { API_KEY } = process.env;
const { Dog} = require('../db');


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
}



module.exports = {getAllDogs};