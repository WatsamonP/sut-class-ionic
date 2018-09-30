let express = require('express'),
    path = require('path');
var app = express();
let server = require('http').Server(app);

app.use(express.static(path.join(__dirname)));

app.get('/', function(req, res, next){
    res.sendStatus(200);
});

app.get('/blog.html', function(req, res,next){
    res.sendFile(path.join(__dirname+"/blog.html"));
});

app.post('/contact', function(req, res, next){

});

const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log("App is running on port " + port);
});