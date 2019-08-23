var game = require("./checkerGame.js");

var clearBoard = function() {
	for (i = 0; i < 8; i ++) {
		game.board[i] = new Array(8).fill(EMPTY);
	}
}

game.setup();

console.log(game.makeMove(game.BLACK, "c3", "NE").message);
console.log(game.makeMove(game.RED, "f6", "SW").message);
console.log(game.makeMove(game.BLACK, "b2", "NE"));
console.log(game.makeMove(game.BLACK, "d4", "NE"));
