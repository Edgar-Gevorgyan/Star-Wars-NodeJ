const axios = require('axios')
const input = require('./input').default

// process input
const filmID = input.getFilmNumber()
if(!filmID) process.exit()

axios.get(`http://swapi.dev/api/films/${filmID}/`).then((response) => {
    let planetRequests = []
    let planetDiameters = []
    for(const planetURL of response.data.planets){
        planetRequests.push(axios.get(planetURL))
    }

    axios.all(planetRequests).then((planetResponses) => {
        for(const planetResponse of planetResponses){
            let planet = planetResponse.data
            let surface_water = parseFloat(planet.surface_water)
            let terrains = planet.terrain.split(',').map(item => item.trim())
            if(surface_water > 0 && terrains.includes('mountains')){
                planetDiameters.push(parseFloat(planet.diameter))
            }
        }
        console.log(planetDiameters.reduce((a, b) => a + b, 0))
    }).catch((err) => {
        if(err.isAxiosError){
            console.log(`error occured :\nresponse status = ${err.response.status}\nerror message =`, err.response.data)
            if(err.response.status == 404){
                console.log(`\nAn internal error occured, try again :'(\n`)
            }
        } else {
            console.log(err)
        }
    })
}).catch((err)=>{
    if(err.isAxiosError){
        console.log(`error occured :\nresponse status = ${err.response.status}\nerror message =`, err.response.data)
        if(err.response.status == 404){
            console.log(`\nFilm #${filmID} don't exist, try another number ;)\n`)
        }
    } else {
        console.log(err)
    }
})