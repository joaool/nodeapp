/**
 * Module dependencies.
 */

var express = require('express');
//var routes = require('./routes');
//var user = require('./routes/user');
//var path = require('path');
var http = require('http');
var app = express();

/*
//----JO ------------------------------------------
var mysql = require('mysql');
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
*/
// ------------------------------------------------

// all environments
app.configure(function(){
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname+'/views');
	app.set('view engine', 'jade');

	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.logger('dev'));
	app.use(express.static(__dirname+'/public'));
});
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
};

var users=["joe","jeff","Sally","Sarah","Kim","john","Jane"];
console.log("Passa por aqui !!!");
/*
app.get('/users/:from-:to', function(req, res) {
    var from=parseInt(req.params.from,10);//if missing 10 will be the default
    var to=parseInt(req.params.to,10);
     res.json(users.slice(from,to+1));
});
*/
app.param('from', function(req, res,next,from) {
    req.from=parseInt(from,10);//to make "from" acessible to functions down bellow
    console.log("from="+req.from);
    next();//to pass the request to next laywer of middleware
});
app.param('to', function(req, res,next,to) {
    req.to=parseInt(to,10);//to make "to" acessible to functions down bellow
    console.log("to="+req.to);
    next();//to pass the request to next laywer of middleware
});
app.get('/users/:from-:to', function(req, res) {
    res.json(users.slice(req.from,req.to+1));
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('JO3 Express server listening on port ' + app.get('port'));
});

//app.listen(3000);
