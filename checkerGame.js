var OFFBOARD = -1;
var EMPTY = 0;
var REDMAN = 1;
var BLACKMAN = 2;
var REDKING = 3;
var BLACKKING = 4;

var NOCOLOR = -1;
var BLACK = 0;
var RED = 1;

var BLACKWORD = "Black";
var REDWORD = "Red";

var DIRECTIONS = ["NW", "NE", "SW", "SE"];

var letters = "abcdefgh";
var numbers = "12345678";

var board = new Array(8);
for (i = 0; i < 8; i ++) {
	board[i] = new Array(8).fill(EMPTY);
}

var turn = BLACK;
var lastMoved = null;
var blackCheckers = 12;
var redCheckers = 12;

var CONTINUING = 0;
var BLACKWINS_CAPTURE = 1;
var REDWINS_CAPTURE = 2;
var BLACKWINS_BLOCKING = 3;
var REDWINS_BLOCKING = 4;
var BLACKWINS_CONCEDE = 5;
var REDWINS_CONCEDE = 6;
var DRAW = 7;
var gameStatus = CONTINUING;

var setup = function() {
	board[0][1] = REDMAN;
	board[0][3] = REDMAN;
	board[0][5] = REDMAN;
	board[0][7] = REDMAN;
	board[2][1] = REDMAN;
	board[2][3] = REDMAN;
	board[2][5] = REDMAN;
	board[2][7] = REDMAN;
	board[1][0] = REDMAN;
	board[1][2] = REDMAN;
	board[1][4] = REDMAN;
	board[1][6] = REDMAN;

	board[5][0] = BLACKMAN;
	board[5][2] = BLACKMAN;
	board[5][4] = BLACKMAN;
	board[5][6] = BLACKMAN;
	board[6][1] = BLACKMAN;
	board[6][3] = BLACKMAN;
	board[6][5] = BLACKMAN;
	board[6][7] = BLACKMAN;
	board[7][0] = BLACKMAN;
	board[7][2] = BLACKMAN;
	board[7][4] = BLACKMAN;
	board[7][6] = BLACKMAN;
}

var getGameState = function() {
	return {"board": board, "turn": turn, "statusMessage": getStatusMessage()};
}

var setGameStatus = function(st) {
	gameStatus = st;
}

var getBlackCheckers = function() {
	return blackCheckers;
}

var getRedCheckers = function() {
	return redCheckers;
}

var setBlackCheckers = function(checkers) {
	blackCheckers = checkers;
}

var setRedCheckers = function(checkers) {
	redCheckers = checkers;
}

var getStatusMessage = function() {
	switch (gameStatus) {
	case BLACKWINS_CAPTURE:
		return "Black has captured all the opponent's pieces. Black wins!";
	case REDWINS_CAPTURE:
		return "Red has captured all the opponent's pieces. Red wins!";
	case BLACKWINS_BLOCKING:
		return "Red cannot make any legal moves. Black wins!";
	case REDWINS_BLOCKING:
		return "Black cannot make any legal moves. Red wins!";
	case BLACKWINS_CONCEDE:
		return "Red has conceded the game. Black wins!";
	case REDWINS_CONCEDE:
		return "Black has conceded the game. Red wins!";
	case DRAW:
		return "The game is a draw!";
	default:
		return "";
	}
}

var strToCoords = function(coords) {
	if (coords.length != 2 || !letters.includes(coords.charAt(0).toLowerCase()) || !numbers.includes(coords.charAt(1))) {
		return false;
	}
	col = coords.toLowerCase().charCodeAt(0) - 97;
	row = 8 - parseInt(coords.charAt(1));
	return [col, row];
}

var spaceContents = function(coords) {
	if (!coords) {
		return OFFBOARD;
	}
	if (0 <= coords[0] && coords[0] <= 7 && 0 <= coords[1] && coords[1] <= 7) {
		return board[coords[1]][coords[0]];
	}
	return OFFBOARD;
}

var setSpace = function(coords, piece) {
	board[coords[1]][coords[0]] = piece;
}

var move = function(start, end) {
	setSpace(end, spaceContents(start));
	setSpace(start, EMPTY);
}

var pieceColor = function(piece) {
	if (1 <= piece && piece <= 4) {
		return piece % 2;
	}
	return NOCOLOR;
}

var isKing = function(piece) {
	return piece >= 3;
}

var colorWord = function(color) {
	if (color == RED) {
		return REDWORD;
	}
	return BLACKWORD;
}

var opponent = function(color) {
	if (color == RED) {
		return BLACK;
	}
	return RED;
}

var validDirection = function(direction) {
	return DIRECTIONS.includes(direction.toUpperCase());
}

var spaceInDirection = function(coords, direction) {
	let col = coords[0];
	let row = coords[1];
	if (direction.charAt(0) == "N") {
		newrow = row - 1;
		if (newrow < 0) {
			return null;
		}
	} else if (direction.charAt(0) == "S") {
		newrow = row + 1;
		if (newrow > 7) {
			return null;
		}
	} else {
		return -1;
	}
	if (direction.charAt(1) == "W") {
		newcol = col - 1;
		if (newcol < 0) {
			return null;
		}
	} else if (direction.charAt(1) == "E") {
		newcol = col + 1;
		if (newcol > 7) {
			return null;
		}
	} else {
		return -1;
	}
	return [newcol, newrow];
}

var forward = function(color) {
	if (color == BLACK) {
		return "N";
	}
	return "S";
}

var flipTurn = function() {
	turn = opponent(turn);
}

