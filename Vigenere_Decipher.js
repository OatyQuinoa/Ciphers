const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// First input for message to be encrypted 
rl.question('Enter the message to be decrypted: ', (message) => {
    // Second input for key to encrypt message
    rl.question('Enter your key: ', (key) => {
        console.log(vigenere_cipher(message, key));
        rl.close();
    });
});

function vigenere_cipher(message, key) {
    let arrayOfIndicesOfEachLetterInMessage = []; // Stores indices of alphabetical letters in the message // arrayOfIndicesOfEachLetterInMessage
    let resultList = []; // Stores indices of Vigenere encrypted letters 
    let caseInfo = [];  // Stores case information for each letter (uppercase/lowercase)

    // Declare alphabets
    let alphabet = [
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O",
        "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
    ];

    let lowercaseAlphabet = [
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o",
        "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
    ];

    // Checks if the key possesses non-alphabetical characters 
    function isOnlyAlphabetical(word) {
        return /^[A-Za-z]+$/.test(word);
    }

    if (isOnlyAlphabetical(key) == false) { 
        return "Key must only contain alphabetical characters."
    } 

    // Add indices of each letter of the message to arrayOfIndicesOfEachLetterInMessage and differentiate between upper and lower case alphabets to use 
    for (let i = 0; i < message.length; i++) {
        let letter = message[i];
        let alphabetToUse;

        if (alphabet.includes(letter)) {
            alphabetToUse = alphabet;
            caseInfo.push("upper"); // Add "upper" to caseInfo 
        } else if (lowercaseAlphabet.includes(letter)) {
            alphabetToUse = lowercaseAlphabet;
            caseInfo.push("lower"); // Add "lower" to caseInfo
        } else {
            arrayOfIndicesOfEachLetterInMessage.push(-1); // Assign non-alphabetical characters (e.g., spaces) as -1, and not zero because letter "A" holds the zeroth index
            caseInfo.push(null); // Push non-alphabetical characters with null value in caseInfo to process later 
            continue;
        }

        let correspondingAlphabeticalIndex = alphabetToUse.indexOf(letter) % alphabetToUse.length; // Determine the alphabetical index of each letter of the message 
        arrayOfIndicesOfEachLetterInMessage.push(correspondingAlphabeticalIndex); // Add the index of the letter to arrayOfIndicesOfEachLetterInMessage

    }
    

    let arrayOfKeyLetters = []; // A simple array containing each letter of the key. E.g., key: XYZ, arrayOfKeyLetters = ["x", "y", "z"]
    for (let i = 0; i < key.length; i++) {
        arrayOfKeyLetters.push(key[i]) // Loop through each letter of the given key and append to arrayOfKeyLetters
    }

    let keyPatternArray = [] // Stores the repeated letters of the key 
    let indicesOfKeyPatternArray = []
    let letterIndex = 0; // Establish a seperate index for the increment of each key letter in arrayOfKeyLetters 

    // Critical piece of code
    for (let i = 0; i < arrayOfIndicesOfEachLetterInMessage.length; i++) {
        if (arrayOfIndicesOfEachLetterInMessage[i] === -1) { // if non-alphabetical characters are detected (recognized as -1), an empty string will be appended to the pattern
            keyPatternArray.push(" ")
        } else {
            keyPatternArray.push(arrayOfKeyLetters[letterIndex % arrayOfKeyLetters.length]) // Append remaining repetitions of the key (critical line) 
            letterIndex++ // Increment index 
        }
    }   

    for (let i = 0; i < keyPatternArray.length; i++) { // Loop converts repeated alphabetical letters of the key in keyPatternArray into their corresponding indices in the alphabet 
        let keyLetter = keyPatternArray[i]; // Assign the letter of the key to the index of keyPatternArray

        if (alphabet.includes(keyLetter)) { // Upper case
            corresponding_key_alphabet_index = alphabet.indexOf(keyPatternArray[i]) % alphabet.length 
            indicesOfKeyPatternArray.push(corresponding_key_alphabet_index) 
        }

        if (lowercaseAlphabet.includes(keyLetter)) { // Lower case 
            corresponding_key_alphabet_index = lowercaseAlphabet.indexOf(keyPatternArray[i]) % lowercaseAlphabet.length
            indicesOfKeyPatternArray.push(corresponding_key_alphabet_index) 
        }
        
        if (!alphabet.includes(keyLetter) && !lowercaseAlphabet.includes(keyLetter)) { // Neither upper nor lower case — condition checks for non-alphabetical characters 
            corresponding_key_alphabet_index = -1 // Distinguish as non-alphabetical character and assigned -1 
            indicesOfKeyPatternArray.push(corresponding_key_alphabet_index) 
        }
        // Index of each letter in keyPatternArray is appended to indicesOfKeyPatternArray
    }
    
    // Adds the indices of letters from message and key for encryption
    for (let i = 0; i < arrayOfIndicesOfEachLetterInMessage.length; i++) {
        // If statement checks for -1 values (representing non-alphabetical characters) in arrayOfIndicesOfEachLetterInMessage and indicesOfKeyPatternArray 
        if (arrayOfIndicesOfEachLetterInMessage[i] !== -1 && indicesOfKeyPatternArray[i] !== -1) {
            resultList.push(((arrayOfIndicesOfEachLetterInMessage[i] + 26) - indicesOfKeyPatternArray[i]) % 26); 
        } else {
            resultList.push(null); 
            // Preserve non-alphabetical characters (spaces, punctuation, etc.) by adding null value 
        }
    }

    // Convert added indices to encrypted letters using case info
    let vigenere_deciphered_output = "";
    for (let i = 0; i < resultList.length; i++) {
        // If statement checks for null values in resultList
        if (resultList[i] !== null) {
            // Use correct alphabet based on caseInfo
            let correspondingAlphabet = caseInfo[i] === "upper" ? alphabet : lowercaseAlphabet;

            /*
            Ternary Operator:
            condition ? value_if_true : value_if_false;
            caseInfo[i] === "upper" ? alphabet : lowercaseAlphabet;

            The in-line if statement is shorthand to evaluate whether to 
            use the uppercase or lowercase alphabet, based on the caseInfo value.
            */

            /* 
            Then add corresponding letter to vignere_cipher_output, 
            Where resultList is an array of numerical indices of encrypted letters 
                if resultList = [25, 2, 3],
                When i = 0, correspondingAlphabet[resultList[0]] gives "Y" 
                Because the zeroth index of resultList is 25, correspondingAlphabet[25] = "Y"
            */ 

            vigenere_deciphered_output += correspondingAlphabet[resultList[i]];

        } else {
            vigenere_deciphered_output += message[i]; 
            // Non-alphabetical characters are added to the output if null is detected in resultList 
        }
    }

    return "Your Vigenere decrypted message is: " + vigenere_deciphered_output;
}
