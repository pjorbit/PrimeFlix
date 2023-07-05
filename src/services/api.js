//chave api: d77efc32b35cf97946f4ad2611f9dee0
// base da url: https://api.themoviedb.org/3/
// url da api: https://api.themoviedb.org/3/movie/550?api_key=d77efc32b35cf97946f4ad2611f9dee0

import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api;