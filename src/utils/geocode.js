const request = require("request");

const geocode = (address, callback)=>{
    url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address+'.json?access_token=pk.eyJ1IjoiZGl2ZXJnZW50dm4iLCJhIjoiY2s3dDllbTB2MG52czNnbzRyMXE5dnl3NSJ9.tozj8l0X_s5gMtmQHy76Zg'

    request({url, json:true},(error,{body}) =>{
        if (error) {
            callback('Unable to connect to server', undefined)
        } else if(body.features.length === 0){
            callback('Unable to find a location. Try another seacher.', undefined)
        } else{
            callback(undefined,{
                    latitude: body.features[0].center[0],
                    longitude: body.features[0].center[1],
                    location: body.features[0].place_name
                }
                )
        }
    })
}
module.exports = geocode