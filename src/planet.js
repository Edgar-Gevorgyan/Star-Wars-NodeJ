class Planet {
    /**
     * @param planetData A object representing a planet as defined here : https://swapi.dev/api/planets/1/
     */
    constructor(planetData) {
        this.surface_water = parseFloat(planetData.surface_water)
        // split to get a list of terrains
        // then trim each item to delete the spaces before and after the string
        this.terrains = planetData.terrain.split(',').map(item => item.trim())
        this.diameter = parseFloat(planetData.diameter)
    }
    
    /**
     * Returns a Boolean value that indicates whether the planet have mountains and a water surface.
     */
    isValid() {
        return this.surface_water > 0 && this.terrains.includes('mountains')
    }

    /**
     * Returns a Number representing the planet's diameter.
     */
    getDiameter() {
        return this.diameter
    }
}

module.exports = Planet