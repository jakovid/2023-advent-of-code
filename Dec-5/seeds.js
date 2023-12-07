const fs = require('fs');
const input = fs.readFileSync('seeds.txt', 'utf8');
const inputArray = input.split('\n\n');
const part1 = inputArray[0].slice(6).trim().split(' ')

const seeds = part1
let seedSoilMap = new Map()
seeds.forEach(e => seedSoilMap.set(parseInt(e),parseInt(e)))
const seedSoil = inputArray[1].slice(18).split('\n').map(e => e.split(' '))

for (const [key, value] of seedSoilMap){
    seedSoil.forEach((e) => {
        let seed = parseInt(e[1])
        let soil = parseInt(e[0])
        let limit = parseInt(e[2])
        if (key >= seed && key < seed + limit){
            seedSoilMap.set(key, key - seed + soil)
        }
    })

}

let soilFertMap = new Map()
seedSoilMap.forEach((value,key) => soilFertMap.set(value,value))
const soilFert = inputArray[2].slice(24).split('\n').map(e => e.split(' '))

for (const [key, value] of soilFertMap){
    soilFert.forEach((e) => {
        let soil = parseInt(e[1])
        let fert = parseInt(e[0])
        let limit = parseInt(e[2])
        if (key >= soil && key < soil + limit){
            soilFertMap.set(key, key - soil + fert)
        }
    })
}

let fertWaterMap = new Map()
soilFertMap.forEach((value,key) => fertWaterMap.set(value,value))
const fertWater = inputArray[3].slice(25).split('\n').map(e => e.split(' '))

for (const [key, value] of fertWaterMap){
    fertWater.forEach((e) => {
        let fert = parseInt(e[1])
        let water = parseInt(e[0])
        let limit = parseInt(e[2])
        if (key >= fert && key < fert + limit){
            fertWaterMap.set(key, key - fert + water)
        }
    })
}

let waterLightMap = new Map()
fertWaterMap.forEach((value,key) => waterLightMap.set(value,value))
const waterLight = inputArray[4].slice(20).split('\n').map(e => e.split(' '))

for (const [key, value] of waterLightMap){
    waterLight.forEach((e) => {
        let water = parseInt(e[1])
        let light = parseInt(e[0])
        let limit = parseInt(e[2])
        if (key >= water && key < water + limit){
            waterLightMap.set(key, key - water + light)
        }
    })
}

let lightTempMap = new Map()
waterLightMap.forEach((value,key) => lightTempMap.set(value,value))
const lightTemp = inputArray[5].slice(26).split('\n').map(e => e.split(' '))

for (const [key, value] of lightTempMap){
    lightTemp.forEach((e) => {
        let light = parseInt(e[1])
        let temp = parseInt(e[0])
        let limit = parseInt(e[2])
        if (key >= light && key < light + limit){
            lightTempMap.set(key, key - light + temp)
        }
    })
}

let tempHumMap = new Map()
lightTempMap.forEach((value,key) => tempHumMap.set(value,value))
const tempHum = inputArray[6].slice(29).split('\n').map(e => e.split(' '))

for (const [key, value] of tempHumMap){
    tempHum.forEach((e) => {
        let temp = parseInt(e[1])
        let hum = parseInt(e[0])
        let limit = parseInt(e[2])
        if (key >= temp && key < temp + limit){
            tempHumMap.set(key, key - temp + hum)
        }
    })
}

let humLocMap = new Map()
tempHumMap.forEach((value,key) => humLocMap.set(value,value))
const humLoc = inputArray[7].slice(26).split('\n').map(e => e.split(' '))

for (const [key, value] of humLocMap){
    humLoc.forEach((e) => {
        let hum = parseInt(e[1])
        let loc = parseInt(e[0])
        let limit = parseInt(e[2])
        if (key >= hum && key < hum + limit){
            humLocMap.set(key, key - hum + loc)
        }
    })
}

console.log('Part 1', Math.min(...humLocMap.values()))

