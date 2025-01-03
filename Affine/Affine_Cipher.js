const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question('Enter your message to be encrypted: ', (message) => {
    rl.question('Enter a value of a: ', (a) => {
        rl.question('Enter a value of b: ', (b) => {
            console.log(handling_affine_cipher(message, a, b));
            rl.close();
        })
    })
})

function checkIfCoprime(a, b) { // where `a` and `b` are two numbers to be compared and checked if coprime // Also called GCD (greatest common divisor)
    let testCounterA = 1;
    let testCounterB = 1;
    let factorArrayA = [];
    let factorArrayB = [];

    // Following code produces the common factors of number `a` and number `b` 
    // Both conditions will proceed until less than or equal to square root of a or b (for optimization to avoid reversed duplicates) 
    // Given an integer 16, its factors are [1, 16, 2, 8, 4, 4, 8, 2, 16, 1]. All factors beyond [4, 4] are redundant (reversed duplicates)
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

    /* EXPLANATION OF ABOVE CODE
    Suppose we want to find the common factors of a = 13 and b = 26,
    sqrt(9) < sqrt(13) < sqrt(16) = 3 < sqrt(13) < 4, so testCounterA will increment to a maximum of 3
    sqrt(25) < sqrt(26) < sqrt(36) = 5 < sqrt(26) < 6, so testCounterB will increment to a maximum of 5

    13 % 1 = 0, hence push [1, 13]. (1 < a < 3) % 13 !== 0, thus only 1 and 13 are factors of 13. 
    26 % 1 = 0, hence push [1, 26], 26 % 2 = 0, hence push [2, 13]. (2 < b < 5) % 26 !== 0, thus [1, 26] and [2, 13] are factors of 26
    */
    
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

function affine_cipher(message, a, b) { 
    let caseInfo = []
    let messageIndicesArray = []
    let encryptedMessageIndicesArray = []
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
        // Formula for Affine encryption: (ax + b) mod 26, where a = multiplicative key (must be coprime to 26), b = additive key, and x = index of letter
        if (messageIndicesArray[i] !== -1) {
            encryptedMessageIndicesArray.push(((roundedA * messageIndicesArray[i]) + roundedB) % 26)
        } else {
            encryptedMessageIndicesArray.push(-1)
        }
    }

    // Loop through encrypted indices and correctly output their corresponding alpbaetical value and case (upper/lower)
    let output = "Your Affine ciphered message is: "
    for (i = 0; i < encryptedMessageIndicesArray.length; i++) {
        if (encryptedMessageIndicesArray[i] !== -1) {
            caseInfo[i] === "uppercase" ? (output += uppercaseAlphabet[encryptedMessageIndicesArray[i]]) : (output += lowercaseAlphabet[encryptedMessageIndicesArray[i]])
            /*
            if zeroth index of encryptedMessageIndicesArray = 25 (i.e., [25, 10, 3 ... ])
            uppercaseAlphabet[encryptedMessageIndicesArray[0]] = uppercaseAlphabet[25] = Z
            */
        } else {
            output += message[i]
        }
    }
    
    return output 
}   

function handling_affine_cipher(message, a, b) {
    try {
        const encrypted_affine_message = affine_cipher(message, a, b)
        if (!encrypted_affine_message) {
            throw new Error("Encryption failed.")
        }
        return encrypted_affine_message // Output encrypted message to user if successful
    } catch (error) {
        console.error("Encryption error occurred: ", error)
        return "Encrypting with Affine cipher failed."
    }
}
