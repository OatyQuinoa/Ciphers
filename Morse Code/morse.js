const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question("Enter a message: ", (message) => {
    console.log(morseCodeTranslator(message))
    rl.close();
})

// Establish key-value pair dictionary for each character and corresponding morse code 
const morseCodes = { 
    // Letters
    "A": ".-", "B": "-...", "C": "-.-.", "D": "-..", "E": ".", 
    "F": "..-.", "G": "--.", "H": "....", "I": "..", "J": ".---",
    "K": "-.-", "L": ".-..", "M": "--", "N": "-.", "O": "---", 
    "P": ".--.", "Q": "--.-", "R": ".-.", "S": "...", "T": "-", 
    "U": "..-", "V": "...-", "W": ".--", "X": "-..-", "Y": "-.--", "Z": "--..",
    
    // Numbers
    "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-", 
    "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.",

    // Space
    " ": "/"
};

function morseCodeTranslator(message) {
    message = message.toUpperCase(); // Convert to uppercase

    let translatedMessage = message
        .split('') // Add each character in message to an array
        .map(char => (morseCodes[char] !== undefined ? morseCodes[char] : char)) 
        /* 
        .map() creates a new array parsing each character into the key-value dictionary;
        ternary operator handles characters not found in morseCodes dictionary
        */
        .join(" ") // Rejoin the new morse code message with spaces in between for clarity 

    return translatedMessage
}