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
    // Convert message to bit form: 
    let binary_message = message
        .split("")
        .map(char => char.charCodeAt(0).toString(2).padStart(8, "0"))
        .join("")

    // Create a binary key to XOR each bit from binary_message: 
    let binary_key = Array.from({length: binary_message.length}, () => Math.random() < 0.5 ? '0' : '1').join("")
    // Use temporary binary key: 0001100010110001

    let temp_key = "0001100010110001"
    let bitwise_XOR_output = ""
    for (i = 0; i < binary_message.length; i++) {
        bitwise_XOR_output += binary_message[i] ^ temp_key[i] // ^ denotes XOR, where equal bits returns 0 and nonequal bits returns 1
    }

    let decimal_arr = []
    let char_arr = []
    let char_output = ""

    let left_counter = 0 
    let right_counter = 8

    while (right_counter <= bitwise_XOR_output.length) {
        let substr = bitwise_XOR_output.substring(left_counter, right_counter)
        decimal_arr.push(parseInt(substr, 2))

        left_counter += 8
        right_counter += 8
    }

    for (i = 0; i < decimal_arr.length; i++) {
        let char = String.fromCharCode(decimal_arr[i])
        char_arr.push(char)
        char_output += char
    }

    return [bitwise_XOR_output, decimal_arr, char_arr, char_output]
}


console.log("Ans: ", bitwise_cipher("44"))

// Begin using hexadecimal key

function random_hex_key(length) {
    let key = ""
    const characters = '0123456789abcdef' // hex base 16 

    for (i = 0; i < length; i++) {
        let randomChar = characters[Math.floor(Math.random() * characters.length)]
        key += randomChar
    }

    return key
}

console.log(random_hex_key(16))