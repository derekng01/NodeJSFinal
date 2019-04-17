const express = require('express');
const hbs = require('hbs');
const axios = require('axios');
const bodyParser = require('body-parser');

var app = express();
const fs = require('fs');

const port = process.env.PORT || 8080;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


hbs.registerPartials(__dirname);

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));


app.get('/', (request, response) => {
    response.render('main.hbs', {
        title: "Home Page",
        header: "Welcome to Home!"
    });
});

app.get('/404', (request, response) => {
    response.send({error: 'Page not found'})
});


app.post('/input', (request, response)=> {
    var user_input = request.body;
    var user_input = JSON.stringify((user_input.user))
    console.log(user_input);

    response.render('main.hbs', {
        output: user_input
    })
});

app.listen(port, () => {
    console.log('Server is up on the port 8080')
});