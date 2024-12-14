const readline = require("readline")
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

/*
rl.question("Enter a message to encode", (message) => {
    console.log(polybius_cipher(message))
    rl.close();
})
*/

function polybius_cipher(message) {
    return [message]
}