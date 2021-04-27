const axios = require('axios')
const args = require('./src/args')
const errors = require('./src/errors')
const Planet = require('./src/planet')

// process the arguments
if(!args.isValid()) process.exit()
const filmID = args.getFilmID()


axios.get(`http://swapi.dev/api/films/${filmID}/`)
.then((response) => {
    let planetDiameters = []
    let planetRequests = []
    // sends requests to retrieve one by one the data of each planet present in the movie #${filmID}
    for(const planetURL of response.data.planets){
        let planetRequest = axios.get(planetURL)
        planetRequests.push(planetRequest)
    }
    axios.all(planetRequests).then((planetResponses) => { // wait until all the data of the plants are retrieved
        for(const planetResponse of planetResponses){
            let planet = new Planet(planetResponse.data)
            if(planet.isValid()) planetDiameters.push(planet.getDiameter())
        }
        // displays the sum of the diameters of the valid planets
        console.log(planetDiameters.reduce((a, b) => a + b, 0))
    }).catch((err) => {
        errors.showMessage(err, "An internal error occured, try again :'(")
    })
})
.catch((err)=>{
    errors.showMessage(err, `Film #${filmID} don't exist, try another number ;)`)
})