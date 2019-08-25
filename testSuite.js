var game = require("./checkerGame.js");

var clearBoard = function() {
	for (i = 0; i < 8; i ++) {
		game.board[i] = new Array(8).fill(game.EMPTY);
	}
}

var resetGame = function() {
	clearBoard();
	game.setup();
}

// Following are some test cases. Uncomment them to run them.

// //Input validation
// resetGame();
// console.log(game.makeMove(game.BLACK, "d", "NE"));
// console.log(game.makeMove(game.BLACK, "c3 ", "NE"));
// console.log(game.makeMove(game.BLACK, "c3", "northeast"));

// //Legal move selection
// resetGame();
// console.log(game.makeMove(game.BLACK, "d4", "NE"));
// console.log(game.makeMove(game.BLACK, "f6", "NE"));
// console.log(game.makeMove(game.BLACK, "c3", "SE"));
// console.log(game.makeMove(game.RED, "f6", "SW"));

// //Non-capturing moves
// resetGame();
// console.log(game.makeMove(game.BLACK, "c3", "NE"));
// console.log(game.makeMove(game.RED, "f6", "SW"));

// //Capturing moves and forced captures
// resetGame();
// game.makeMove(game.BLACK, "c3", "NE");
// game.makeMove(game.RED, "f6", "SW");
// console.log(game.makeMove(game.BLACK, "b2", "NE"));
// console.log(game.makeMove(game.BLACK, "d4", "NE"));
// console.log(game.makeMove(game.RED, "d6", "SW"));
// console.log(game.makeMove(game.RED, "e7", "SE"));

// //Multiple jumps
// clearBoard();
// game.board[0][1] = game.REDMAN;
// game.board[7][0] = game.BLACKMAN;
// game.board[6][1] = game.REDMAN;
// game.board[4][3] = game.REDMAN;
// console.log(game.makeMove(game.BLACK, "a1", "NE"));
// console.log(game.makeMove(game.RED, "d4", "SW"));
// console.log(game.makeMove(game.BLACK, "a3", "NW"));
// console.log(game.makeMove(game.BLACK, "a3", "NE"));
// console.log(game.makeMove(game.RED, "b8", "SE"));

// //"King Me"
// clearBoard();
// game.board[0][1] = game.REDMAN;
// game.board[1][2] = game.BLACKMAN;
// game.board[3][4] = game.REDMAN;
// console.log(game.getGameState());
// console.log(game.makeMove(game.BLACK, "c7", "NE"));
// console.log(game.makeMove(game.RED, "b8", "SE"));

// //King movement
// console.log(game.makeMove(game.BLACK, "d8", "SW"));
// console.log(game.makeMove(game.RED, "e5", "SW"));
// console.log(game.makeMove(game.BLACK, "b6", "SE"));
