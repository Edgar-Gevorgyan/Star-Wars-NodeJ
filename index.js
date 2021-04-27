const axios = require('axios')
const args = require('./src/args')
const errors = require('./src/errors')
const Planet = require('./src/planet')

// process the arguments
if(!args.isValid()) process.exit()
const filmID = args.getFilmID()


axios.get(`http://swapi.dev/api/films/${filmID}/`)
.then((response) => {
    // sends requests to retrieve one by one the data of each planet present in the movie #${filmID}
    let planetRequests = response.data.planets.map(planetURL => axios.get(planetURL).then(planetResponse => new Planet(planetResponse.data)))

    axios.all(planetRequests).then((planets) => { // wait until all the data of the plants are retrieved
        
        let planetsDiameterSum = planets.filter(planet => planet.isValid()) // filter the planets to keep the valid ones only 
                                        .reduce((a, b) => a + b.getDiameter(), 0) // compute the sum of the diameters

        // displays the sum of the diameters of the valid planets
        console.log(planetsDiameterSum)
    }).catch((err) => {
        errors.showMessage(err, "An internal error occured, try again :'(")
    })
})
.catch((err)=>{
    errors.showMessage(err, `Film #${filmID} don't exist, try another number ;)`)
})