import {prompt} from "./prompt";




export default class Game {
  constructor() {
    let player1;
    let player2;
    let player1Ships;
    let player2Ships;
  }

  async start() {
    const {size} = await prompt([{
      name: "size",
      description: "What size would you like the players grid to be?"
    }]);

    this.player1 = this.createGrid(size);
    this.player2 = this.createGrid(size);
    this.player1Ships = 3;
    this.player2Ships = 3;

    await this.placeShips();
    await this.gameplay();
  }

  end() {
    process.exit();
  }

  async placeShips(){
    try{
    for (let i = 1; i < 4; i++){
      const player1Result = await prompt([{
        name: "playerOneX",
        description: 'Player1 enter x coordinate for your ship number' + i
      }, {
        name: "playerOneY",
        description: 'Player1 enter y coordinate for your ship number' + i
      }]);
    }
  } catch (error) {
    console.log("Cant place ship outside of grid");
  }
    

      const player2Result = await prompt([{
        name: "playerTwoX",
        description: 'Player2 enter x coordinate for your ship number' + i
      }, {
        name: "playerTwoY",
        description: 'Player2 enter y coordinate for your ship number' + i
      }]);

      const {playerTwoX, playerTwoY} = player2Result;

      this.shipPosition(playerTwoX, playerTwoY, 'S', this.player2);
      this.printGrind(this.player2);
    }
  

  async gameplay(){
    while (this.player2Ships > 0 && this.player1Ships > 0) {
      const playerOneAttack = await prompt([{
        name: "x",
        description: "Player 1 enter the x coordinates for your attack"
      }, {
        name: "y",
        description: "Player 1 enter the y coordinates for your attack"
      }]);

      const playerTwoAttack = await prompt([{
        name: "x",
        description: "Player 2 enter the x coordinates for your attack"
      }, {
        name: "y",
        description: "Player 2 enter the y coordinates for your attack"
      }]);

      if (this.attackShip1(playerTwoAttack.x, playerTwoAttack.y, this.player1)){
        this.player1Ships--;
      }
      if (this.attackShip2(playerOneAttack.x, playerOneAttack.y, this.player2)){
        this.player2Ships--;
      }

      console.log('Player1');
      this.printGrind(this.player1);
      console.log('Player2');
      this.printGrind(this.player2);
    }
    if (this.player2Ships == 0 && this.player1Ships > 0) {
      console.log('Congratulations Player1 has won!');
    } else {
      console.log('Congratulations Player2 has won!')
    }

    this.end();
  }

  createGrid(size) {
    let grid = [];
    for (let i = 0; i < size; i++) {
      grid[i] = [];
      for (let j = 0; j < size; j++) {
        grid[i][j] = '-';
      }
    }
    return grid;
  }

  printGrind(grid){
    const headers = this.createHeaders(grid.length);
    console.log(headers);
    for (let i = 0; i < grid.length; i++){
      let rowStr = i + ' ';
      for (let space of grid[i]) {
        rowStr += space + ' ';
      }
      console.log(rowStr);
    }
  }

  createHeaders(size) {
    let result = '  ';
    let columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
    for (let i = 0; i < size; i++) {
      result += columns[i] + ' ';
    }
    return result;
  }

  shipPosition(x, y, c, grid) {
    grid[y][x] = c
  }

  attackShip1(x, y, grid) {
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

  attackShip2(x, y, grid) {
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
}