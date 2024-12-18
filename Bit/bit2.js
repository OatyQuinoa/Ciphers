const readline = require("readline")
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// USING BINARY DERIVED FROM A HEX KEY, INSTEAD OF A RANDFOMLY GENERATED BINARY KEY
rl.question("Enter a message to encode: ", (message) => {
    console.log(bitwise_cipher(message))
    rl.close();
})


function random_hex_key(length) {
    let key = ""
    const characters = '0123456789abcdef' // hex base 16 

    for (i = 0; i < length; i++) {
        let randomChar = characters[Math.floor(Math.random() * characters.length)]
        key += randomChar
    }

    return key
}

function convert_hex_to_binary(hex) {
    const hex_in_binary = parseInt(hex, 16).toString(2).padStart(8, "0") 
    // parseInt converts hex into decimal value; toString converts decimal value into binary; padStart adds zeros to fill string length of 8, unless otherwise provided, spaces will be added
    return hex_in_binary
}

function bitwise_cipher(message) {
    // Convert message to bit form: 
    let binary_message = message
        .split("")
        .map(char => char.charCodeAt(0).toString(2).padStart(8, "0")) 
        .join("")

    // Create hex key 
    const hex_key = random_hex_key(message.length)

    // Convert hex key into binary
    const hex_key_in_binary = convert_hex_to_binary(hex_key)

    let bitwise_XOR_output = ""
    for (i = 0; i < binary_message.length; i++) {
        bitwise_XOR_output += binary_message[i] ^ hex_key_in_binary[i] // ^ denotes XOR, where equal bits returns 0 and nonequal bits returns 1
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

    //console.log(message, message.length, binary_message, binary_message.length, bitwise_XOR_output, decimal_arr, char_arr, char_output)
    return char_output
}
