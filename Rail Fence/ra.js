const arr = ["COLLA", "ATION"]
console.log(arr[0][1] + arr[1][1])

function rail_cipher(input, rails) {
    let down_rows = Math.floor(input.length / rails)
    let up_rows = (input.length - (down_rows * rails)) / (rails - 2) 
    // Where rails - 2 = the number of characters in upward rows 
    
    let start_counter = 0
    let end_counter = rails // 5
    let down_arr = []
    let up_arr = []
    
    // Sort downwards and upwards letters and push in arrs
    for (i = 0; i < (down_rows + up_rows); i++) {
        if (i % 2 == 0) { // Handle even numbers 
            let down_substring = input.substring(start_counter, end_counter)
            down_arr.push(down_substring)
            start_counter = end_counter
            end_counter += (rails - 2)
            console.log("i = ", i, "S: ", start_counter, "E: ", end_counter)
        } 
        if (i % 2 != 0) {
            let up_substring = input.substring(start_counter, end_counter)
            up_arr.push(up_substring)
            start_counter = end_counter
            end_counter += rails 
            console.log("i = ", i, "S: ", start_counter, "E: ", end_counter)
        }
    }
    
    const trim_down_arr = arr.map(element => element.slice(1, -1)); // Stores remaining elements of downward_arr after trimming
    const trim_down_arr_parts = arr.map(element => element[0] + element[element.length - 1]); // Stores trimmed elements of downward_arr
    const rev_up_arr = up_arr.map(element => element.split("").reverse().join(""));
    
    /*
    for (i = 0; i < trim_down_arr.length; i++) { // i < rails - 2
        if (rev_up_arr[i] != undefined) {
            let merged_letter = trim_down_arr[arr_counter][letter_counter] + rev_up_arr[0][letter_counter]
        }
    }
    */

    let counter = 0
    let down_arr_counter = 0
    let up_arr_counter = 0
    let letter_counter = 0
    let arr_merged_letters = []
    let merged_letters;
    while (counter < 4) {
        if (trim_down_arr.length > rev_up_arr.length) { // Fix code here 
            merged_letters = trim_down_arr[down_arr_counter][letter_counter] + rev_up_arr[up_arr_counter][letter_counter]

            down_arr_counter++
            letter_counter++

            console.log("Merged letters: ", merged_letters)
        }
        counter++
    }
    
    
    return [down_arr, rev_up_arr]
}

console.log(rail_cipher("COLLABORATION", 5))