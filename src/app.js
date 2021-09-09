
const path = require('path');
const express = require('express')
const hbs = require('hbs');
const { request } = require('https');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

//console.log(__dirname)
//console.log(path.join(__dirname, '..//public'))
//console.log(__filename) //of the path

//Define path for express
const publicDirectoryPath = path.join(__dirname, '..//public')
const helloDirectoryPath = path.join(__dirname, '../templates/views')
const viewPath = path.join(__dirname, '../templates')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()
const port = process.env.PORT || 3000


//Setup hbs engine and views location
app.set('views', helloDirectoryPath)
app.set('view engine',viewPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index.hbs', {
        title: 'Weather',
        name: 'Nicca Ganda'
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: 'About me',
        name: 'Nicca Ganda',
    })
})

app.get('/help', (req, res) => {
    res.render('help.hbs', {
        name: 'Nicca',
        title:'Help'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send ({
            error: 'You must put an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
        }
        res.send({
            forecast: forecastData,
            location,
            address: req.query.address
             })
         })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
       return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('40.hbs', {
        title: '404',
        name: 'Nicca',
        errormessage: 'Help Article Not Found'
    })
})

app.get('*', (req, res) => {
    res.render('404.hbs', {
        title: '404',
        name: 'Nicca',
        errormessage:'Page not found'
    })
})


app.listen(port, () => {
    console.log('Server listening on port ' + port);
})