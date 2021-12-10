const axios = require('axios');
 //aqui si
const { API_KEY } = process.env;
const allDogsApi =  (axios.get('https://api.thedogapi.com/v1/breeds'));
module.exports = allDogsApi;