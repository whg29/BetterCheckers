EMPTY = 0;
REDMAN = 1;
BLACKMAN = 2;
REDKING = 3;
BLACKKING = 4;

BLACK = 0;
RED = 1;

letters = "abcdefgh";
numbers = "12345678";

var board = new Array(8);
for (i = 0; i < 8; i ++) {
	board[i] = new Array(8).fill(EMPTY);
}

var setup = function(){
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

var strToCoords = function(coords){
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

var blackMove = function(space, direction){
	let coords = strToCoords(space);
	if (!coords) {
		return "Invalid input. Please input the letter and number of your selected piece's space.";
	}
	piece = spaceContents(coords);
	if (pieceColor(piece) != BLACK) {
		return "Please select a black piece.";
	}
	let destination = null;
	if (direction == "NW") {
		destination = spaceNW(coords);
	} else if (direction == "NE") {
		destination = spaceNE(coords);
	} else if (direction == "SW") {
		if (!isKing(piece)) {
			return "Only Kings may move backwards.";
		}
		destination = spaceSW(coords);
	} else if (direction == "SE") {
		if (!isKing(piece)) {
			return "Only Kings may move backwards.";
		}
		destination = spaceSE(coords);
	} else {
		return "Invalid direction."
	}
	if (!destination) {
		return "You cannot move a piece off the board."
	}
	otherSpace = spaceContents(destination);
	if (otherSpace != EMPTY) {
		return "Invalid move. Please move to an empty square."
	}
	move(coords, destination);
	return "Move made."
}

var redMove = function(space, direction){
	let coords = strToCoords(space);
	if (!coords) {
		return "Invalid input. Please input the letter and number of your selected piece's space.";
	}
	piece = spaceContents(coords);
	if (pieceColor(piece) != RED) {
		return "Please select a black piece.";
	}
	let destination = null;
	if (direction == "NW") {
		if (!isKing(piece)) {
			return "Only Kings may move backwards.";
		}
		destination = spaceNW(coords);
	} else if (direction == "NE") {
		if (!isKing(piece)) {
			return "Only Kings may move backwards.";
		}
		destination = spaceNE(coords);
	} else if (direction == "SW") {
		destination = spaceSW(coords);
	} else if (direction == "SE") {
		destination = spaceSE(coords);
	} else {
		return "Invalid direction."
	}
	if (!destination) {
		return "You cannot move a piece off the board."
	}
	otherSpace = spaceContents(destination);
	if (otherSpace != EMPTY) {
		return "Invalid move. Please move to an empty square."
	}
	move(coords, destination);
	return "Move made."
}

setup();
printBoard();
blackMove("c3", "NE");
console.log();
printBoard();

