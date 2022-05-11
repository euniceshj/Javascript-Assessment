//import all required modules

const prompt = require('prompt-sync')({sigint: true});
const clear = require('clear-screen');
 
const treasure = '$';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const row = 10;
const col = 10;


//If you prefer to use functions, please go ahead
//In this kick-starter we are using Class Object

//1) Build the whole Field out (10 rows x 10 columns)
//Create a 2D Array 
//Contract the layout of the field using empty array
let randomX = Math.floor(Math.random()*row);
let randomY = Math.floor(Math.random()*col);

class Field {
    field = [];
    constructor() {

        //The current location of the character *
        //Char * can be always at the default position of (0, 0)
        this.locationX = 0;     //row
        this.locationY = 0;     //colum

        for (let a = 0; a < row; a++) {
            this.field[a] = [];
        }
        this.generateField(); //put in the patches of grass in the plot
    }

    generateField() {
        

        //Building plot of grass field
        for (let x = 0 ; x < row; x++) {
            for (let y = 0; y < col; y++) {
                // const prob = Math.random();
                this.field[x][y] = fieldCharacter;   
            }
        }
        
        //Set the "hat" location and holes locations ==> these must be random
        // //Random Holes
        //let holeFormula = this.field[Math.floor(Math.random() * row)][Math.floor(Math.random() * col)]
        for (let x = 0; x < 6; x++) {
            for (let y = 0; y < 5 ; y++) {
                this.field[Math.floor(Math.random() * row)][Math.floor(Math.random() * col)] = hole;
            }
        }

        //Treasure Chest
        this.field[randomX][randomY] = treasure;
        
        //Player
        this.field[this.locationX][this.locationY] = pathCharacter;
        
    }

    runGame() {
        this.print();
        this.askQuestion();
    }

    print() {
        clear();
        const displayString = this.field.map(row => {
            return row.join(''); 
        }).join ('\n');
        console.log(displayString);
    }

    askQuestion() {
        let answer = prompt('Which way').toUpperCase();
        //Implement your codes
        let newLoc = this.field[this.locationX][this.locationY];

        while (newLoc != treasure) {
            for (let i = 0; i < row; i++){
                for (let j = 0; j < col; j++) {
                    if (answer == 'U') {
                        let newLocX = this.locationX + 1 ;
                        newLoc = this.field[this.newLocX][this.newLocY]
                        answer = prompt('Which way').toUpperCase(); 
                        this.runGame();
                    } 
                    else if (answer == 'D') {
                        let newLocX = this.locationX - 1 ;
                        newLoc = this.field[this.newLocX][this.newLocY]
                        answer = prompt('Which way').toUpperCase(); 
                        this.runGame();
                    }
                    else if (answer == 'L') {
                        let newLocY = this.locationY - 1 ;
                        newLoc = this.field[this.newLocX][this.newLocY]
                        answer = prompt('Which way').toUpperCase(); 
                        this.runGame();
                    }
                    else if (answer == 'R') {
                        this.runGame();
                        let newLocY = this.locationY + 1 ;
                        newLoc = this.field[this.newLocX][this.newLocY]
                        answer = prompt('Which way').toUpperCase(); 
                        this.runGame();
                    }
                    else {
                        console.log('Invalid key. Enter U, D, L, or R to play. Please try again.')
                        answer = prompt('Which way').toUpperCase();
                    };
                } 

                if (newLoc === hole) {
                    console.log("Sorry, you fell down a hole.")
                }
                else if (newLoc != hole || newLocation != fieldCharacter) {
                    console.log("You fell into the abyss. Game over.")
                }
            };
        }
    }

} //END OF FIELD CLASS


//Create an instance object for the Field
const myField = new Field();
myField.runGame();