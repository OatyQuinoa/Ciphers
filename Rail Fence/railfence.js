const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question("Enter a message: ", (message) => {
    rl.question("Enter the number of rails: ", (num_rails) => {
        console.log(rail_fence(message, num_rails))
        rl.close();
    })
})

// Write code 02/12/2024
function rail_fence(message, num_rails) {
    
}

function splitString(input, rail) { // Where rail = # of rows 
    let output = [];
    let i = 0;
    let uprows = rail - 2

    while (i < input.length) {
        if (i + rail <= input.length) { // 1
            output.push(input.substring(i, i + rail))
            console.log(i, output)
            i += 3 // Increment by 3 to substring first 3 letters 
        }

        if (i < input.length) { // 2
            output.push(input.substring(i, i + uprows))
            console.log(i, output)
            i += uprows // Increment by # of rails to substring # rails of letters 
        }

        // cycle repeats from 1-2-1-2 . . . 
    }
    
    console.log("Testing: ", output[0][2])

    return output
}

//console.log(splitString("CARECARECAR", 3))
console.log(splitString("APPLEBEE", 3))