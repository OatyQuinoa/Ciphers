const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question("Enter a message: ", (message) => {
    rl.question("Enter a key: ", (key) => {
        console.log(columnar_transposition_cipher(message, key))
        rl.close();
    })
})

function sort_accordingly(array) { // As opposed to standard sort() provided by JS sorts alphabetically, which is tedious when used with arrays with multiple different letters
    const subArrayLength = array[0].length
    
    /* Note:
    In an array of arrays, the last index of each subarray is 1 less than the length of the subarray
    If subarray.length = 5, indices only go from 0 to 4.
    . . .
    Appended charCodes of the first value of each subarray will thus occupy subarray[5] (or subarray[subarray.length])
    */

    // Append the ASCII value of the first character to each inner array
    let updated_array = array.map(innerArray => {
        innerArray.push(innerArray[0].charCodeAt(0));  // Determine the charCode of the first character (zeroth index) of each subarray
        return innerArray;  // Return the updated inner array which has the appended charCodes at the end of each subarray
    });

    let sorted_array = updated_array.sort((a, b) => a[subArrayLength] - b[subArrayLength]) // Sort each subarray according to the charCode, from smallest to largest, 
    // whereby a[subArrayLength] and b[subArrayLength] both represent the last values of each subarray (the charCodes)

    let cleaned_array = sorted_array.map(innerArray => innerArray.slice(0, subArrayLength));

    return cleaned_array 
}

function columnar_transposition_cipher(message, key) {
    key = key.replace(/\s+/g, '');

    // Establish maximum boundary of columnar message characters
    let message_and_key_length = (message.length + key.length)
    let max_message_length = message_and_key_length % key.length !== 0 ? message_and_key_length - (message_and_key_length % key.length) + key.length : message_and_key_length 

    /*
    If key length = 8 and message_and_key_length = 26, the number of rows (with filler characters) depends on the next multiple of key length
    Hence we subtract the remainder of 26 % 8 (= 2) from 18 and add key length (8) to find the maximum length accounting for the entire message and remaining filler characters 
    E.g., 26 - 2 + 8 = 32. Therefore the next multiple of 8 from 18 is 32. 
    */

    let array_of_arrays = []
    let sub_array = []
    message = Array.from(key + message) // Merge `key` and `message` strings together, then convert them into array form 

    for (i = 0; i <= max_message_length; i++) { // i <= max_message_length considers the last multiple of key.length (e.g., key length = 8, max_msg_length = 24; if 23, 23 % 24 doesn't work)
        if (i % key.length === 0) {
            sub_array.length === 0 ? null : array_of_arrays.push(sub_array) // if nothing in subarray, null specifies JS to do nothing. Otherwise, push the subarray into the array of arrays
            sub_array = [] // clears everything within the array

            // Properly handle any whtiespaces that may be counted 
            if (message[i] == null || /\s/.test(message[i])) { // /\s\ tests for whitespace (e.g., space, new lines)
                sub_array.push("X")
            } else {
                sub_array.push(message[i])
            }
        } else if (message[i] == null || /\s/.test(message[i])) { // Padding "X" is added if no valid character exists for message[i] or regex detects a whitespace
            sub_array.push("X")
        } else {
            sub_array.push(message[i])
        }
    }

    let array_of_unsorted_columns = [] 
    for (i = 0; i < key.length; i++) { // Sort out each column from array_of_arrays 
        let column_array = array_of_arrays.map(column => column[i])
        array_of_unsorted_columns.push(column_array)
    }

    // array_of_unsorted_columns // Sort the columns (specifically the first letter) alphabetically 
    let alphabetically_sorted_columns = sort_accordingly(array_of_unsorted_columns) // Sort them with special_sort function 
    let joined_elements_of_subarray = alphabetically_sorted_columns.map(subArray => subArray.join("")) // Join each element of the subarray into one single element
    const encrypted_message = joined_elements_of_subarray.join("") // Join the subarrays of strings altogether for the final message

    /* 
    Map the array_of_sorted columns (an array of arrays (2D)) with a callback function that joins the contents of each iterable (i.e., subarray)
    This yields a 1D array of only joined letters from each column, which can then be concatenated to produce the final string. 
    */
   
    return encrypted_message
}