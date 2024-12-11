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
// Rail fence cipher working as of 9/12/2024

function rail_fence(str, rails) { // Where str = message input and rails = integer 
    let top = [] // Stores indices of top row
    let bottom = [] // Stories indices of bottom row
    const top_int = 2*(rails) - 2 
    let middle_output = "" // Stores the output of every row between top and bottom (at minimum 1 middle row)
    
    if (rails == 2) { // Handle 2 rails (top and bottom, alternating)
        for (i = 0; i < str.length; i++) {
            if (i % 2 == 0) {
                top.push(i)
            } else {
                bottom.push(i)
            }
        }
        
        const top_row_output = top.map(index => str[index]).join("") // Map indices of top row to letters in the message
        const bottom_row_output = bottom.map(index => str[index]).join("") // Map indices of bottom row to letters in the message
        const final_output = top_row_output + bottom_row_output // Add top and bottom row since there is no middle row 
        return final_output
        
    } else { // Handle more than 2 rails 
        
        let top_counter = 0
        let bottom_counter = top_int/2
        // Add indices of top row 
        while (top_counter <= str.length ) { 
            top.push(top_counter)
            top_counter += top_int
        } 
        
        // Add indices of bottom row 
        while (bottom_counter <= str.length) {
            bottom.push(bottom_counter)
            bottom_counter += top_int
        }
    
        let arr_midrows = []
        let left_counter = 0
        let right_counter = 2*(rails) - 2
        
        // (rails - 2) removes top and bottom rows, leaving middle rows for following computatation
        for (i = 0; i < (rails - 2); i++) { // Outer loop traverses through each number of rows 
            // Reset counters 
            left_counter = 0
            right_counter = top_int
            
            // Empty arr_midrows to add fresh indices from the next row 
            arr_midrows = []
            
            while (!arr_midrows.includes(undefined)) { // Nested loop traverses through each letter on the same row 
                let midrowL = str[left_counter + (1 + i)]
                let midrowR = str[right_counter - (1 + i)]
                arr_midrows.push(midrowL, midrowR)
                
                left_counter += top_int
                right_counter += top_int
            }
            
            // Filter undefined elements 
            arr_midrows = arr_midrows.filter(element => element !== undefined) // Remove undefined elements 
            middle_output += arr_midrows.join("") // Convert mid row array into string
        }
    }
    
    const top_row_output = top.map(index => str[index]).join("")
    const bottom_row_output = bottom.map(index => str[index]).join("")
    const final_output = top_row_output + middle_output + bottom_row_output
    
    return final_output
}
