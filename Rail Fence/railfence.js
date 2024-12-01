const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question("Enter a message: ", (message) => {
    console.log(morseCodeTranslator(message))
    rl.close();
})

// Write code 02/12/2024