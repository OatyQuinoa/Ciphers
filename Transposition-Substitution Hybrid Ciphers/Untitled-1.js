// Faulty code


// Reverse substitution logic here
    const encryptedCharCodeArray = Array.from(deciphered_message, char => char.charCodeAt(0))
    console.log("encryptedCharCodeArray: ", encryptedCharCodeArray, encryptedCharCodeArray.length)

    let charCodeKeyArray = Array.from(key, char => char.charCodeAt(0)) // Determines the ASCII values of each character in the key, added to array
    let repeatedCharCodeKeyArray = [] 
    for (i = 0; i < deciphered_message.length; i++) { // Repeats ASCII values of repeated key, according to message length
        repeatedCharCodeKeyArray.push(charCodeKeyArray[i % key.length])
    }
    console.log("repeatedCharCodeKeyArray: ", repeatedCharCodeKeyArray, repeatedCharCodeKeyArray.length)

    let subtractedCharArray = []
    for (i = 0; i < deciphered_message.length; i++) {
        // Decryption formula 
        //subtractedCharArray.push(((encryptedCharCodeArray[i] - 32 + 95) % 95) - repeatedCharCodeKeyArray[i] + 32) // Incorrect formula
        subtractedCharArray.push(((encryptedCharCodeArray[i] - 32 - repeatedCharCodeKeyArray[i] + 95) % 95) + 32) 
    }
    console.log("subtractedCharArray: ", subtractedCharArray, subtractedCharArray.length)

    // Create an array which converts each ASCII value from subtractedCharArray into corresponding printable 
    const unsubstitutedCharArray = subtractedCharArray.map(asciiValue => String.fromCharCode(asciiValue)) 
    let unsubstitutedCharString = unsubstitutedCharArray.join('') // Join each character into a string 
    console.log("unsubstitutedCharString: ", unsubstitutedCharString, unsubstitutedCharString.length)