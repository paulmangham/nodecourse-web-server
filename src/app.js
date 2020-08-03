const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const postWebhook = require('./utils/postWebhook');

// Create express app
const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views', viewsPath);

// Setup path to handlebars partials
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// Express routes
app.get('', (req, res) => {
    res.render('index', { 
        title: 'Weather',
        name: 'Paul M'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        name: 'Paul M'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        helpMessage: 'Not the help you want, but the help you deserve.',
        name: 'Paul M'
    });
});


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Address must be provided."
        })
    };
    // if we do get an address, do this
    geocode(req.query.address, (error, { location, latitude, longitude } = {}) => {
        if (error) {
            return res.send({ error });
        };
        forecast(latitude, longitude, (error, forecast) => {
            if (error) {
                return res.send({ error });
            };
            res.send({
                addressRequested: req.query.address,
                location,
                forecast
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        });
    };

    console.log(req.query);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found.',
        title: '404',
        name: 'Paul M'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'My 404 page',
        title: '404',
        name: 'Paul M'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});