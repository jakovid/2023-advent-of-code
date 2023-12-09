const fs = require('fs');
const input = fs.readFileSync('instability.txt', 'utf8');
const inputArray = input.split('\n');
const inputMatrix = inputArray.map(e => e.split(' ').map(n => parseInt(n)))

let futureSum = 0
let pastSum = 0

for(const input of inputMatrix){
    let data = Array(input.length + 1)
    data[0] = input

    for(let i = 1; i < input.length; i++){
        data[i] = Array(input.length).fill(0)
        for(let j = i; j < input.length; j++){
            data[i][j] = data[i-1][j] - data[i-1][j-1]
        }
    }

    for(let i = input.length - 1; i >= 0; i--){
        let left = data[i][input.length-1]
        let bottom = i === input.length - 1 ? 0 : data[i+1][input.length]
        data[i].push(left+bottom)
    }
    
    let pastArray = Array(input.length + 1).fill(0)
    for(let i = data.length - 2; i >= 0; i--){
        pastArray[i] = data[i][i] - pastArray[i+1]
    }

    pastSum += pastArray[0]
    futureSum += data[0][input.length-1]
}

console.log('Past', pastSum, 'Future',futureSum)