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
    let binary_message = message
        .split("")
        .map(char => char.charCodeAt(0).toString(2).padStart(8, "0"))
        .join(" ")
    return binary_message
}

console.log(bitwise_cipher("ABC"))
console.log("Exclusive OR (XOR), if given 1 and 0", 1 ^ 0)
console.log("Exclusive OR (XOR), if given 1 and 1", 1 ^ 1)