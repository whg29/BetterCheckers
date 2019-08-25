var square_class = document.getElementsByClassName("square");
var red_checker_class = document.getElementsByClassName("red_checker");
var black_checker_class = document.getElementsByClassName("black_checker");
var table = document.getElementById("table");

var windowHeight = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;;
var windowWidth = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

var moveLength = 80;
var moveDeviation = 10;
var Dimension = 1;
var selectedPiece, selectedPieceindex;
var upRight, upLeft, downLeft, downRight;
var contor = 0, gameOver = 0;
var bigScreen = 1;

var block = [];
var red_piece = [];
var black_piece = [];
var the_checker;
var oneMove;
var anotherMove;
var mustAttack = false;
var multiplier = 1

var tableLimit, reverse_tableLimit, moveUpLeft, moveUpRight, moveDownLeft, moveDownRight, tableLimitLeft, tableLimitRight;


getDimension();
if (windowWidth > 640) {
    moveLength = 80;
    moveDeviation = 10;
}
else {
    moveLength = 50;
    moveDeviation = 6;
}


var square_p = function (square, index) {
    this.id = square;
    this.ocupied = false;
    this.pieceId = undefined;
    this.id.onclick = function () {
        makeMove(index);
    }
}

var checker = function (piece, color, square) {
    this.id = piece;
    this.color = color;
    this.king = false;
    this.ocupied_square = square;
    this.alive = true;
    this.attack = false;
    if (square % 8) {
        this.x_coordinate = square % 8;
        this.y_coordinate = Math.floor(square / 8) + 1;
    }
    else {
        this.x_coordinate = 8;
        this.y_coordinate = square / 8;
    }
    this.id.onclick = function () {
        showMoves(piece);
    }
}

checker.prototype.setCoord = function (X, Y) {
    var x = (this.x_coordinate - 1) * moveLength + moveDeviation;
    var y = (this.y_coordinate - 1) * moveLength + moveDeviation;
    this.id.style.top = y + 'px';
    this.id.style.left = x + 'px';
}

checker.prototype.changeCoord = function (X, Y) {
    this.y_coordinate += Y;
    this.x_coordinate += X;
}

checker.prototype.checkIfKing = function () {
    if (this.y_coordinate == 8 && !this.king && this.color == "white") {
        this.king = true;
        this.id.style.border = "4px solid #FFFF00";
    }
    if (this.y_coordinate == 1 && !this.king && this.color == "black") {
        this.king = true;
        this.id.style.border = "4px solid #FFFF00";
    }
}


for (var i = 1; i <= 64; i++)
    block[i] = new square_p(square_class[i], i);


// white checkers
for (var i = 1; i <= 4; i++) {
    red_piece[i] = new checker(red_checker_class[i], "white", 2 * i - 1);
    red_piece[i].setCoord(0, 0);
    block[2 * i - 1].ocupied = true;
    block[2 * i - 1].pieceId = red_piece[i];
}

for (var i = 5; i <= 8; i++) {
    red_piece[i] = new checker(red_checker_class[i], "white", 2 * i);
    red_piece[i].setCoord(0, 0);
    block[2 * i].ocupied = true;
    block[2 * i].pieceId = red_piece[i];
}

for (var i = 9; i <= 12; i++) {
    red_piece[i] = new checker(red_checker_class[i], "white", 2 * i - 1);
    red_piece[i].setCoord(0, 0);
    block[2 * i - 1].ocupied = true;
    block[2 * i - 1].pieceId = red_piece[i];
}

// black checkers
for (var i = 1; i <= 4; i++) {
    black_piece[i] = new checker(black_checker_class[i], "black", 56 + 2 * i);
    black_piece[i].setCoord(0, 0);
    block[56 + 2 * i].ocupied = true;
    block[56 + 2 * i].pieceId = black_piece[i];
}

for (var i = 5; i <= 8; i++) {
    black_piece[i] = new checker(black_checker_class[i], "black", 40 + 2 * i - 1);
    black_piece[i].setCoord(0, 0);
    block[40 + 2 * i - 1].ocupied = true;
    block[40 + 2 * i - 1].pieceId = black_piece[i];
}

for (var i = 9; i <= 12; i++) {
    black_piece[i] = new checker(black_checker_class[i], "black", 24 + 2 * i);
    black_piece[i].setCoord(0, 0);
    block[24 + 2 * i].ocupied = true;
    block[24 + 2 * i].pieceId = black_piece[i];
}


function getDimension() {
    contor++;
    windowHeight = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;;
    windowWidth = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
}


document.getElementsByTagName("BODY")[0].onresize = function () {

    getDimension();
    var cpy_bigScreen = bigScreen;

    if (windowWidth < 650) {
        moveLength = 50;
        moveDeviation = 6;
        if (bigScreen == 1) bigScreen = -1;
    }
    if (windowWidth > 650) {
        moveLength = 80;
        moveDeviation = 10;
        if (bigScreen == -1) bigScreen = 1;
    }

    if (bigScreen != cpy_bigScreen) {
        for (var i = 1; i <= 12; i++) {
            black_piece[i].setCoord(0, 0);
            red_piece[i].setCoord(0, 0);
        }
    }
}




