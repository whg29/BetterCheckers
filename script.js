var square_class = document.getElementsByClassName("square");
var red_checker_class = document.getElementsByClassName("white_checker");
var black_checker_class = document.getElementsByClassName("black_checker");
var table = document.getElementById("table");
var score = document.getElementById("score");
var black_background = document.getElementById("black_background");

var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;;
var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var moveLength = 80;
var moveDeviation = 10;
var Dimension = 1;
var selectedPiece, selectedPieceindex;
var upRight, upLeft, downLeft, downRight;
var contor = 0, gameOver = 0;
var bigScreen = 1;

var block = [];
var red_checker = [];
var black_checker = [];
var the_checker;
var oneTurn;
var anotherMove;
var forcedCapture = false;
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
        make_move(index);
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
        show_moves(piece);
    }
}

checker.prototype.set_coordinate = function (X, Y) {
    var x = (this.x_coordinate - 1) * moveLength + moveDeviation;
    var y = (this.y_coordinate - 1) * moveLength + moveDeviation;
    this.id.style.top = y + 'px';
    this.id.style.left = x + 'px';
}

checker.prototype.shift_coordinate = function (X, Y) {
    this.y_coordinate = this.y_coordinate + Y;
    this.x_coordinate = this.x_coordinate + X;
}

