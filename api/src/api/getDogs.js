const axios = require('axios');
const { API_KEY } = process.env; //aqui si

const allDogsApi =  (axios.get('https://api.thedogapi.com/v1/breeds'));
module.exports = allDogsApi;