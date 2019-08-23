var game = require("./checkerGame.js");
var express = require("express");

var app = express();
app.use(express.static("."));

app.get("/blackMove", function(req, resp){
	resp.write(game.makeMove(game.BLACK, req.query["space"], req.query["direction"]));
	resp.end();
});

app.get("/redMove", function(req, resp){
	resp.write(game.makeMove(game.RED, req.query["space"], req.query["direction"]));
	resp.end();
});


// app.listen(8080, function(){
// 	console.log("Server started, listening on port 8080.")
// });
