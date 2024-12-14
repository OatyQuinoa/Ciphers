const readline = require("readline")
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

/*
rl.question("Enter a message to encode", (message) => {
    rl.question("Enter a matrix size (e.g., 2 for matrix size of 2 x 2", (matrix) => {
        console.log(hill_cipher(message, matrix))
        rl.close();
    })
})
*/

function hill_cipher(message, matrix) {
    return [message, matrix]
}