const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question("Enter a message for encryption: ", (message) => { // Transposition_Substitution_Hybrid_Cipher
    rl.question("Enter a key: ", (key) => {
        console.log(transposition_substitution_hybrid_cipher(message, key))
        rl.close();
    })
})

function sort_accordingly(array) { // Used for columnar transposition after substitution 
    const subArrayLength = array[0].length
    let updated_array = array.map(innerArray => {
        innerArray.push(innerArray[0].charCodeAt(0)); 
        return innerArray;  
    });

    let sorted_array = updated_array.sort((a, b) => a[subArrayLength] - b[subArrayLength]) 
    let cleaned_array = sorted_array.map(innerArray => innerArray.slice(0, subArrayLength));

    return cleaned_array 
}

function transposition_substitution_hybrid_cipher(message, key) {
    key = key.replace(/\s+/g, ''); // Clean the key by removing whitespaces
    let validCharArray = [
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 
        'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 
        'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
    ]
      
    //const messageCharCodes = Array.from(message, char => validCharArray.indexOf(char)) // Store the ASCII values of each character 
    let messageCharCodes = []
    for (i = 0; i < message.length; i++) {
        if (validCharArray.indexOf(message[i])) {
            messageCharCodes.push(validCharArray.indexOf(message[i]))
        } else { // to handle spaces for now 
            messageCharCodes.push(-1)
        }
    }

    /* 
    Parse space as filler character X, remove ' ' from validCharArray, modify modulo to 61 instead of 62
    Add if statement condition to check for spaces in input message
    */

    /*
    Syntax: Array.from(iterable, map function) 
    If message = "apple",                                                                            
    `Array.from(message)` yields ['a', 'p', 'p', 'l', 'e']
    `char => char.charCodeAt(0)` takes each character (which occupy index of zero) and converts them to its ASCII value 
    Each character occupies the zero index as they are being iterated over *
    */
    
    let charCodeKeyArray = Array.from(key, char => validCharArray.indexOf(char)) // Determines the ASCII values of each character in the key, added to array
    let repeatedCharCodeKeyArray = [] 
    for (i = 0; i < message.length; i++) { // Repeats ASCII values of repeated key, according to message length
        repeatedCharCodeKeyArray.push(charCodeKeyArray[i % key.length])
    }
  
    let summedCharArray = []
    for (i = 0; i < message.length; i++) {
        if (messageCharCodes[i] == -1){
            summedCharArray.push(-1)
        } else {
            summedCharArray.push((messageCharCodes[i] + repeatedCharCodeKeyArray[i]) % 62)
        }
    }

    // Create an array which converts each ASCII value from summedCharArray into corresponding printable 
    const substitutedCharArray = summedCharArray.map(index => index == -1 ? "?" : validCharArray[index]) 
    let substitutedCharString = substitutedCharArray.join('') // Join each character into a string 

    // Console debugging purposes 
    console.log("validCharArray length: ", validCharArray.length)
    console.log("Message Char Codes: ", messageCharCodes, messageCharCodes.length)
    console.log("Key Array: ", charCodeKeyArray, charCodeKeyArray.length)
    console.log("Repeated Key Array: ", repeatedCharCodeKeyArray, repeatedCharCodeKeyArray.length)
    console.log("SummedCharArray: ", summedCharArray, summedCharArray.length)
    console.log("CharArray: ", substitutedCharArray, substitutedCharArray.length)
    console.log("CharString: ", substitutedCharString, substitutedCharString.length)

    // Beneath code logic for columnar transposition 
    let message_and_key_length = (message.length + key.length)
    let max_message_length = message_and_key_length % key.length !== 0 ? message_and_key_length - (message_and_key_length % key.length) + key.length : message_and_key_length 
    let array_of_arrays = []
    let sub_array = []
    message = Array.from(key + substitutedCharString) // (new) message uses substitutedCharString instead of input message since it has undergone substitution 

    for (i = 0; i <= max_message_length; i++) { 
        if (i % key.length === 0) {
            sub_array.length === 0 ? null : array_of_arrays.push(sub_array)
            sub_array = [] 
            if (message[i] == null || /\s/.test(message[i])) { 
                sub_array.push("?")
            } else {
                sub_array.push(message[i])
            }
        } else if (message[i] == null || /\s/.test(message[i])) { 
            sub_array.push("?")
        } else {
            sub_array.push(message[i])
        }
    }

    let array_of_unsorted_columns = [] 
    for (i = 0; i < key.length; i++) { 
        let column_array = array_of_arrays.map(column => column[i])
        array_of_unsorted_columns.push(column_array)
    }

    let alphabetically_sorted_columns = sort_accordingly(array_of_unsorted_columns) 
    let joined_elements_of_subarray = alphabetically_sorted_columns.map(subArray => subArray.join("")) 
    const encrypted_message = joined_elements_of_subarray.join("") 

    return [array_of_arrays, encrypted_message, encrypted_message.length]
}

// TheQuickBrownFox123JumpedOverTheLazyDog456
// 123ABC