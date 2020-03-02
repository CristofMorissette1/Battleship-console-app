import {prompt} from "./prompt";


export default class Game {
  constructor() {
    let player1;
    let player2;
    let player1Ships;
    let player2Ships;
  }

  async start() {
    let size = await this.gridValidation();
    this.player1 = this.createGrid(size);
    this.player2 = this.createGrid(size);
    this.player1Ships = 3;
    this.player2Ships = 3;

    await this.placeShips(size);
    await this.gameplay(size);
  }

  end() {
    process.exit();
  }

  async placeShips(size){
    let ships = 0;
    let iterations = 4;
    let player2fail = false
    for (let i = 1; i < iterations; i++){
      ships++
      if(!player2fail) {



      const player1Result = await prompt([{
        name: "playerOneX",
        description: 'Player1 enter x coordinate for your ship number' + ships
      }, {
        name: "playerOneY",
        description: 'Player1 enter y coordinate for your ship number' + ships
      }]);

      const {playerOneX, playerOneY} = player1Result;
      if (!this.characterCheck(playerOneX) || !this.characterCheck(playerOneY)) {
        console.log("Invalid ship entry, try again");
        iterations++;
        ships--;
        continue;
      } else if (parseInt(playerOneX) > parseInt(size) || parseInt(playerOneY) > parseInt(size) || playerOneX < 0) {
        console.log("Invalid ship entry, try again");
        iterations++;
        ships--;
        continue;
      } else {
        this.shipPosition(playerOneX, playerOneY, 'S', this.player1);
        this.printGrind(this.player1);
      }



      } else {




        const player2Result = await prompt([{
          name: "playerTwoX",
          description: 'Player2 enter x coordinate for your ship number' + ships
        }, {
          name: "playerTwoY",
          description: 'Player2 enter y coordinate for your ship number' + ships
        }]);

        const {playerTwoX, playerTwoY} = player2Result;
        if (!this.characterCheck(playerTwoX) || !this.characterCheck(playerTwoY)){
          console.log("Invalid ship entry, try again");
          iterations++;
          ships--
          player2fail = true;
        } else if (parseInt(playerTwoX) > parseInt(size)) {
          console.log("Invalid ship entry, try again");
          iterations++;
          ships--
          player2fail = true;
          continue;
        } else {
          this.shipPosition(playerTwoX, playerTwoY, 'S', this.player2);
          this.printGrind(this.player2);
        }  
      } 

      player2fail = false;

      const player2Result = await prompt([{
        name: "playerTwoX",
        description: 'Player2 enter x coordinate for your ship number' + ships
      }, {
        name: "playerTwoY",
        description: 'Player2 enter y coordinate for your ship number' + ships
      }]);

      const {playerTwoX, playerTwoY} = player2Result;
      if (!this.characterCheck(playerTwoX) || !this.characterCheck(playerTwoY)){
        console.log("Invalid ship entry, try again");
        iterations++;
        ships--
        player2fail = true;
      } else if (parseInt(playerTwoX) > parseInt(size)) {
        console.log("Invalid ship entry, try again");
        iterations++;
        ships--
        player2fail = true;
        continue;
      } else {
        this.shipPosition(playerTwoX, playerTwoY, 'S', this.player2);
        this.printGrind(this.player2);
      }  
    }
  }
  

  async gameplay(size){
    let player2Fail = false;
    while (this.player2Ships > 0 && this.player1Ships > 0) {

      if (!player2Fail){
      const playerOneAttack = await prompt([{
        name: "playerOneX",
        description: "Player 1 enter the x coordinates for your attack"
      }, {
        name: "playerOneY",
        description: "Player 1 enter the y coordinates for your attack"
      }]);

      const {playerOneX, playerOneY} = playerOneAttack;
      if (!this.characterCheck(playerOneX) || !this.characterCheck(playerOneY)) {
        console.log("Enter valid coordinate");
        continue;
      } else if (parseInt(playerOneX) > parseInt(size) || parseInt(playerOneY) > parseInt(size)) {
        console.log("Enter valid coordinate");
        continue;
      } else {
        if (this.attackShip2(playerOneAttack.playerOneX, playerOneAttack.playerOneY, this.player2)){
          this.player2Ships--;
        }
        console.log('Player1');
        this.printGrind(this.player1);
      }
      } else {
        const playerTwoAttack = await prompt([{
          name: "playerTwoX",
          description: "Player 2 enter the x coordinates for your attack"
        }, {
          name: "playerTwoY",
          description: "Player 2 enter the y coordinates for your attack"
        }]);
  
        const {playerTwoX, playerTwoY} = playerTwoAttack;
        if (!this.characterCheck(playerTwoX) || !this.characterCheck(playerTwoY)) {
          player2Fail = true;
          console.log("Enter valid coordinate")
          continue;
        } else if (parseInt(playerTwoX) > parseInt(size) || parseInt(playerTwoY) > parseInt(size)){
          player2Fail = true;
          console.log("Enter valid coordinate")
          continue;
        } else {
          if (this.attackShip1(playerTwoAttack.playerTwoX, playerTwoAttack.playerTwoY, this.player1)){
            this.player1Ships--;
          }
          console.log("Player2")
          this.printGrind(this.player2);
        }
      }


  
      const playerTwoAttack = await prompt([{
        name: "playerTwoX",
        description: "Player 2 enter the x coordinates for your attack"
      }, {
        name: "playerTwoY",
        description: "Player 2 enter the y coordinates for your attack"
      }]);

      const {playerTwoX, playerTwoY} = playerTwoAttack;
      if (!this.characterCheck(playerTwoX) && !this.characterCheck(playerTwoY)) {
        console.log("Enter valid coordinate")
        continue;
      } else if (parseInt(playerTwoX) > parseInt(size) || parseInt(playerTwoY) > parseInt(size)) {
        console.log("Enter valid coordinate")
        continue;
      } else {
        if (this.attackShip1(playerTwoAttack.playerTwoX, playerTwoAttack.playerTwoY, this.player1)){
          this.player1Ships--;
        }
        console.log("Player2")
        this.printGrind(this.player2);
      }
    }
    player2Fail = false;

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

  characterCheck(x) {
    let charArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    if (x === ''){
      return false;
    }
    for(let i = 0; i < x.length; x++) {
      if(!charArray.includes(x[i])) {
        return false;
      }
    }
    return true
  }

  async gridValidation() {
    for (let i = 0; i < 1; i++) {
      const {size} = await prompt([{
        name: "size",
        description: "What size would you like the players grid to be?"
      }]);
      if (!this.characterCheck(size)) {
        i--
        console.log('Enter a valid number');
        continue;
      } else {
        return size;
      }
    }
  }
}