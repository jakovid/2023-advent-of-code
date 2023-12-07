const fs = require('fs');
const input = fs.readFileSync('race.txt', 'utf8');
const inputArray = input.split('\n');
const inputMatrix = inputArray.map(e => e.split('  '))
console.log(inputMatrix)

let margin = 1

for (let i = 0; i < inputMatrix[0].length; i++){
    let ways = 0
    let time = parseInt(inputMatrix[0][i])
    let distance = parseInt(inputMatrix[1][i])
    for(let j = 0; j <= time; j++){

        let wayDistance = (time - j) * j
        if (wayDistance > distance){
            ways++
        }
    }
    margin *= Math.max(1, ways)
}

console.log(margin)