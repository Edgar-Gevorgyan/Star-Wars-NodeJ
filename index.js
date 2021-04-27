const axios = require('axios')

const filmID = process.argv[2]
let planetDiameters = []

axios.get(`http://swapi.dev/api/films/${filmID}/`).then((response) => {
    let planetRequests = []
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
    })
})