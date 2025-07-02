// Start of JS file
// Mapping and geolocation service using OpenStreetMap/Nominatim.
const https = require('https');

async function geocodeAddress(address) {
    return new Promise((resolve, reject) => {
        const encodedAddress = encodeURIComponent(address);
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}&limit=1`;
        
        https.get(url, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                try {
                    const results = JSON.parse(data);
                    if (results && results.length > 0) {
                        const result = results[0];
                        resolve({
                            latitude: parseFloat(result.lat),
                            longitude: parseFloat(result.lon),
                            placeName: result.display_name,
                            countryText: result.display_name.split(', ').pop(),
                            cityText: result.display_name.split(', ')[0]
                        });
                    } else {
                        reject(new Error('No results found for the given address'));
                    }
                } catch (error) {
                    reject(new Error('Error parsing geocoding response'));
                }
            });
        }).on('error', (error) => {
            reject(error);
        });
    });
}

async function reverseGeocode(latitude, longitude) {
    return new Promise((resolve, reject) => {
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
        
        https.get(url, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                try {
                    const result = JSON.parse(data);
                    if (result && result.display_name) {
                        const addressParts = result.display_name.split(', ');
                        resolve({
                            placeName: result.display_name,
                            cityText: addressParts[0] || '',
                            stateText: addressParts[addressParts.length - 2] || '',
                            countryText: addressParts[addressParts.length - 1] || '',
                            latitude: parseFloat(latitude),
                            longitude: parseFloat(longitude)
                        });
                    } else {
                        reject(new Error('No address found for the given coordinates'));
                    }
                } catch (error) {
                    reject(new Error('Error parsing reverse geocoding response'));
                }
            });
        }).on('error', (error) => {
            reject(error);
        });
    });
}

function validateCoordinates(latitude, longitude) {
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    
    if (isNaN(lat) || isNaN(lng)) {
        return false;
    }
    
    return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
}

module.exports = { 
    geocodeAddress, 
    reverseGeocode, 
    validateCoordinates 
};
// End of JS file