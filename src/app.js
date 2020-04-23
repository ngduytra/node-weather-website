const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

const app = express()

//define path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//set handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// set static directory to server
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) =>{
    res.render('index', {
        title:'Weather App',
        name:'Nguyen Duy Tra'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Nguyen Duy Tra'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'About',
        name:'Nguyen Duy Tra'
    })
})
app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide a location!'
        })
    }
    geocode(req.query.address,(error,{latitude, longitude, location}={})=>{
        if(error){
            return res.send({error})
        }
        weather(latitude,longitude,(error,response)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: response,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404',{
        text:'Help artical not found',
        title: '404',
        name:'Nguyen Duy Tra'
    })
})
app.get('*', (req, res)=>{
    res.render('404',{
        text:'Page not found',
        title: '404',
        name:'Nguyen Duy Tra'
    })
})

app.listen(3000, ()=>{
    console.log('App is running on port 3000')
})