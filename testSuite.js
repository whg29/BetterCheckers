var game = require("./checkerGame.js");

var clearBoard = function() {
	for (i = 0; i < 8; i ++) {
		game.board[i] = new Array(8).fill(game.EMPTY);
	}
}

game.setup();

//Moving
console.log(game.makeMove(game.BLACK, "c3", "NE").message);
console.log(game.makeMove(game.RED, "f6", "SW").message);
//Forced captures
console.log(game.makeMove(game.BLACK, "b2", "NE"));
console.log(game.makeMove(game.BLACK, "d4", "NE"));
console.log(game.makeMove(game.RED, "d6", "SW"));
console.log(game.makeMove(game.RED, "e7", "SE"));
//Multiple jumps
clearBoard();
game.board[0][1] = game.REDMAN;
game.board[7][0] = game.BLACKMAN;
game.board[6][1] = game.REDMAN;
game.board[4][3] = game.REDMAN;
console.log(game.makeMove(game.BLACK, "a1", "NE"));
console.log(game.makeMove(game.RED, "d4", "SW"));
console.log(game.makeMove(game.BLACK, "a3", "NW"));
console.log(game.makeMove(game.BLACK, "a3", "NE"));
