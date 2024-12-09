// test rail fence cipher, working as of 8 Dec 2024
// Deprecated test file since 9 Dec 2024

function test(str, rails) {
    let top = []
    let bottom = []
    const top_int = 2*rails - 2
    const bottom_int = top_int/2 // Unnecessary?
    const mid_rows = rails - 2
    let middle_output = ""
    
    if (rails == 2) { // Handle 2 rails 
        for (i = 0; i < str.length; i++) {
            if (i % 2 == 0) {
                top.push(i)
            } else {
                bottom.push(i)
            }
        }
        
        const top_row_output = top.map(index => str[index]).join("")
        const bottom_row_output = bottom.map(index => str[index]).join("")
        const final_output = top_row_output + middle_output + bottom_row_output
        return final_output
        
    } else { // Handle more than 2 rails 
        console.log("Top_int: ", top_int, " Bottom_int: ", bottom_int)
        
        let top_counter = 0
        let bottom_counter = top_int/2
        // Contain top and bottom 
        while (top_counter <= str.length ) { 
            top.push(top_counter)
            top_counter += top_int
        } 
        console.log("Top: ", top)
        
        while (bottom_counter <= str.length) {
            bottom.push(bottom_counter)
            bottom_counter += top_int
        }
        console.log("Bottom: ", bottom)
        
        const num_vs = Math.floor(str.length / top_int) // Stores # of V's
        console.log("Num V's: ", num_vs)
        console.log(str.length - num_vs*top_int - 1)
        
        let num = 0
        let arr_midrows = []
        let left_counter = 0
        let right_counter = top_int 
        
        // (rails - 2) removes top and bottom rows, leaving middle rows for following computatation
        for (i = 0; i < (rails - 2); i++) { // Outer loop traverses through each number of rows 
            // Reset counters 
            left_counter = 0
            right_counter = top_int
            
            // Empty array
            arr_midrows = []
            
            while (!arr_midrows.includes(undefined)) { // Nested loop traverses through each letter on the same row 
                let midrowL = str[left_counter + (1 + i)]
                let midrowR = str[right_counter - (1 + i)]
                arr_midrows.push(midrowL, midrowR)
                console.log("Num: ", i, " midrowL: ", midrowL, " midrowR: ", midrowR)
                
                left_counter += top_int
                right_counter += top_int
                
                console.log("arr_midrows: ", arr_midrows)
            }
            
            // Filter undefined elements 
            arr_midrows = arr_midrows.filter(element => element !== undefined)
            middle_output += arr_midrows.join("")
        }
    }
    
    const top_row_output = top.map(index => str[index]).join("")
    const bottom_row_output = bottom.map(index => str[index]).join("")
    const final_output = top_row_output + middle_output + bottom_row_output
    
    return [final_output, final_output.length, str.length]
}

console.log(test("COUNTERREVOLUTION", 5))
