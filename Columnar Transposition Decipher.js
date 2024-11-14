/*
const { default: test } = require('node:test')
const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question("Enter a message for decryption: ", (message) => {
    rl.question("Enter a key to decrypt message: ", (key) => {
        console.log(columnar_transposition_decipher(message, key))
        rl.close();
    })
})
*/

function retrieveIndicesOfCharacterFromArray(array, value) { // retrieveIndicesOfCharacterFromArray
    return array
      .map((element, index) => (element === value ? index : -1))  // Create an array of indices or -1 if no match
      .filter(index => index !== -1);  // Return array in which only elements not equal to -1 exist 
}

function mapZerothElementOfSubarray(array_of_arrays) { // Creates a new array with the zeroth index of each subarray
    return array_of_arrays.map(subarray => subarray[0])
}

function columnar_transposition_decipher(message, key) { // CTDC
    //console.time("EXEC")
    
    let alphabetically_sorted_message_columns = [] 
    let sub_array = [] 

    for (i = 0; i < message.length + 1; i++) { // message.length + 1 to account for indices starting at zero, hence a message length of 12 only goes up to 11
        if (i % (message.length / key.length) === 0) {
            sub_array.length === 0 ? null : alphabetically_sorted_message_columns.push(sub_array) // null specifies JS to do nothing 
            sub_array = []
            sub_array.push(message[i])
        } else {
            sub_array.push(message[i])
        }
    }

    // ------------------------------------------------------------------------------------------------------------------

    const keyLetters = key.split('') // Return ans array containing each letter of the key 
    const keyArrayLetters = mapZerothElementOfSubarray(alphabetically_sorted_message_columns) // Return each letter of the alphabetically-sorted key column, containing duplicate letters
    const keyArrayFromSet = Array.from(new Set(keyArrayLetters)) // Returns an array of the alphabetically-sorted key column without duplicate letters
    // (Array.from) converts Set (3) {'A', 'I', 'M'} (set object notation) into ['A', 'I', 'M']
    console.log(keyArrayFromSet)

    let sorted_index_array = [] // Matches the letters of the alphabetically-sorted key to their actual index positions in the regular key
    keyArrayFromSet.forEach(char => { // Get the indices for each element and push them into the result array
        sorted_index_array = sorted_index_array.concat(retrieveIndicesOfCharacterFromArray(keyLetters, char));  // Concat adds an array to another array
    });
    
    console.log(sorted_index_array);  // Example output: [1, 3, 6, 5, 0, 2, 4] 

    /*
    if keyLetters = [M, A, M, A, M, I, A],
        retrieveIndicesOfCharacterFromArray(keyLetters, char) returns an array containing the indices of each char in keyLetters 
    
    keyArrayFromSet = keyLetters without duplicates: [A, I, M]
    Each letter in keyArrayFromSet goes through the retrieveIndicesOfCharacterFromArray(keyLetters, char) function. 
    Hence the letter 'A' is checked in the parameter array `keyLetters` and the function returns [1, 3, 6],
    Because A exists in indices 1, 3, and 6 of `keyLetters` array 
    Letter I is checked and returns an array containing [5]
    Letter M is checked and returns an array containing [0, 2, 4]
    Concat() simply adds these arrays together: 
    [1, 3, 6, 5, 0, 2, 4]
    */

    // Resort array according to the actual positions of letters in the key from the alphabetically-sorted array
    let resorted_message_columns = [] 
    for (i = 0; i < sorted_index_array.length; i++) {
        resorted_message_columns[sorted_index_array[i]] = alphabetically_sorted_message_columns[i] // Assign position of key letter
    }

    console.log(resorted_message_columns) // Log resorted columns in the order of the actual key

    // ------------------------------------------------------------------------------------------------------------------

    let encryptedMessageLength = (resorted_message_columns[0].length * resorted_message_columns.length) - key.length;
    let deciphered_message = "";
    let subarray_counter = -1; // Counts each subarray of the array of arrays
    let indices_within_subarray_counter = 0; // Counts each index within the subarray 

    for (let i = 0; i < encryptedMessageLength; i++) {
        if (i % key.length === 0) {
            subarray_counter += 1
            // Once column (index 1) reaches the bottom, move to the next index of each subarray and go from top to bottom, repeated
            subarray_counter % resorted_message_columns.length === 0 ? (subarray_counter = 0, indices_within_subarray_counter++) : null
        } else { 
            // If column not fully read, continue downwards of the column by incrementing subarray_counter 
            subarray_counter++
        }
        const currentCharacter = resorted_message_columns[subarray_counter][indices_within_subarray_counter];
        deciphered_message += currentCharacter === "X" ? " " : currentCharacter;
    }

    deciphered_message = deciphered_message.trimEnd() // Trim end of the message of any whitespaces. 

    //console.timeEnd("EXEC")
    return deciphered_message
    // return [alphabetically_sorted_message_columns, keyArrayLetters, deciphered_message]
}
