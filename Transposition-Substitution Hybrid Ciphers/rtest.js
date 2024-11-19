const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question("Enter a message for decryption: ", (message) => {
    rl.question("Enter a key to decrypt message: ", (key) => {
        console.log(handlingTSHDC(message, key))
        rl.close();
    })
})

function retrieveIndicesOfCharacterFromArray(array, value) { // retrieveIndicesOfCharacterFromArray
    return array
      .map((element, index) => (element === value ? index : -1))  // Create an array of indices or -1 if no match
      .filter(index => index !== -1);  // Return array in which only elements not equal to -1 exist 
}

function mapZerothElementOfSubarray(array_of_arrays) { // Creates a new array with the zeroth index of each subarray
    return array_of_arrays.map(subarray => subarray[0])
}

function transposition_substitution_hybrid_decipher(message, key) { // CTDC

    // Reverse colunar transposition: 
    let alphabetically_sorted_message_columns = [] 
    let sub_array = [] 

    // Sort messages by column according to the length of columns (message.length / key.length)
    for (i = 0; i < message.length + 1; i++) { // message.length + 1 to account for indices starting at zero, hence a message length of 12 only goes up to 11
        if (i % (message.length / key.length) === 0) {
            sub_array.length === 0 ? null : alphabetically_sorted_message_columns.push(sub_array) // null specifies JS to do nothing 
            sub_array = []
            sub_array.push(message[i])
        } else {
            sub_array.push(message[i])
        }
    }

    const keyLetters = key.split('') // Return ans array containing each letter of the key 
    const keyArrayLetters = mapZerothElementOfSubarray(alphabetically_sorted_message_columns) // Return each letter of the alphabetically-sorted key column, containing duplicate letters
    const keyArrayFromSet = Array.from(new Set(keyArrayLetters)) // Returns an array of the alphabetically-sorted key column without duplicate letters
    // (Array.from) converts Set (3) {'A', 'I', 'M'} (set object notation) into ['A', 'I', 'M']

    let sorted_index_array = [] // Matches the letters of the alphabetically-sorted key to their actual index positions in the regular key
    keyArrayFromSet.forEach(char => { // Get the indices for each element and push them into the result array
        sorted_index_array = sorted_index_array.concat(retrieveIndicesOfCharacterFromArray(keyLetters, char));  // Concat adds an array to another array
    });

    // Resort array according to the actual positions of letters in the key from the alphabetically-sorted array
    let resorted_message_columns = [] 
    for (i = 0; i < sorted_index_array.length; i++) {
        resorted_message_columns[sorted_index_array[i]] = alphabetically_sorted_message_columns[i] // Assign position of key letter
    }

    let encryptedMessageLength = (resorted_message_columns[0].length * resorted_message_columns.length) - key.length; // Finds the length of the encrypted message, excluding the key, from the sorted columns
    let detransposed_message = "";
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
        //detransposed_message += currentCharacter === "X" ? " " : currentCharacter; // If X is detected in encrypted message, decrypt it by substituting it with a whitespace
        detransposed_message += currentCharacter
    }

    // Detransposed_message represents the resulting message retransposed according to the valid key. Reversion of substituted characters follows below
    detransposed_message  = detransposed_message.trimEnd() // Trim end of the message of any whitespaces. 
    console.log("detransposed_message: ", detransposed_message, detransposed_message.length)

    // Reverse substitution logic begins here: 
    let validCharArray = [
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 
        'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 
        'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
    ] 
    console.log("validCharArray: ", validCharArray.length) 

    const detransposedMessageIndices = Array.from(detransposed_message, char => validCharArray.indexOf(char)) // Store the index values of each character, according to their positions in validCharArray
    let charCodeKeyArray = Array.from(key, char => validCharArray.indexOf(char)) // Determines the ASCII values of each character in the key, added to array
    let repeatedKeyArray = [] 
    console.log("detransposedMessageIndices: ", detransposedMessageIndices, detransposedMessageIndices.length)

    for (i = 0; i < detransposed_message.length; i++) { // Repeats index values of repeated key, according to de_transposeds message length (same as user's message length)
        repeatedKeyArray.push(charCodeKeyArray[i % key.length])
    }
    console.log("repeatedKeyArray: ", repeatedKeyArray, repeatedKeyArray.length)
  
    let decryptedCharsIndicesArray = []
    for (i = 0; i < detransposed_message.length; i++) {
        if (detransposedMessageIndices[i] !== -1) {
            decryptedCharsIndicesArray.push(((detransposedMessageIndices[i] + 62) - repeatedKeyArray[i]) % 62)
        } else {
            decryptedCharsIndicesArray.push(-1)
        }
    }
    console.log("decryptedCharsIndicesArray: ", decryptedCharsIndicesArray, decryptedCharsIndicesArray.length)

    // Create an array which converts each index value from decryptedCharsArray into corresponding letter from validCharArray 
    const decryptedCharArray = decryptedCharsIndicesArray.map(index => index == -1 ? " " : validCharArray[index]) 
    console.log("decryptedCharArray: ", decryptedCharArray, decryptedCharArray.length)

    let decryptedCharString = decryptedCharArray.join('') // Join each character into a string 

    return "Your decrypted message is: " + decryptedCharString
}

function handlingTSHDC(encryptedMessage, key) { // Properly handle errors for the decryption algorithm
    try {
        const decrypted_message_CTDC = transposition_substitution_hybrid_decipher(encryptedMessage, key)
        if (!decrypted_message_CTDC) {
            throw new Error("Decryption failed: invalid key or corrupted data.")
        }
        return decrypted_message_CTDC // return decrypted message from CTDC function to user if no error is detected
    } catch (error) {
        console.error("Decryption error occurred: ", error)
        return "Decryption failed."
    }
}