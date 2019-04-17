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
    var cards = request.body.user;
    JSON.stringify(cards);
    var cards = await getAPI1(cards);
    cards = cards.split(",")
    console.log(cards[0])
    response.render('main.hbs', {
        output1: cards[0],
        output2:cards[1],
        output3:cards[2],
        output4:cards[3],
        output5:cards[4],
        output6:cards[5],
        output7:cards[6],
        output8:cards[7],
        output9:cards[8],
        output10:cards[9],
        output11:cards[10],
        output12:cards[11],
        output13:cards[12],
        output14:cards[13],
        output15:cards[14],
        output16:cards[15],
        output17:cards[16],
        output18:cards[17],
        output19:cards[18],
        output20:cards[19],
        output21:cards[20],
        output22:cards[21],
        output23:cards[22],
        output24:cards[23],
        output25:cards[24],
        output26:cards[25],
        output27:cards[26],
        output28:cards[27],
        output29:cards[28],
        output30:cards[29],
        output31:cards[30],
        output32:cards[31],
        output33:cards[32],
        output34:cards[33],
        output35:cards[34],
        output36:cards[35],
        output37:cards[36],
        output38:cards[37],
        output39:cards[38],
        output40:cards[39],
        output41:cards[40],
        output42:cards[41],
        output43:cards[42],
        output44:cards[43],
        output45:cards[44],
        output46:cards[45],
        output47:cards[46],
        output48:cards[47],
        output49:cards[48],
        output50:cards[49],
        output51:cards[50],
        output52:cards[51],
    })
});


app.post('/input2', async (request, response) => {
    var search = request.body.user;
    JSON.stringify(search);

    var search = await getAPI2(search);

    response.render('second.hbs', {
        output1: search

    })
});


var getAPI1 = async (cards) => {
    try{
        var url = await axios.get(`https://deckofcardsapi.com/api/deck/new/draw/?count=${cards}`);
         var x = parseInt(cards)
        console.log(x)
        var list_cards = []
        for (i = 0; i < cards; i++){
            var country_code = url.data.cards[i].images.png;
            list_cards.push(country_code)
        }
        return `${list_cards}`;
    }catch(err) {
        if (`${err}` === "Server Error (500)") {
            return "Incorrect number of cards"
        }
    }
};








route.post('/get_image', async(request, response)=> {
    try{
        var entry = request.body.image_entry;
        var imageapi = await geocode.getImage(entry);
        // console.log(imageapi);
        var images = [];

        for (var i=0; i<imageapi.length; i++){
            images.push({path: imageapi[i].links[0].href});
        }
        response.render('index', {
            jumbo_main: "Welcome",
            jumbo_sec: "Image Parser",
            url: images
        })
    }catch(err){
        if (err){
            response.render('index', {
                jumbo_main: "Welcome",
                jumbo_sec: err
            })
        }
    }
});

app.get('/', (request, response) => {
    response.render('main.hbs', {
        title: "Home Page",
        header: "Welcome to Home!"
    });
});

app.get('/2', (request, response) => {
    response.render('gallery.hbs', {
        title: "Home Page",
        header: "Welcome to Home!"
    });
});

app.get('/404', (request, response) => {
    response.send({error: 'Page not found'})
});


app.listen(port, () => {
    console.log('Server is up on the port 8080')
});