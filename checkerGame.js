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

var blackCheckers = 12;
var redCheckers = 12;
var gameStatus = 0;

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
	return {"board": board, "status": gameStatus, "turn": turn};
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
	if (turn == RED) {
		turn = BLACK;
	} else {
		turn = RED;
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

var checkForcedCaptures = function() {
	for (col = 0; col < 8; col ++) {
		for (row = 0; row < 8; row ++) {
			let coords = [col, row];
			if (canCapture([col, row])) {
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
	if (turn == RED) {
		blackCheckers -= 1;
	} else {
		redCheckers -= 1;
	}
	setSpace(betweenSpace, EMPTY);
	if (!checkForcedCaptures()) {
		flipTurn();
	}
}

var executeMove = function(color, space, direction) {
	if (color != turn) {
		return "Please wait for " + colorWord(turn) + " to take their turn.";
	}
	let coords = strToCoords(space);
	if (!coords) {
		return "Invalid input. Please input the letter and number of your selected piece's space.";
	}
	let piece = spaceContents(coords);
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
		return "You cannot move a piece off the board.";
	}
	let otherSpace = spaceContents(destination);
	if (otherSpace == EMPTY) {
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
			return "You cannot make a jump that moves your piece off the board.";
		}
		let captureSpace = spaceContents(destination);
		if (captureSpace != EMPTY) {
			return "You cannot make a jump unless the space beyond the opponent's piece is empty.";
		}
		makeCapturingMove(coords, betweenSpace, destination);
	}
	message = "";
	if (!isKing(piece) && (coords[1] == 0 || coords[1] == 7)) {
		setSpace(destination, piece + 2);
		message = "Your Man on space " + space.toLowerCase() + " has become a King. ";
	}
	return message + colorWord(turn) + "'s turn.";;
}

var makeMove = function(color, space, direction) {
	return {"board": board, "status": gameStatus, "message": executeMove(color, space, direction)};
}

exports.BLACK = BLACK;
exports.RED = RED;
exports.board = board;
exports.setup = setup;
exports.makeMove = makeMove;
exports.getGameState = getGameState;
