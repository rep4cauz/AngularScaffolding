var express = require('express');
var app = express();

app.use('/', express.static(__dirname + '/app/'));


//tiles mobile
app.get('/', function (req, res) {
    res.sendfile('app/index.html')
});

//APISs

app.get('/worksets', function (req, res) {
    setTimeout(function () {
        res.sendfile('server/json/getApiData.json');
    }, 500);
});


//LISTEN

app.listen(3000);
console.log('Listening on port 3000');