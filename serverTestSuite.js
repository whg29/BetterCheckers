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
	game.setBlackCheckers(12);
	game.setRedCheckers(12);
	game.setGameStatus(0);
}

// Following are some test cases. Uncomment them to run them.

// //Input validation
// resetGame();
// console.log("Input validation");
// console.log(game.makeMove(game.BLACK, "d", "NE"));
// console.log(game.makeMove(game.BLACK, "c3 ", "NE"));
// console.log(game.makeMove(game.BLACK, "3c", "NE"));
// console.log(game.makeMove(game.BLACK, "c3", "northeast"));
//
// //Legal move selection
// resetGame();
// console.log("Legal move selection");
// console.log(game.makeMove(game.BLACK, "d4", "NE"));
// console.log(game.makeMove(game.BLACK, "f6", "NE"));
// console.log(game.makeMove(game.BLACK, "c3", "SE"));
// console.log(game.makeMove(game.RED, "f6", "SW"));
//
// //Non-capturing moves
// resetGame();
// console.log("Non-capturing moves");
// console.log(game.makeMove(game.BLACK, "c3", "NE"));
// console.log(game.makeMove(game.RED, "f6", "SW"));
//
// //Capturing moves and forced captures
// resetGame();
// console.log("Capturing moves and forced captures");
// game.makeMove(game.BLACK, "c3", "NE");
// game.makeMove(game.RED, "f6", "SW");
// console.log(game.makeMove(game.BLACK, "b2", "NE"));
// console.log(game.makeMove(game.BLACK, "d4", "NE"));
// console.log(game.makeMove(game.RED, "d6", "SW"));
// console.log(game.makeMove(game.RED, "e7", "SE"));
//
// //Multiple jumps
// clearBoard();
// console.log("Multiple jumps");
// game.board[0][1] = game.REDMAN;
// game.board[7][0] = game.BLACKMAN;
// game.board[6][1] = game.REDMAN;
// game.board[4][3] = game.REDMAN;
// console.log(game.makeMove(game.BLACK, "a1", "NE"));
// console.log(game.makeMove(game.RED, "d4", "SW"));
// console.log(game.makeMove(game.BLACK, "a3", "NW"));
// console.log(game.makeMove(game.BLACK, "a3", "NE"));
// console.log(game.makeMove(game.RED, "b8", "SE"));
//
// //"King Me"
// clearBoard();
// console.log("King Me");
// game.board[0][1] = game.REDMAN;
// game.board[1][2] = game.BLACKMAN;
// game.board[3][4] = game.REDMAN;
// game.board[5][5] = game.REDMAN;
// game.board[5][1] = game.BLACKMAN;
// console.log(game.getGameState());
// console.log(game.makeMove(game.BLACK, "c7", "NE"));
// console.log(game.makeMove(game.RED, "b8", "SE"));
//
// //King movement - note that unlike the other test cases, this one follows directly from "King Me"
// console.log("King movement");
// console.log(game.makeMove(game.BLACK, "d8", "SW"));
// console.log(game.makeMove(game.RED, "e5", "SW"));
// console.log(game.makeMove(game.BLACK, "b6", "SE"));
// console.log(game.makeMove(game.RED, "d4", "SE"));
//
// //Ending the game by capture
// clearBoard();
// console.log("Victory by capture");
// game.board[0][1] = game.REDKING;
// game.board[1][2] = game.BLACKMAN;
// game.setBlackCheckers(1);
// game.setRedCheckers(1);
// console.log(game.makeMove(game.BLACK, "c7", "NE"));
// console.log(game.makeMove(game.RED, "b8", "SE"));
// console.log(game.makeMove(game.BLACK, "d8", "SE"));
// console.log(game.makeMove(game.BLACK, "d8", "SW"));
//
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
