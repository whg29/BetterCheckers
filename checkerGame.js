var EMPTY = 0;
var REDMAN = 1;
var BLACKMAN = 2;
var REDKING = 3;
var BLACKKING = 4;

var BLACK = 0;
var RED = 1;

var BLACKWORD = "Black";
var REDWORD = "Red";

var letters = "abcdefgh";
var numbers = "12345678";

var board = new Array(8);
for (i = 0; i < 8; i ++) {
	board[i] = new Array(8).fill(EMPTY);
}

var turn = BLACK;

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

var strToCoords = function(coords) {
	if (coords.length != 2 || !letters.includes(coords.charAt(0).toLowerCase()) || !numbers.includes(coords.charAt(1))) {
		return false;
	}
	col = coords.toLowerCase().charCodeAt(0) - 97;
	row = 8 - parseInt(coords.charAt(1));
	return [col, row];
}

var printBoard = function() {
	board.forEach(function(item){
		console.log(item);
	});
}

var spaceContents = function(coords) {
	if (0 <= coords[0] && coords[0] <= 7 && 0 <= coords[1] && coords[1] <= 7) {
		return board[coords[1]][coords[0]];
	}
	return -1;
}

var setSpace = function(coords, piece) {
	board[coords[1]][coords[0]] = piece;
}

var move = function(start, end) {
	setSpace(end, spaceContents(start));
	setSpace(start, EMPTY);
}

var pieceColor = function(piece) {
	return piece % 2;
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

var spaceNW = function(coords) {
	let col = coords[0];
	let row = coords[1];
	let newrow = row - 1;
	if (newrow < 0) {
		return null;
	}
	let newcol = col - 1;
	if (newrow < 0) {
		return null;
	}
	return [newcol, newrow];
}

var spaceNE = function(coords) {
	let col = coords[0];
	let row = coords[1];
	let newrow = row - 1;
	if (newrow < 0) {
		return null;
	}
	let newcol = col + 1;
	if (newrow > 7) {
		return null;
	}
	return [newcol, newrow];
}

var spaceSW = function(coords) {
	let col = coords[0];
	let row = coords[1];
	let newrow = row + 1;
	if (newrow > 7) {
		return null;
	}
	let newcol = col - 1;
	if (newrow < 0) {
		return null;
	}
	return [newcol, newrow];
}

var spaceSE = function(coords) {
	let col = coords[0];
	let row = coords[1];
	let newrow = row + 1;
	if (newrow > 7) {
		return null;
	}
	let newcol = col + 1;
	if (newrow > 7) {
		return null;
	}
	return [newcol, newrow];
}

var spaceInDirection = function(coords, direction) {
	let destination = -1;
	if (direction == "NW") {
		destination = spaceNW(coords);
	} else if (direction == "NE") {
		destination = spaceNE(coords);
	} else if (direction == "SW") {
		destination = spaceSW(coords);
	} else if (direction == "SE") {
		destination = spaceSE(coords);
	}
	return destination;
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

var nonCapturingMove = function(coords, destination) {
	move(coords, destination);
	flipTurn();
}

var capturingMove = function(space1, space2, space3) {
	move(space1, space3);
	setSpace(space2, EMPTY);
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
	if (pieceColor(piece) != color) {
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
		nonCapturingMove(coords, destination);
	} else if (pieceColor(otherSpace) == color) {
		return "You may not capture your own pieces."
	} else {
		let captureDestination = spaceInDirection(destination, direction);
		if (!captureDestination) {
			return "You cannot make a jump that moves your piece off the board.";
		}
		let captureSpace = spaceContents(captureDestination);
		if (captureSpace != EMPTY) {
			return "You cannot make a jump unless the space beyond the opponent's piece is empty.";
		}
		capturingMove(coords, destination, captureDestination);
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

setup();
printBoard();
console.log();
console.log(makeMove(BLACK, "c3", "NE"));
console.log(makeMove(BLACK, "b2", "NW"));

