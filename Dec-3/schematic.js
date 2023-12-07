const fs = require('fs');
const input = fs.readFileSync('schematic.txt', 'utf8');
const inputArray = input.split('\n');
const inputMatrix = inputArray.map(line => line.split(""))

function getElement(row, col) {
    if (row < 0 || row >= inputMatrix.length) {
        return ".";
    }

    if (col < 0 || col >= inputMatrix[0].length) {
        return ".";
    }
    return inputMatrix[row][col];
}

function checkIfTrue(row, col){
    let tl = getElement(row - 1, col - 1);
    let tm = getElement(row - 1, col);
    let tr = getElement(row - 1, col + 1);
    let ml = getElement(row, col - 1);
    let mr = getElement(row, col + 1);
    let bl = getElement(row + 1, col - 1);
    let bm = getElement(row + 1, col);
    let br = getElement(row + 1, col + 1);
    let arr1 = [tl, tm, tr, ml, mr, bl, bm, br]

    for (const square of arr1){
        if (square === ".") continue
        if (isNaN(square)){
            return true
        }
    }

    return false
}

let sum = 0

for (let i = 0; i < inputMatrix.length; i++){
    let stack = []
    let isValid = false
    for (let j = 0; j < inputMatrix[0].length; j++){
        
        if (!isNaN(inputMatrix[i][j])){
            stack.push(inputMatrix[i][j])
            isValid = isValid || checkIfTrue(i,j)
        }
        if ((isNaN(inputMatrix[i][j]) || j === inputMatrix[0].length - 1) && stack.length > 0 && isValid){
            sum += parseInt(stack.join(''))
            
        }
        if(isNaN(inputMatrix[i][j])){
            stack = []
            isValid = false
        }
    }
}

console.log("Part 1:", sum)

let gears = new Map()

for(let i = 0; i < inputMatrix.length; i++){
    for (let j=0; j < inputMatrix[0].length; j++){
        if (inputMatrix[i][j] === "*"){
            gears.set(`${i},${j}`, [])
        }
    }
}

function getGears(row, col) {
    if (row < 0 || row >= inputMatrix.length) {
        return [-1, -1];
    }

    if (col < 0 || col >= inputMatrix[0].length) {
        return [-1, -1];
    }
    if (inputMatrix[row][col] === "*"){
        return [row, col]
    }
    return [-1, -1];
}

function checkIfGears(row, col){
    let tl = getGears(row - 1, col - 1);
    let tm = getGears(row - 1, col);
    let tr = getGears(row - 1, col + 1);
    let ml = getGears(row, col - 1);
    let mr = getGears(row, col + 1);
    let bl = getGears(row + 1, col - 1);
    let bm = getGears(row + 1, col);
    let br = getGears(row + 1, col + 1);
    let arr1 = [tl, tm, tr, ml, mr, bl, bm, br]

    let gears =[]
    for (const square of arr1){
        if (square[0] === -1) continue
        gears.push(`${square[0]},${square[1]}`)
    }

    return gears
}

for (let i = 0; i < inputMatrix.length; i++){
    let stack = []
    let touchedGear = new Set()
    for (let j = 0; j < inputMatrix[0].length; j++){
        if (!isNaN(inputMatrix[i][j])){
            stack.push(inputMatrix[i][j])
            let potentialGears = checkIfGears(i, j)
            potentialGears.forEach(gear => touchedGear.add(gear))
        }
        if ((isNaN(inputMatrix[i][j]) || j === inputMatrix[0].length - 1) && stack.length > 0 && touchedGear.size > 0){
            for (const element of touchedGear){
                let gearArr = gears.get(element)
                gearArr.push(parseInt(stack.join('')))
                gears.set(element, gearArr)
            }
            
        }
        if(isNaN(inputMatrix[i][j])){
            stack = []
            touchedGear = new Set()
        }
    }
    
}

let gearRatioSum = 0

for (const [key, value] of gears){
    if(value.length > 1){
        let gearRatio = 1
        for (const num of value){
            gearRatio *= num
        }
        gearRatioSum += gearRatio
    }
}

console.log("Part 2:", gearRatioSum)