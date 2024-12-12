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

    //message = message.replace(/\s+/g, "") // Remove spaces

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
    const bottom_substr = message.substring(message.length - bottom_arr.length, message.length) // Starting from end minus length of bottom_arr; e.g., message.substring(14, 17)


    // Convert indices into letters:
    let output_arr = []
    for (i = 0; i < top_arr.length; i++) {
        output_arr[top_arr[i]] = top_substr[i] // assign letter to position from top_arr (e.g., [0, 6, 12])
    }

    for (i = 0; i < bottom_arr.length; i++) {
        output_arr[bottom_arr[i]] = bottom_substr[i]
    }

    // Determine the indices of middle rows 
    let left_counter = 0 
    let right_counter = 0 //2*(rails) - 2 - 1
    let arr_midrow_indices = []
    console.log("value of 2*(rails) - 2: ", 2*(rails) - 2)
    let counter = 0 // Temporary

    for (i = 0; i < rails - 2; i++) {
        counter = 0
        console.log("Log check: ", left_counter, right_counter)

        left_counter = i + 1
        right_counter = (2*(rails) - 2) - i - 1

        console.log("Log check 2: ", left_counter, right_counter)

        while (!arr_midrow_indices.includes(undefined)) {
            left_counter < message.length ? arr_midrow_indices.push(left_counter) : null
            right_counter < message.length ? arr_midrow_indices.push(right_counter) : null

            console.log(i, left_counter, right_counter)

            left_counter += 2*(rails) - 2 
            right_counter += 2*(rails) - 2 

            counter++
            if (counter > 20) {
                break
            }
            /*
            if (right_counter > message.length) { // Faulty
                break 
            } */
        }

        console.log(i, "Current inventory of arr midrows indices: ", arr_midrow_indices)

        //arr_midrow_indices = arr_midrow_indices.filter(index => index !== undefined)
    }

    console.log("Arr midrow indices: ", arr_midrow_indices)
    const midstr = message.substring(top_arr.length, message.length - bottom_arr.length)
    console.log(midstr, midstr.length, arr_midrow_indices.length)

    for (i = 0; i < midstr.length; i++) {
        output_arr[arr_midrow_indices[i]] = midstr[i]
    }

    const output_str = output_arr.join("") // Log output_arr to see array of plaintext letters

    return [top_arr, bottom_arr, top_substr, bottom_substr, output_str, output_arr]
}

//console.log(rail_fence_decipher("CRUOERLTUTEOINNVO", 4))
//console.log(rail_fence_decipher("COUNNOTIETRURLEOV", 10))
console.log(rail_fence_decipher("Rto5esrin4cnut13oc2", 4))
//console.log(rail_fence_decipher("AjQ~190+-`ZbIK_=/28!N[?Ch@)]>37#({<dGL*}.46$&|,Ef%M;'5^:", 5)) // Faulty result
//console.log(rail_fence_decipher("AIQYgowBHJPRXZfhnpvxCGKOSWaeimquyDFLNTVbdjlrtzEMUcks", 5))
console.log(rail_fence_decipher("Tkfshd2hc  op te o04eibnxmo  yg2 urw uvrlz!@qojea ", 5))