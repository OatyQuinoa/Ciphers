const readline = require("readline")
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question("Enter a message: ", (message) => {
    rl.question("Enter a shift value: ", (shift) => {
        rl.question("Encrypt or decrypt? (E) or (D): ", (type) => {
            console.log(caesar_cipher(message, shift, type))
            rl.close();
        })
    })
})

function caesar_cipher(message, shift, type) {
    let arrayOfIndicesOfEachLetterInMessage = []; // Stores indices of alphabetical letters in the message // arrayOfIndicesOfEachLetterInMessage
    let resultList = []; // Stores indices of encrypted letters 
    let caseInfo = [];  // Stores case information for each letter (uppercase/lowercase)

    let uppercaseAlphabet = [
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O",
        "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
    ];

    let lowercaseAlphabet = [
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o",
        "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
    ];

    // Handle `shift` parameter input:
    shift = Number(Math.floor(shift)) // Convert input `shift` string to Number and round down
    if (isNaN(shift)) {
        return new Error("Shift value must be a valid whole number")
    }

    // Add indices of each letter of the message to arrayOfIndicesOfEachLetterInMessage and differentiate between upper and lower case alphabets to use 
    for (let i = 0; i < message.length; i++) {
        let letter = message[i];
        let alphabetToUse;

        if (uppercaseAlphabet.includes(letter)) {
            alphabetToUse = uppercaseAlphabet;
            caseInfo.push("upper"); 
        } else if (lowercaseAlphabet.includes(letter)) {
            alphabetToUse = lowercaseAlphabet;
            caseInfo.push("lower"); 
        } else {
            arrayOfIndicesOfEachLetterInMessage.push(-1); 
            caseInfo.push(null); 
            continue;
        }

        let correspondingAlphabeticalIndex = alphabetToUse.indexOf(letter) % alphabetToUse.length; 
        arrayOfIndicesOfEachLetterInMessage.push(correspondingAlphabeticalIndex); 
    }

    // Handle encrypt and decrypt types
    // Shift each letter from the message by input `shift`
    if (type.toLowerCase() == "e") {
        for (let i = 0; i < arrayOfIndicesOfEachLetterInMessage.length; i++) {
            if (arrayOfIndicesOfEachLetterInMessage[i] !== -1) {
                resultList.push((arrayOfIndicesOfEachLetterInMessage[i] + shift) % 26); 
            } else {
                resultList.push(null); 
            }
        }
    } else if (type.toLowerCase() == "d") {
        for (let i = 0; i < arrayOfIndicesOfEachLetterInMessage.length; i++) {
            if (arrayOfIndicesOfEachLetterInMessage[i] !== -1) {
                resultList.push((arrayOfIndicesOfEachLetterInMessage[i] + 26 - shift) % 26); 
            } else {
                resultList.push(null); 
            }
        }
    } else {
        return new Error("Function type error occurred. E or D for encrypt or decrypt only.")
    }

    // Handle upper- and lowercase letters of encrypted message, using caseInfo which collected the cases from plaintext message. 
    let caesar_output = "";
    for (let i = 0; i < resultList.length; i++) {
        if (resultList[i] !== null) {
            let correspondingAlphabet = caseInfo[i] === "upper" ? uppercaseAlphabet : lowercaseAlphabet;
            caesar_output += correspondingAlphabet[resultList[i]];
        } else {
            caesar_output += message[i]; 
        }
    }

    return caesar_output
}