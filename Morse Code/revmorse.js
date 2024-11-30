const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question("Enter morse code: ", (message) => {
    console.log(reverseMorseCode(message))
    rl.close();
})

// Establish key-value pair dictionary for each character and corresponding morse code 
const morseCodes = { // Establish key-value pair dictionary for each character and corresponding morse code 
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

// Reverse the key-value pair dictionary and run it through the same function:
const reverseMorseCodes = Object.fromEntries(
    Object.entries(morseCodes).map(([key, value]) => ([value, key]))
    
)

/*
    Object.entries() creates an array of arrays with a key-value pair dictionary as input, e.g., 
    Object.entries(morseCodes)
    Object.fromEntries() converts an array of arrays back into key-value pair dictionary (whereby its input is an array of arrays)
*/

function reverseMorseCode(message) {

    let translatedMessage = message
        .split(' ') // Split each morse code by space (each morse code character is split by space)
        .map(char => reverseMorseCodes[char]) // Create a new array parsing each character into the key-value dictionary
        .join(" ") // Rejoin the new morse code message with spaces in between for clarity 
    
        message = message.toUpperCase(); // Convert to uppercase
    return translatedMessage
}

