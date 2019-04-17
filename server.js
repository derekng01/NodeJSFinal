const express = require('express');
const hbs = require('hbs');
const axios = require('axios');
const bodyParser = require('body-parser');

var app = express();
const fs = require('fs');


var utils = require('./utils')
const port = process.env.PORT || 8080;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


hbs.registerPartials(__dirname);

app.set('view engine', 'hbs');
app.use(express.static(__dirname ));


app.post('/input', async (request, response) => {
    var image = request.body.user;
    JSON.stringify(image);
    var money = await getAPI1(image, "USD");
    response.render('main.hbs', {
        output: money
    })
});

var getAPI1 = async (country, base) => {
    try{
        var url = await axios.get(`https://restcountries.eu/rest/v2/name/${country}`);
        var country_code = url.data[0].currencies[0].code;
        var currency = await axios.get(`https://api.exchangeratesapi.io/latest?symbols=${country_code}&base=${base}`);
        var json_string = JSON.stringify(currency.data.rates[`${country_code}`]);
        return `1 ${base} is equal to ${json_string} ${country_code}`;
    }catch(err) {
        if (`${err}` === "Error: Request failed with status code 404") {
            return "The country name entered is incorrect"
        }
        if (`${err}` === "Error: Request failed with status code 400") {
            return "The base currency entered is incorrect"
        }
    }
};






app.get('/', (request, response) => {
    response.render('main.hbs', {
        title: "Home Page",
        header: "Welcome to Home!"
    });
});

app.get('/404', (request, response) => {
    response.send({error: 'Page not found'})
});


// app.post('/input', (request, response)=> {
//     var user_input = request.body;
//     var user_input = JSON.stringify((user_input.user))
//     console.log(user_input);
//
//     response.render('main.hbs', {
//         output: user_input
//     })
// });

app.listen(port, () => {
    console.log('Server is up on the port 8080')
});