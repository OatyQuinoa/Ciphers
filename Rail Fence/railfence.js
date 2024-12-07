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
    let uprows = rail - 2 // 2 rails has 0 middle, 3 rails has 1 middle, 4 rails has 2 middles, so on and so forth

    while (i < input.length) {
        if (i + rail <= input.length) { // 1
            output.push(input.substring(i, i + rail))
            console.log(i, output)
            i += rail // Increment by number of rails to substring first # letters 
        }

        if (i < input.length) { // 2
            output.push(input.substring(i, i + uprows))
            console.log(i, output, 2)
            i += uprows // Increment by # of rails to substring # rails of letters 
        }

        // cycle repeats from 1-2-1-2 . . . 
    }

    console.log("Testing: ", output[0][2])
    console.log("Output: ", output)
    
    let downward_arr = []
    let upward_arr = []

    for (i = 0; i < output.length; i++) {
        if (i % 2 == 0) {
            downward_arr.push(output[i])
        } else {
            upward_arr.push(output[i])
        }
    }

    console.log(10, downward_arr, upward_arr)

    return output
}

//console.log(splitString("CARECARECAR", 3))
console.log(splitString("APPLEBEE", 3))