checker.prototype.check_for_king = function () {
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


for (var i = 1; i <= 4; i++) {
    red_checker[i] = new checker(red_checker_class[i], "white", 2 * i);
    red_checker[i].set_coordinate(0, 0);
    block[2 * i].ocupied = true;
    block[2 * i].pieceId = red_checker[i];
}

for (var i = 5; i <= 8; i++) {
    red_checker[i] = new checker(red_checker_class[i], "white", 2 * i - 1);
    red_checker[i].set_coordinate(0, 0);
    block[2 * i - 1].ocupied = true;
    block[2 * i - 1].pieceId = red_checker[i];
}

for (var i = 9; i <= 12; i++) {
    red_checker[i] = new checker(red_checker_class[i], "white", 2 * i);
    red_checker[i].set_coordinate(0, 0);
    block[2 * i].ocupied = true;
    block[2 * i].pieceId = red_checker[i];
}


for (var i = 1; i <= 4; i++) {
    black_checker[i] = new checker(black_checker_class[i], "black", 56 + 2 * i - 1);
    black_checker[i].set_coordinate(0, 0);
    block[56 + 2 * i - 1].ocupied = true;
    block[56 + 2 * i - 1].pieceId = black_checker[i];
}

for (var i = 5; i <= 8; i++) {
    black_checker[i] = new checker(black_checker_class[i], "black", 40 + 2 * i);
    black_checker[i].set_coordinate(0, 0);
    block[40 + 2 * i].ocupied = true;
    block[40 + 2 * i].pieceId = black_checker[i];
}

for (var i = 9; i <= 12; i++) {
    black_checker[i] = new checker(black_checker_class[i], "black", 24 + 2 * i - 1);
    black_checker[i].set_coordinate(0, 0);
    block[24 + 2 * i - 1].ocupied = true;
    block[24 + 2 * i - 1].pieceId = black_checker[i];
}


the_checker = red_checker;

function show_moves(piece) {


    var match = false;
    forcedCapture = false;
    if (selectedPiece) {
        erase_roads(selectedPiece);
    }
    selectedPiece = piece;
    var i, j;
    for (j = 1; j <= 12; j++) {
        if (the_checker[j].id == piece) {
            i = j;
            selectedPieceindex = j;
            match = true;
        }
    }

    if (oneTurn && !capture_moves(oneTurn)) {
        switch_turns(oneTurn);
        oneTurn = undefined;
        return false;
    }
    if (oneTurn && oneTurn != the_checker[i]) {
        return false;
    }

    if (!match) {
        return 0;
    }



    tL = 8;
    tLR = 1;
    tLL = 8;
    mUR = 7;
    mUL = 9;
    mDR = -9;
    mDL = -7

    etL = 1;
    etLR = 8;
    etLL = 1;
    emUR = -7;
    emUL = -9;
    emDR = 9;
    emDL = 7



    if (the_checker[i].color == "white") {
        tableLimit = tL;
        tableLimitRight = tLR;
        tableLimitLeft = tLL;
        moveUpRight = mUR;
        moveUpLeft = mUL;
        moveDownRight = mDR;
        moveDownLeft = mDL;
    }
    else {
        tableLimit = etL;
        tableLimitRight = etLR;
        tableLimitLeft = etLL;
        moveUpRight = emUR;
        moveUpLeft = emUL;
        moveDownRight = emDR;
        moveDownLeft = emDL;
    }



    capture_moves(the_checker[i]);




    if (!forcedCapture) {
        downLeft = check_move(the_checker[i], tableLimit, tableLimitRight, moveUpRight, downLeft);
        downRight = check_move(the_checker[i], tableLimit, tableLimitLeft, moveUpLeft, downRight);
        if (the_checker[i].king) {
            upLeft = check_move(the_checker[i], reverse_tableLimit, tableLimitRight, moveDownRight, upLeft);
            upRight = check_move(the_checker[i], reverse_tableLimit, tableLimitLeft, moveDownLeft, upRight)
        }
    }
    if (downLeft || downRight || upLeft || upRight) {
        return true;
    }
    return false;

}


function erase_roads(piece) {
    if (downRight) block[downRight].id.style.background = "#BA7A3A";
    if (downLeft) block[downLeft].id.style.background = "#BA7A3A";
    if (upRight) block[upRight].id.style.background = "#BA7A3A";
    if (upLeft) block[upLeft].id.style.background = "#BA7A3A";
}



function make_move(index) {
    var is_valid_move = false;
    if (!selectedPiece)
        return false;
    if (index != upLeft && index != upRight && index != downLeft && index != downRight) {
        erase_roads(0);
        selectedPiece = undefined;
        return false;
    }


    if (the_checker[1].color == "white") {
        cpy_downRight = upRight;
        cpy_downLeft = upLeft;
        cpy_upLeft = downLeft;
        cpy_upRight = downRight;
    }
    else {
        cpy_downRight = upLeft;
        cpy_downLeft = upRight;
        cpy_upLeft = downRight;
        cpy_upRight = downLeft;
    }

    if (forcedCapture)
        multiplier = 2;
    else
        multiplier = 1;


    if (index == cpy_upRight) {
        is_valid_move = true;
        if (the_checker[1].color == "white") {

            execute_move(multiplier * 1, multiplier * 1, multiplier * 9);

            if (forcedCapture) eliminateCheck(index - 9);
        }
        else {
            execute_move(multiplier * 1, multiplier * -1, multiplier * -7);
            if (forcedCapture) eliminateCheck(index + 7);
        }
    }

    if (index == cpy_upLeft) {

        is_valid_move = true;
        if (the_checker[1].color == "white") {
            execute_move(multiplier * -1, multiplier * 1, multiplier * 7);
            if (forcedCapture) eliminateCheck(index - 7);
        }
        else {
            execute_move(multiplier * -1, multiplier * -1, multiplier * -9);
            if (forcedCapture) eliminateCheck(index + 9);
        }
    }

    if (the_checker[selectedPieceindex].king) {

        if (index == cpy_downRight) {
            is_valid_move = true;
            if (the_checker[1].color == "white") {
                execute_move(multiplier * 1, multiplier * -1, multiplier * -7);
                if (forcedCapture) eliminateCheck(index + 7);
            }
            else {
                execute_move(multiplier * 1, multiplier * 1, multiplier * 9);
                if (forcedCapture) eliminateCheck(index - 9);
            }
        }

        if (index == cpy_downLeft) {
            is_valid_move = true;
            if (the_checker[1].color == "white") {
                execute_move(multiplier * -1, multiplier * -1, multiplier * -9);
                if (forcedCapture) eliminateCheck(index + 9);
            }
            else {
                execute_move(multiplier * -1, multiplier * 1, multiplier * 7);
                if (forcedCapture) eliminateCheck(index - 7);
            }
        }
    }

    erase_roads(0);
    the_checker[selectedPieceindex].check_for_king();


    if (is_valid_move) {

        anotherMove = undefined;
        if (forcedCapture) {
            anotherMove = capture_moves(the_checker[selectedPieceindex]);
        }
        if (anotherMove) {
            oneTurn = the_checker[selectedPieceindex];
            show_moves(oneTurn);
        }
        else {
            oneTurn = undefined;
            switch_turns(the_checker[1]);
            gameOver = check_loss();
            if (gameOver) { setTimeout(declareWinner(), 3000); return false };
            gameOver = check_for_moves();
            if (gameOver) { setTimeout(declareWinner(), 3000); return false };
        }
    }
}



function execute_move(x_val, y_val, nSquare) {
    // schimb coordonate piesei mutate
    the_checker[selectedPieceindex].shift_coordinate(x_val, y_val);
    the_checker[selectedPieceindex].set_coordinate(0, 0);

    block[the_checker[selectedPieceindex].ocupied_square].ocupied = false;

    block[the_checker[selectedPieceindex].ocupied_square + nSquare].ocupied = true;
    block[the_checker[selectedPieceindex].ocupied_square + nSquare].pieceId = block[the_checker[selectedPieceindex].ocupied_square].pieceId;
    block[the_checker[selectedPieceindex].ocupied_square].pieceId = undefined;
    the_checker[selectedPieceindex].ocupied_square += nSquare;

}

function check_move(Apiece, tLimit, tLimit_Side, moveDirection, theDirection) {
    if (Apiece.y_coordinate != tLimit) {
        if (Apiece.x_coordinate != tLimit_Side && !block[Apiece.ocupied_square + moveDirection].ocupied) {
            block[Apiece.ocupied_square + moveDirection].id.style.background = "#704923";
            theDirection = Apiece.ocupied_square + moveDirection;
        }
        else
            theDirection = undefined;
    }
    else
        theDirection = undefined;
    return theDirection;
}



function verify_capture(check, x_val, y_val, negative_x, negative_y, squareMove, direction) {
    if (check.x_coordinate * negative_x >= x_val * negative_x && check.y_coordinate * negative_y <= y_val * negative_y && block[check.ocupied_square + squareMove].ocupied && block[check.ocupied_square + squareMove].pieceId.color != check.color && !block[check.ocupied_square + squareMove * 2].ocupied) {
        forcedCapture = true;
        direction = check.ocupied_square + squareMove * 2;
        block[direction].id.style.background = "#704923";
        return direction;
    }
    else
        direction = undefined;
    return direction;
}

function eliminateCheck(indexx) {
    if (indexx < 1 || indexx > 64)
        return 0;

    var x = block[indexx].pieceId;
    x.alive = false;
    block[indexx].ocupied = false;
    x.id.style.display = "none";
}


function capture_moves(ckc) {

    upRight = undefined;
    upLeft = undefined;
    downRight = undefined;
    downLeft = undefined;

    if (ckc.king) {
        if (ckc.color == "white") {
            upRight = verify_capture(ckc, 6, 3, -1, -1, -7, upRight);
            upLeft = verify_capture(ckc, 3, 3, 1, -1, -9, upLeft);
        }
        else {
            downLeft = verify_capture(ckc, 3, 6, 1, 1, 7, downLeft);
            downRight = verify_capture(ckc, 6, 6, -1, 1, 9, downRight);
        }
    }
    if (ckc.color == "white") {
        downLeft = verify_capture(ckc, 3, 6, 1, 1, 7, downLeft);
        downRight = verify_capture(ckc, 6, 6, -1, 1, 9, downRight);
    }
    else {
        upRight = verify_capture(ckc, 6, 3, -1, -1, -7, upRight);
        upLeft = verify_capture(ckc, 3, 3, 1, -1, -9, upLeft);
    }

    if (ckc.color == "black" && (upRight || upLeft || downLeft || downRight)) {
        var p = upLeft;
        upLeft = downLeft;
        downLeft = p;

        p = upRight;
        upRight = downRight;
        downRight = p;

        p = downLeft;
        downLeft = downRight;
        downRight = p;

        p = upRight;
        upRight = upLeft;
        upLeft = p;
    }
    if (upLeft != undefined || upRight != undefined || downRight != undefined || downLeft != undefined) {
        return true;

    }
    return false;
}

function switch_turns(ckc) {
    if (ckc.color == "white")
        the_checker = black_checker;
    else
        the_checker = red_checker;
}

function check_loss() {
    var i;
    for (i = 1; i <= 12; i++)
        if (the_checker[i].alive)
            return false;
    return true;
}

function check_for_moves() {
    var i;
    for (i = 1; i <= 12; i++)
        if (the_checker[i].alive && show_moves(the_checker[i].id)) {
            erase_roads(0);
            return false;
        }
    return true;
}

function declareWinner() {
    black_background.style.display = "inline";
    score.style.display = "block";
    0
    if (the_checker[1].color == "white")
        score.innerHTML = "Black wins";
    else
        score.innerHTML = "Red wins";
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
            black_checker[i].setCoord(0, 0);
            red_checker[i].setCoord(0, 0);
        }
    }
}




