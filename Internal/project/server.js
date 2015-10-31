var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var getApiData = require('./server/json/getAPIData.json');
var vList = JSON.parse(JSON.stringify(getApiData));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'ApiData',
    cookie: { maxAge: 300000 },
    resave: false,
    saveUninitialized: true
}));

app.use(function (req, res, next) {

    if (!req.session.vList) {
        req.session.vList = vList;
    }

    next();
})

app.use(express.static(__dirname + '/app'));


//Tiles Mobile
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/app/index.html');
});

//APIS

app.get('/api/apiData', function (req, res) {
    var tempGetApiData = JSON.parse(JSON.stringify(getApiData));
    tempGetApiData = req.session.vList;
    setTimeout(function () {
        res.send(tempGetApiData);
    }, 500);
});






//LISTEN

app.listen(3008);
console.log('Listening on port 3008');
