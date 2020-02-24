let myGridSize = prompt('What size would you like player1\'s grid to be?');
let opponentGridSize = prompt('What size would you like player2\'s grid to be?');
let player1 = createGrid(myGridSize);
let player2 = createGrid(opponentGridSize);
let player1Ships = 3;
let player2Ships = 3;

console.log('Player1');
printGrind(player1);
console.log('Player2');
printGrind(player2);

function placeShips(){
    for (let i = 1; i < 4; i++){
        let xCoordinate = prompt('Player1 enter x coordinate for your ship number' + i);
        let yCoordinate = prompt('Player1 enter y coordinate for your ship number' + i);
        shipPosition(xCoordinate, yCoordinate, 'S', player1);
        console.log('Player1');
        printGrind(player1);
        xCoordinate = prompt('Player2 enter x coordinate for your ship number' + i);
        yCoordinate = prompt('Player2 enter y coordinate for your ship number' + i);
        shipPosition(xCoordinate, yCoordinate, 'S', player2);
        console.log('Player2');
        printGrind(player2);
    }
}


function gameplay(){
    while (player2Ships > 0 && player1Ships > 0) {
        let attackX1 = prompt('Player 1 enter the x coordinates for your attack');
        let attackY1 = prompt('Player 1 enter the y coordinates for your attack');
        let attackX2 = prompt('Player 2 enter the x coordinates for your attack');
        let attackY2 = prompt('Player 2 enter the x coordinates for your attack');
        if (attackShip1(attackX2,attackY2,player1)){
            player1Ships--;
        } 
        if (attackShip2(attackX1,attackY1,player2)){
            player2Ships--;
        }
        console.log('Player1');
        printGrind(player1);
        console.log('Player2');
        printGrind(player2);
    } 
    if (player2Ships == 0 && player1Ships > 0) {
        console.log('Congratulations Player1 has won!');
    } else {
        console.log('Congratulations Player2 has won!')
    }
}



function createGrid(size) {
    let grid = [];
    for (let i = 0; i < size; i++) {
        grid[i] = [];
        for (let j = 0; j < size; j++) {
            grid[i][j] = '-';
        }
    }
    return grid;
}

function printGrind(grid){
    const headers = createHeaders(grid.length);
    console.log(headers);
    for (let i = 0; i < grid.length; i++){
        let rowStr = i + ' ';
        for (let space of grid[i]) {
                rowStr += space + ' ';
        }
        console.log(rowStr);
    }
}

function createHeaders(size) {
    let result = '  ';
    let columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
    for (let i = 0; i < size; i++) {
        result += columns[i] + ' ';
    }
    return result;
}

function shipPosition(x, y, c, grid) {
    grid[y][x] = c
}

function attackShip1(x, y, grid) {
    if (grid[x][y] == 'S') {
        grid[x][y] = '!'
        return true;
    } else if (grid[x][y] == '-') {
        grid[x][y] = 'x';
        return false;
    } else {
        return false;
    }
}

function attackShip2(x, y, grid) {
    if (grid[x][y] == 'S') {
        grid[x][y] = '!'
        return true;
    } else if (grid[x][y] == '-') {
        grid[x][y] = 'x';
        return false;
    } else {
        return false;
    }
}



placeShips();
gameplay();