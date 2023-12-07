const fs = require('fs');
const input = fs.readFileSync('scratchcard.txt', 'utf8');
const inputArray = input.split('\n');
const gamelessArray = inputArray.map(e => e.slice(10))
const split = gamelessArray.map(game => game.split(' | '))
const splitNested = split.map(game => game.map(g => g.trimStart().replace(/  +/g, ' ').split(' ')))

let sum = 0

for (const card of splitNested){
    let value = 0.5
    let winningNumbers = new Set(card[0])
    for (const num of card[1]){
        if(winningNumbers.has(num)){
            value *= 2
        }
    }
    sum += value < 1 ? 0 : value
}

console.log('Part 1', sum)

let cardCount = 0

let cardAmounts = Array(splitNested.length).fill(1)

for (let i = 0; i < splitNested.length; i++){
    cardCount += cardAmounts[i]
    let winningNumbers = new Set(splitNested[i][0])
    let timesWon = 0
    for (const num of splitNested[i][1]){
        if(winningNumbers.has(num)){
            timesWon++
        }
    }

    for(let j = 1; j <= timesWon; j++){
        cardAmounts[i+j] += cardAmounts[i]
    }
}

console.log('Part 2', cardCount)