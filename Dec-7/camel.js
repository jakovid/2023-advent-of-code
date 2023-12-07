const fs = require('fs');
const input = fs.readFileSync('camel.txt', 'utf8');
const inputArray = input.split('\n');
const inputMatrix = inputArray.map(e => e.split(' '))

const cardStrength = { "A": 14, "K": 13, "Q": 12, "J": 11, "T": 10, 9: 9, 8: 8, 7: 7, 6: 6, 5: 5, 4: 4, 3: 3, 2: 2}

function handStrength(hand){ // power ranking 7 to 1 5oaK = 7, 4oaK = 6, FullH = 5, etc
    let frequencyMap = new Map()
    for (const card of hand){
        frequencyMap.set(card, (frequencyMap.get(card) || 0) + 1)
    }
    let handMap = new Map()
    for (const [key, value] of frequencyMap){
        handMap.set(value, (handMap.get(value) || 0) + 1)
    }

    if(handMap.has(5)){
        return 7
    } else if(handMap.has(4)){
        return 6
    } else if (handMap.has(3) && handMap.has(2)){
        return 5
    } else if (handMap.has(3)){
        return 4
    } else if (handMap.has(2) && handMap.get(2) == 2){
        return 3
    } else if (handMap.has(2)){
        return 2
    } else {
        return 1
    }

}

inputMatrix.forEach((e) => e.push(handStrength(e[0])))

function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    let resultArray = [], leftIndex = 0, rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex][2] < right[rightIndex][2]) {
            resultArray.push(left[leftIndex]);
            leftIndex++;
        } else if(left[leftIndex][2] > right[rightIndex][2]) {
            resultArray.push(right[rightIndex]);
            rightIndex++;
        } else {
            for (let i = 0; i < 5; i++){
                let leftPower = cardStrength[left[leftIndex][0][i]]
                let rightPower = cardStrength[right[rightIndex][0][i]]
                if(leftPower > rightPower){
                    resultArray.push(right[rightIndex])
                    rightIndex++
                    break
                } else if (leftPower < rightPower){
                    resultArray.push(left[leftIndex]);
                    leftIndex++;
                    break
                } else if(i === 4){
                    resultArray.push(left[leftIndex]);
                    leftIndex++;
                    break
                }else{
                    continue
                }
            }
        }
    }

    return resultArray
            .concat(left.slice(leftIndex))
            .concat(right.slice(rightIndex));
}

let sorted = mergeSort(inputMatrix)

let sum = 0

for (let i = 0; i < sorted.length; i++){
    sum += sorted[i][1] * (i+1)
}

console.log('Part 1:', sum)

// part 2

const cardStrength2 = { "A": 14, "K": 13, "Q": 12, "J": 1, "T": 10, 9: 9, 8: 8, 7: 7, 6: 6, 5: 5, 4: 4, 3: 3, 2: 2}

function handStrength2(hand){ // power ranking 7 to 1 5oaK = 7, 4oaK = 6, FullH = 5, etc
    let frequencyMap = new Map()
    for (const card of hand){
        frequencyMap.set(card, (frequencyMap.get(card) || 0) + 1)
    }
    let jokers = frequencyMap.get("J") || 0

    let handMap = new Map()
    let max = 0
    for (const [key, value] of frequencyMap){
        if (key ==="J") {
            continue
        }
        let frequency = (handMap.get(value) || 0) + 1
        handMap.set(value, frequency)
        max = value > (max || 0) ? value : max
    }

    if (jokers > 0){
        if(handMap.get(max) === 1){
            handMap.delete(max)
        } else {
            handMap.set(max, handMap.get(max) - 1)
        }
        handMap.set(max + jokers, 1)
    }

    if(handMap.has(5)){
        return 7
    } else if(handMap.has(4)){
        return 6
    } else if (handMap.has(3) && (handMap.has(2))){
        return 5
    } else if (handMap.has(3)){
        return 4
    } else if (handMap.has(2) && handMap.get(2) >= 2){
        return 3
    } else if (handMap.has(2)){
        return 2
    } else {
        return 1
    }

}

inputMatrix.forEach((e) => e.push(handStrength2(e[0])))

function mergeSort2(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    return merge2(mergeSort2(left), mergeSort2(right));
}

function merge2(left, right) {
    let resultArray = [], leftIndex = 0, rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex][3] < right[rightIndex][3]) {
            resultArray.push(left[leftIndex]);
            leftIndex++;
        } else if(left[leftIndex][3] > right[rightIndex][3]) {
            resultArray.push(right[rightIndex]);
            rightIndex++;
        } else {
            for (let i = 0; i < 5; i++){
                let leftPower = cardStrength2[left[leftIndex][0][i]]
                let rightPower = cardStrength2[right[rightIndex][0][i]]
                if(leftPower > rightPower){
                    resultArray.push(right[rightIndex])
                    rightIndex++
                    break
                } else if (leftPower < rightPower){
                    resultArray.push(left[leftIndex]);
                    leftIndex++;
                    break
                } else if(i === 4){
                    resultArray.push(left[leftIndex]);
                    leftIndex++;
                    break
                }else{
                    continue
                }
            }
        }
    }

    return resultArray
            .concat(left.slice(leftIndex))
            .concat(right.slice(rightIndex));
}

let sorted2 = mergeSort2(inputMatrix)

let sum2 = 0

for (let i = 0; i < sorted2.length; i++){
    sum2 += sorted2[i][1] * (i+1)
}

console.log('Part 2:', sum2)