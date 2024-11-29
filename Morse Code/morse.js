const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question("Enter a message: ", (message) => {
    console.log(morseCodeTranslator(message))
    rl.close();
})

const morseCodes = {
    // Letters
    "A": "·−", "B": "−···", "C": "−·−·", "D": "−··", "E": "·",
    "F": "··−·", "G": "−−·", "H": "····", "I": "··", "J": "·−−−",
    "K": "−·−", "L": "·−··", "M": "−−", "N": "−·", "O": "−−−",
    "P": "·−−·", "Q": "−−·−", "R": "·−·", "S": "···", "T": "−",
    "U": "··−", "V": "···−", "W": "·−−", "X": "−··−", "Y": "−·−−", "Z": "−−··",
    
    // Numbers
    "0": "−−−−−", "1": "·−−−−", "2": "··−−−", "3": "···−−", "4": "····−",
    "5": "·····", "6": "−····", "7": "−−···", "8": "−−−··", "9": "−−−−·",

    // Space
    " ":"/"
};

function morseCodeTranslator(message) {
    message = message.toUpperCase(); // Convert to uppercase

    let translatedMessage = message
        .split('') // Add each character in message to an array
        .map(char => morseCodes[char]) // Create a new array parsing each character into the key-value dictionary
        .join(" ") // Rejoin the new morse code message with spaces in between for clarity 

    return translatedMessage
}

// For decrypting morse code, simply reverse the key-value pair dictionary and run it through the same function:
const reverseMorseCodes = Object.fromEntries(
    Object.entries(morseCodes).map(([key, value]) => ([value, key]))
)

/*
    Object.entries() creates an array of arrays with a key-value pair dictionary as input, e.g., 
    Object.entries(morseCodes)

    Object.fromEntries() converts an array of arrays back into key-value pair dictionary (whereby its input is an array of arrays)
*/