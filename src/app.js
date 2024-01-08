const path = require('path');
const express = require('express');
const hbs = require('hbs');
const { getWeatherForSite } = require('./weather_app.helper');

const app = express();
const author = 'Pallavi Agrawal';

// this will automatically set and access all the views (dynamic html) from `views` folder
// sets the view engine to Handlebars (hbs). 
// It tells Express to use Handlebars as the template engine for rendering dynamic HTML.
app.set('view engine', 'hbs');

// This will set the setting of views to read from a folder called templates. 
app.set('views', path.join(__dirname, '../templates/views'));
// This will tell from where to read the partials.
// partials are used as dynamic part of html which are commonalized and then added in all views (i.e. handlebar files)
hbs.registerPartials(path.join(__dirname, '../templates/partialViews'));

// to be used for rendering static content
// once this static content is set we can access all public folder files directly. imagine it like the are indexed.
// so you can use localhost:3000/css/styles.css or localhost:3000/index.html directly. 
// This also means that templates folder can also access these properties directly.
app.use(express.static(path.join(__dirname, '../public')));


app.get('', (req, res) => {
    // before views this file will read index.html from public but now it will read index.hbs
    res.render('index', {
        title: 'Weather App',
        author,
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        author,
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        author,
    });
});

app.get('/weather', async (req, res) => {
    try {
        const weatherData = await getWeatherForSite(req.query.address);
        res.send(weatherData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('*', (req, res) => {
    res.status(404);
    res.render('notFound', {
        title: 'Not Found',
        author
    });
});

app.listen(3000, () => {
    console.log("App is running on port 3000");
})
