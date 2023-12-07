const fs = require('fs');
const input = fs.readFileSync('games.txt', 'utf8');
const inputArray = input.split('\n');
const noGame = inputArray.map(game => game.slice(game.indexOf(":")+2))
const removeComma = noGame.map(game => game.replace(/,/g, "").replace(/;/g,""))
const gameArrays = removeComma.map(game => game.split(' '))
let sum = 0
let limits = { "red" : 12, "green": 13, "blue":14}
for (let i = 0; i < gameArrays.length; i++){
    let gameNumber = i + 1
    for (let j = 0; j < gameArrays[i].length; j+=2){
        let value = gameArrays[i][j]
        let color = gameArrays[i][j+1]

        if ( value > limits[color]) {
            gameNumber = 0
            break
        }
        
    }
    sum += gameNumber
}
console.log('Part 1:', sum)

// Part 2
let power = 0
for(const game of gameArrays){
    let minValues = {"red": 0, "green": 0, "blue": 0}
    for (let i = 0; i < game.length; i++){
        let value = game[i]
        let color = game[i+1]
        minValues[color] = Math.max(minValues[color], value)
    }
    power += (minValues["red"] * minValues["green"] * minValues["blue"])
}

console.log("Part 2:", power)