var canMove = function(coords) {
	let piece = spaceContents(coords);
	if (piece > EMPTY && pieceColor(piece) == turn) {
		if (isKing(piece)) {
			dirs = DIRECTIONS;
		} else {
			dirs = [forward(turn) + "E", forward(turn) + "W"];
		}
		for (i = 0; i < dirs.length; i ++) {
			let dest = spaceInDirection(coords, dirs[i]);
			if (spaceContents(dest) == EMPTY) {
				return true;
			}
		}
	}
}

var canCapture = function(coords) {
	let piece = spaceContents(coords);
	if (piece > EMPTY && pieceColor(piece) == turn) {
		if (isKing(piece)) {
			dirs = DIRECTIONS;
		} else {
			dirs = [forward(turn) + "E", forward(turn) + "W"];
		}
		for (i = 0; i < dirs.length; i ++) {
			let dest = spaceInDirection(coords, dirs[i]);
			if (dest) {
				let otherPiece = spaceContents(dest);
				if (otherPiece > EMPTY && pieceColor(otherPiece) != turn && spaceContents(spaceInDirection(dest, dirs[i])) == EMPTY) {
					return true;
				}
			}
		}
	}
}

var anyLegalMoves = function() {
	for (col = 0; col < 8; col ++) {
		for (row = (col+1) % 2; row < 8; row += 2) {
			let coords = [col, row];
			if (canMove(coords) || canCapture(coords)) {
				return true;
			}
		}
	}
	return false;
}

var checkForcedCaptures = function() {
	for (col = 0; col < 8; col ++) {
		for (row = (col+1) % 2; row < 8; row += 2) {
			let coords = [col, row];
			if (canCapture(coords)) {
				return true;
			}
		}
	}
	return false;
}

var makeNonCapturingMove = function(sourceSpace, destSpace) {
	move(sourceSpace, destSpace);
	flipTurn();
}

var makeCapturingMove = function(sourceSpace, betweenSpace, destSpace) {
	move(sourceSpace, destSpace);
	if (pieceColor(betweenSpace) == BLACK) {
		setBlackCheckers(getBlackCheckers() - 1);
	} else {
		setRedCheckers(getBlackCheckers() - 1);
	}
	setSpace(betweenSpace, EMPTY);
	if (canCapture(destSpace)) {
		lastMoved = destSpace;
	} else {
		lastMoved = null;
		flipTurn();
	}
}

var executeMove = function(color, space, direction) {
	if (gameStatus != CONTINUING) {
		return getStatusMessage();
	}
	if (color != turn) {
		return "Please wait for " + colorWord(turn) + " to take their turn.";
	}
	if (!lastMoved) {
		coords = strToCoords(space);
		if (!coords) {
			return "Invalid space. Please input the letter and number of your selected piece's space.";
		}
		if (!validDirection(direction)) {
			return "Invalid direction. Please select northeast (NE), northwest (NW), southeast (SE) or southwest (SW)."
		}
	} else {
		coords = lastMoved;
	}
	piece = spaceContents(coords);
	if (piece <= EMPTY || pieceColor(piece) != color) {
		return "Please select a " + colorWord(color).toLowerCase() + " piece.";
	}
	if (direction.charAt(0) != forward(color) && !isKing(piece)) {
		return "Only Kings may move backwards.";
	}
	let destination = spaceInDirection(coords, direction);
	if (destination == -1) {
		return "Invalid direction.";
	}
	if (!destination) {
		return "You may not move a piece off the board.";
	}
	let otherSpace = spaceContents(destination);
	if (otherSpace == EMPTY) {
		if (lastMoved) {
			return "You must continue to jump until the piece can no longer make any jumps.";
		}
		if (checkForcedCaptures()) {
			return "You cannot make a non-capturing move while you have a capturing move available to you.";
		}
		makeNonCapturingMove(coords, destination);
	} else if (pieceColor(otherSpace) == color) {
		return "You may not capture your own pieces."
	} else {
		let betweenSpace = destination;
		destination = spaceInDirection(destination, direction);
		if (!destination) {
			return "You may not make a jump that moves your piece off the board.";
		}
		let captureSpace = spaceContents(destination);
		if (captureSpace != EMPTY) {
			return "You may not make a jump unless the space beyond the opponent's piece is unoccupied.";
		}
		makeCapturingMove(coords, betweenSpace, destination);
	}
	if (lastMoved) {
		return "You can make an additional capture."
	}
	if (blackCheckers == 0) {
		setGameStatus(REDWINS_CAPTURE);
	} else if (redCheckers == 0) {
		setGameStatus(BLACKWINS_CAPTURE);
	} else if (!anyLegalMoves()) {
		if (turn == RED) {
			setGameStatus(BLACKWINS_BLOCKING);
		} else {
			setGameStatus(REDWINS_BLOCKING);
		}
	}
	message = getStatusMessage();
	if (message) {
		return message;
	}
	if (!isKing(piece) && (destination[1] == 0 || destination[1] == 7)) {
		setSpace(destination, piece + 2);
		message = "Your Man has become a King. ";
	}
	return message + colorWord(turn) + "'s turn.";
}

var makeMove = function(color, space, direction) {
	return {"board": board, "status": gameStatus, "message": executeMove(color, space, direction)};
}

exports.BLACK = BLACK;
exports.RED = RED;
exports.makeMove = makeMove;
exports.getGameState = getGameState;
exports.setup = setup;
exports.enableDebug = function () {
	exports.board = board;
	exports.EMPTY = EMPTY;
	exports.REDMAN = REDMAN;
	exports.BLACKMAN = BLACKMAN;
	exports.REDKING = REDKING;
	exports.BLACKKING = BLACKKING;
	exports.setGameStatus = setGameStatus;
	exports.setBlackCheckers = setBlackCheckers;
	exports.setRedCheckers = setRedCheckers;
}
