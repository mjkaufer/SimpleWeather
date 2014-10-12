var express = require('express');
var bodyParser = require('body-parser');
var request = require("request");
var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/:lat/:lon', function(req, res){
	console.log(req.params.lat)
	console.log(req.params.lon)
	var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + req.params.lat + "&lon=" + req.params.lon;
	request(url, function(err,resp, body){
		console.log(body);
		body = JSON.parse(body);
		ret = (9/5 * (body.main.temp - 273) + 32) + "F - " + body.main.humidity + "%";
		ret += "\n" + body.weather[0].main + " - " + new Date().toLocaleTimeString();

		res.status(200);
		res.end(ret);
		console.log(ret);
	})

});


var server = app.listen(port, function() {
    console.log('Listening on port ' + port);
});