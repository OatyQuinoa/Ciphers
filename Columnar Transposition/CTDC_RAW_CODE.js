const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question("Enter a message for decryption: ", (message) => {
    rl.question("Enter a key to decrypt message: ", (key) => {
        console.log(handlingCTDC(message, key))
        rl.close();
    })
})

function retrieveIndicesOfCharacterFromArray(array, value) { 
    return array
      .map((element, index) => (element === value ? index : -1)) 
      .filter(index => index !== -1);  
}

function mapZerothElementOfSubarray(array_of_arrays) { 
    return array_of_arrays.map(subarray => subarray[0])
}

function columnar_transposition_decipher(message, key) { 
    let alphabetically_sorted_message_columns = [] 
    let sub_array = [] 

    for (i = 0; i < message.length + 1; i++) { 
        if (i % (message.length / key.length) === 0) {
            sub_array.length === 0 ? null : alphabetically_sorted_message_columns.push(sub_array) 
            sub_array = []
            sub_array.push(message[i])
        } else {
            sub_array.push(message[i])
        }
    }

    const keyLetters = key.split('') 
    const keyArrayLetters = mapZerothElementOfSubarray(alphabetically_sorted_message_columns)
    const keyArrayFromSet = Array.from(new Set(keyArrayLetters)) 

    let sorted_index_array = [] 
    keyArrayFromSet.forEach(char => { 
        sorted_index_array = sorted_index_array.concat(retrieveIndicesOfCharacterFromArray(keyLetters, char)); 
    });

    let resorted_message_columns = [] 
    for (i = 0; i < sorted_index_array.length; i++) {
        resorted_message_columns[sorted_index_array[i]] = alphabetically_sorted_message_columns[i] 
    }

    let encryptedMessageLength = (resorted_message_columns[0].length * resorted_message_columns.length) - key.length; 
    let deciphered_message = "";
    let subarray_counter = -1; 
    let indices_within_subarray_counter = 0; 

    for (let i = 0; i < encryptedMessageLength; i++) {
        if (i % key.length === 0) {
            subarray_counter += 1
            subarray_counter % resorted_message_columns.length === 0 ? (subarray_counter = 0, indices_within_subarray_counter++) : null
        } else { 
            subarray_counter++
        }
        const currentCharacter = resorted_message_columns[subarray_counter][indices_within_subarray_counter];
        deciphered_message += currentCharacter === "X" ? " " : currentCharacter; 
    }

    deciphered_message = deciphered_message.trimEnd() 
    return deciphered_message
}

function handlingCTDC(encryptedMessage, key) { 
    try {
        const decrypted_message_CTDC = columnar_transposition_decipher(encryptedMessage, key)
        if (!decrypted_message_CTDC) {
            throw new Error("Decryption failed: invalid key or corrupted data.")
        }
        return decrypted_message_CTDC 
    } catch (error) {
        console.error("Decryption error occurred: ", error)
        return "Decryption failed."
    }
}