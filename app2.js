/**
 * Module dependencies.
 */

var express = require('express');
var mysql = require('mysql');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

//----JO ------------------------------------------
var database='m1';
var table='master';

var connection=mysql.createConnection({
	host:"localhost",
	user:"root",
	database:'m1'
});
connection.connect(function(err){
	if(err !=null){
		console.log("erro na ligação ao mysql !!!");
	}else{
		console.log("CONNECTION app2 OK !!! na ligação ao mysql !!!");
	};

});
connection.query("SELECT key_id FROM master",function(err,rows,fields){
	if(err) throw err;
	console.log("Query results:",rows);
});
connection.end();

// ------------------------------------------------

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//app.get('/', routes.index);
//http://www.youtube.com/watch?v=Hc3v6wbmebQ route strings
/*
app.get('/', function(req, res) {
	//res.send("Hello, Express!");//ok	
	res.sendfile('./views/index.html');
	//res.send({name:"jojo",age:57});

});
*/
app.get('/hi', function(req, res) {
	var message=[
		"<h1>Hello Express</h1>", "<p>Welcome to Jo Server</p>",
		"<ul><li>fast</li>",
		"<li>fun</li>",
		"<li>flexible</li></ul>"].join("\n");
	res.send(message);//ok	
});
//app.get('/users', user.list);
app.get('/', function(req, res) {
	res.sendfile('./views/index.html');
});
app.get('/article', function(req, res) {
	res.sendfile('./views/article.html');
});
app.get('/about', function(req, res) {
	res.sendfile('./views/about.html');
});
/*
app.get('/users/:userId', function(req, res) {
	res.send("<h1>Hello "+req.params.userId+"!</h1>");
});
*/
app.get(/\/users\/(\d*)\/?(edit)?/, function(req, res) {
    var message="user #"+req.params[0]+"'s profile";
    if(req.params[1]==="edit"){//if second parameter exists
		message="Editing "+message;
    }else{
		message="Viewing "+message;
    };
    res.send(message);
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('JOJO Express server listening on port ' + app.get('port'));
});

//app.listen(3000);
