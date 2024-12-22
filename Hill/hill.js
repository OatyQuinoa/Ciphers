const readline = require("readline")
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

/*
rl.question("Enter a message to encode", (message) => {
    rl.question("Enter a matrix size (e.g., 2 for matrix size of 2 x 2", (matrix) => {
        console.log(hill_cipher(message, matrix))
        rl.close();
    })
})
*/

function hill_cipher(message, matrix) {

    // Write function that finds the determinant of a matrix (2x2, 3x3, 4x4, 5x5, etc.)
    // Call upon checkIfCoprime() function to determine if determinant is coprime to 26

    return [message, matrix]
}

function checkIfCoprime(a, b) { // where `a` and `b` are two numbers to be compared and checked if coprime // Also called GCD (greatest common divisor)
    let testCounterA = 1;
    let testCounterB = 1;
    let factorArrayA = [];
    let factorArrayB = [];

    // Both conditions will proceed until less than or equal to square root of a or b 
    while (testCounterA <= Math.sqrt(a) || testCounterB <= Math.sqrt(b)) { // Utilizing square root to limit redundant factors. 
        if (a % testCounterA === 0) { // E.g., 17 % 1 === 0, any whole number divided by 1 gives the whole number, hence no remainder 
            // If testCounter is a factor, add both the factor and its pair
            factorArrayA.push(testCounterA, a / testCounterA);
        } 
        if (b % testCounterB === 0) { // E.g., 17 % 1 === 0, any whole number divided by 1 gives the whole number, hence no remainder 
            // If testCounter is a factor, add both the factor and its pair
            factorArrayB.push(testCounterB, b / testCounterB);
        } 
        testCounterA++;
        testCounterB++;
    }
    
    // Sort arrays in ascending order so following pointers work 
    factorArrayA.sort((a,b) => (a - b));
    factorArrayB.sort((a,b) => (a - b));

    /*
    ASCENDING ORDER: ((a, b) => a - b):
    If a - b < 0 (i.e., a < b): a comes before b.
    If a - b > 0 (i.e., a > b): a comes after b.
    If a - b === 0: The order of a and b remains unchanged.

    DESCENDING ORDER: ((b, a) => b - a):
    If b - a < 0 (i.e., b < a): b comes before a (in this context, a comes after b).
    If b - a > 0 (i.e., b > a): b comes after a (in this context, a comes before b).
    If b - a === 0: The order of a and b remains unchanged.
    */

    let array_of_duplicates = [] // Stores duplicate numbers 
    let right_pointer_a = factorArrayA.length - 1
    let right_pointer_b = factorArrayB.length - 1

    // Utilize pointers to find duplicate values in two arrays
    while (right_pointer_a >= 0 && right_pointer_b >= 0) { 
        if (factorArrayA[right_pointer_a] === factorArrayB[right_pointer_b]) { // If same value found, move both pointers to the left by 1
            array_of_duplicates.push(factorArrayA[right_pointer_a])
            right_pointer_a--
            right_pointer_b--
        } else if (factorArrayA[right_pointer_a] > factorArrayB[right_pointer_b]) { // If `a` value is greater than `b` value, move 'a' value to the left by 1
            right_pointer_a--
        } else if (factorArrayA[right_pointer_a] < factorArrayB[right_pointer_b]) { // If `b` value is greater than `a` value, move 'b' value to the left by 1
            right_pointer_b--
        } 
    }

    // Checks if the there is only 1 subarray within the array of arrays, and the value of the subarray is the only common factor 1. 
    if (array_of_duplicates.length === 1 && array_of_duplicates[0] === 1) { 
        return true // a and b are coprime
    } else {
        return false // a and b are NOT coprime
    }
}