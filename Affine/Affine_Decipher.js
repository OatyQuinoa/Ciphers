const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question('Enter your message to be decrypted: ', (message) => {
    rl.question('Enter a value of a: ', (a) => {
        rl.question('Enter a value of b: ', (b) => {
            console.log(affine_decipher(message, a, b));
            rl.close();
        })
    })
})

function modular_inverse(a, m) { // (a * a^-1) ≡ 1 (mod m), only if gcd(a, m) = 1; where we're searching for modular inverse a^-1
    a = Number(a)
    m = Number(m)

    let x = 0
    while ((a*x % m) !== 1) {
        x++
        if ((a*x % m) === 1) {
            return x
        } else if (x > 100) {
            break
        }
    }
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
    
    // Sort arrays in ascending order 
    factorArrayA.sort((a,b) => (a - b));
    factorArrayB.sort((a,b) => (a - b));

    /*
    In ((a, b) => a - b), if a - b is positive (a > b), a will come after b. 
    If a - b is negative (a < b), a will come before b.
    */

    let array_of_duplicates = []
    let right_pointer_a = factorArrayA.length - 1
    let right_pointer_b = factorArrayB.length - 1

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

    if (array_of_duplicates.length === 1 && array_of_duplicates[0] === 1) {
        return true
    } else {
        return false 
    }
}

function affine_decipher(message, a, b) {
    let caseInfo = []
    let messageIndicesArray = []
    let decryptedMessageIndicesArray = []
    let uppercaseAlphabet = [
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O",
        "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
    ];

    let lowercaseAlphabet = [
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o",
        "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
    ];

    // Check whether `a` and `b` are valid numbers 
    if (isNaN(a) || isNaN(b)) { // (typeof a !== 'number' || typeof b !== 'number')
        throw new Error(`Parameters 'a' and 'b' must be valid integers. Received NaN input; a: ${a} and b: ${b}`) // output += `${message} + ${a} + ${b}`
    } else if (0 >= a || 0 >= b) {
        throw new Error(`Parameters 'a' and 'b' must be non-negative integers. Received negative integers; a: ${a} and b: ${b}`)
    } else { // Specify the value type of `a` and `b` as numbers to avoid string and numerical concatenation (e.g., 72 + "4" = 724)
        a = Number(a); 
        b = Number(b); 
        //console.log(`${a} and ${b} are valid numbers.`)
    }

    // Checks whether `a` is coprime utilizing checkIfCoprime function, which uses factorNumber(number) and duplicateCheck(array1, array2). If `a` is not coprime, Affine decryption does not work. 
    if (checkIfCoprime(a, 26) == false) { // Whereby 26 is the length of the alphabet to be checked with input `a` 
        throw new Error(`Parameter 'a' must be coprime in order for decryption to function. Received a: ${a}. Try any number within: [1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25];`)
    } else {
        console.log(checkIfCoprime(a, b))
    }
    
    // Round `a` and `b` to the nearest whole number if decimal (floating-point) number detected in input.
    const roundedA = ((a - Math.floor(a)) >= 0.5) ? Math.ceil(a) : Math.floor(a)
    const roundedB = ((b - Math.floor(b)) >= 0.5) ? Math.ceil(b) : Math.floor(b)

    /*
    If a = 3.2,
    a - Math.floor(a) = 3.2 - 3 = 0.2
    a - Math.floor(a) determines the decimals of the provided numerical input 
    */

    for (i = 0; i < message.length; i++) {
        letter = message[i];

        if (uppercaseAlphabet.includes(letter)) {
            caseInfo.push("uppercase")
            messageIndicesArray.push(uppercaseAlphabet.indexOf(letter)) // Add the index of each letter of message to messageIndices array (uppercase)
        } else if (lowercaseAlphabet.includes(letter)) {
            caseInfo.push("lowercase")
            alphabetToUse = lowercaseAlphabet;
            messageIndicesArray.push(lowercaseAlphabet.indexOf(letter)) // Add the index of each letter of message to messageIndices array (lowercase)
        } else {
            caseInfo.push(null) // Append null where no letters exist 
            messageIndicesArray.push(-1);
        }
    }

    // Loop through indices of messageIndicesArray (containing the indices of every letter) and return encrypted value 
    for (i = 0; i < messageIndicesArray.length; i++) {
        // Formula for decryption = (a^-1 * (y - b)) mod 26, where a^-1 is the modular inverse of `a` and y is the index of the encrypted letter 
        if (messageIndicesArray[i] !== -1) {
            decryptedMessageIndicesArray.push(((modular_inverse(roundedA, 26)) * (((messageIndicesArray[i] + 26) - roundedB) % 26) % 26))
            /* 
            In (messageIndicesArray[i] + 26), +26 is added to account for negative numbers following the deduction of roundedB from the encrypted letter index. 
            Mod 26 thereafter resolves any index > 26. 
            */
        } else {
            decryptedMessageIndicesArray.push(-1)
        }
    }

    // Loop through encrypted indices and correctly output their corresponding alpbaetical value and case (upper/lower)
    let output = ""
    for (i = 0; i < decryptedMessageIndicesArray.length; i++) {
        if (decryptedMessageIndicesArray[i] !== -1) {
            caseInfo[i] === "uppercase" ? (output += uppercaseAlphabet[decryptedMessageIndicesArray[i]]) : (output += lowercaseAlphabet[decryptedMessageIndicesArray[i]])
            /*
            if zeroth index of decryptedMessageIndicesArray = 25 (i.e., [25, 10, 3 ... ])
            uppercaseAlphabet[decryptedMessageIndicesArray[0]] = uppercaseAlphabet[25] = Z
            */
        } else {
            output += message[i]
        }
    } 
    return output 
}   
