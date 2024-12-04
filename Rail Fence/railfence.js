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