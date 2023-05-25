import axios from "axios";

export const key = '7ad31e2e84d179b0ddc03d9fe3e5a07b';

/*
export const getList = (setState) =>{
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=pt-BR&page=1`)
    .then((response)=>{
        setState(response.data.results)
    }).catch((error)=>{
        console.log(error)
    })
}
*/

export const getList = axios.create({
    baseURL: `https://api.themoviedb.org/3/movie`
})

/*
export const getDetails = (setState) =>{
    axios.get(`https://api.themoviedb.org/3/movie`)
    .then((response)=>{
        setState(response.data)
    }).catch((error)=>{
        console.log(error)
    })
}
*/


export const getDatails = axios.create({
    baseURL: `https://api.themoviedb.org/3/movie/`
})

