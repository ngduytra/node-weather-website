const request = require('request')

const weather = (latitude, longitude, callback) =>{
    url = 'https://api.darksky.net/forecast/90c1e7e82481e95f4f70a702be6d2a6e/'+latitude+','+longitude
    request({url, json:true}, (error, {body})=>{
        if(error){
            callback('Unable to connect to server!', undefined)
        } else if(body.error){
            callback('No place found!', undefined)
        } else{
             callback(undefined, 'It is currently '+ body.currently.temperature + ' degrees out. There is a '+ body.currently.precipProbability + ' chance of rain!')
        }
    })
}

module.exports = weather