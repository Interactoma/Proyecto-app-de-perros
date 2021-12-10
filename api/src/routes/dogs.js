const { Router } = require('express');

const { Dog, Temperament} = require('../db');

const app = Router();

app.get('/dogs', async (req, res, next) => {
    const allDogsApi =  await (axios.get('https://api.thedogapi.com/v1/breeds'));
    console.log(allDogsApi)
    res.status(200).json(allDogsApi);
})

