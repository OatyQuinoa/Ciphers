const readline = require("readline")
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

/*
rl.question("Enter a message to encode", (message) => {
    console.log(bitwise_cipher(message))
    rl.close();
})
*/

function bitwise_cipher(message) {
    return [message]
}