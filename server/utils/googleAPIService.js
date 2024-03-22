// Start of JS file
// Google Maps API function and connection.
const { GoogleAPI } = require('googleai');

const googleai = new GoogleAPI(process.env.GOOGLEAI_API_KEY);

async function geolocate() {

}

geolocate().then(coords => console.log(coords));

module.exports = { geolocate };
// End of JS file