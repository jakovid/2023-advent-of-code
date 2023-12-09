const fs = require('fs');
const input = fs.readFileSync('map.txt', 'utf8').replaceAll('(', '[').replaceAll(')',']');
const inputArray = input.split('\n\n');
let directions = inputArray[0]
let maps = inputArray[1].split("\n").map(e => e.split(' = '))
let mapsMap = new Map()
maps.forEach(e => mapsMap.set(e[0], e[1]))

let counter = 0
let currentLocation = 'AAA'
let currentDirection = 0
let directionsLength = directions.length
let target = 'ZZZ'

console.log(target)

while(currentLocation != target){
    let potentialWays = mapsMap.get(currentLocation)
    counter++
    currentLocation = directions[currentDirection % directionsLength] === "L" ? potentialWays.substring(1, 4) : potentialWays.substring(6, 9)
    currentDirection++
}


console.log(counter)