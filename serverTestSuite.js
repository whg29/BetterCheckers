var game = require("./checkerGame.js");
game.enableDebug();

var clearBoard = function() {
	for (i = 0; i < 8; i ++) {
		game.board[i] = new Array(8).fill(game.EMPTY);
	}
}

var resetGame = function() {
	clearBoard();
	game.setup();
	game.setGameStatus(0);
	game.setBlackCheckers(12);
	game.setRedCheckers(12);
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
// console.log(game.makeMove(game.RED, "d4", "SE"));

// //Ending the game by capture
// clearBoard();
// game.board[0][1] = game.REDKING;
// game.board[1][2] = game.BLACKMAN;
// game.setBlackCheckers(1);
// game.setRedCheckers(1);
// console.log(game.makeMove(game.BLACK, "c7", "NE"));
// console.log(game.makeMove(game.RED, "b8", "SE"));
// console.log(game.makeMove(game.BLACK, "d8", "SE"));
// console.log(game.makeMove(game.BLACK, "d8", "SW"));

// //Ending the game by blocking
// clearBoard();
// game.board[5][6] = game.REDMAN;
// game.board[1][4] = game.REDMAN;
// game.board[2][5] = game.REDMAN;
// game.board[2][1] = game.REDMAN;
// game.board[0][1] = game.REDKING;
// game.board[2][3] = game.REDKING;
// game.board[1][2] = game.BLACKMAN;
// console.log(game.makeMove(game.RED, "g3", "SW"));
// console.log(game.makeMove(game.BLACK, "c7", "NE"));
// console.log(game.makeMove(game.RED, "d6", "NW"));
