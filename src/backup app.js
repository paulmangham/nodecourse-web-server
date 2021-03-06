const path = require('path');
const express = require('express');
const hbs = require('hbs');

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
        helpMessage: 'Not the help you want, but the help you need.',
        name: 'Paul M'
    });
});


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Error, address must be provided."
        })
    };

    res.send({
        forecast: 'Sunny',
        location: 'Dubai',
        address: req.query.address
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