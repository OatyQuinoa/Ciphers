const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

/*
rl.question("Enter a message to decode: ", (message) => {
    rl.question("Enter the number of rails: ", (num_rails) => {
        console.log(rail_fence_decipher(message, num_rails))
        rl.close();
    })
})
*/

function rail_fence_decipher(message, rails) {

    // Handle top 
    let top_counter = 0 
    let top_arr = []
    while (top_counter < message.length) {
        top_arr.push(top_counter)
        top_counter += (2*(rails) - 2)
    }

    // Handle bottom 
    let bottom_counter = (2*(rails) - 2)/2
    let bottom_arr = []
    while (bottom_counter < message.length) {
        bottom_arr.push(bottom_counter)
        bottom_counter += (2*(rails) - 2)
    }

    // Substring top and bottom lines
    const top_substr = message.substring(0, top_arr.length)
    const bottom_substr = message.substring(message.length - bottom_arr.length, message.length) // Starting from end minus length of bottom_arr


    // Convert indices into letters, starting with top_arr
    let output_arr = []
    for (i = 0; i < top_arr.length; i++) {
        output_arr[top_arr[i]] = top_substr[i] // assign letter to position from top_arr (e.g., [0, 6, 12])
    }

    for (i = 0; i < bottom_arr.length; i++) {
        output_arr[bottom_arr[i]] = bottom_substr[i]
    }

    return [top_arr, bottom_arr, top_substr, bottom_substr, output_arr]
}

console.log(rail_fence_decipher("CRUOERLTUTEOINNVO", 4))