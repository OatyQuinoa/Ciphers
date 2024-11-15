message = input("Enter a message to be decrypted: ")
key = input("Enter a key: ")

def vigenere_decipher(message, key):
    caseInfo = []
    messageIndicesArray = []
    decryptedMessageIndicesArray = []

    uppercaseAlphabet = [
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O",
        "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
    ]

    lowercaseAlphabet = [
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o",
        "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
    ]

    for letter in message:
        alphabetToUse = uppercaseAlphabet # Alphabet in use 

        if letter in uppercaseAlphabet:
            alphabetToUse = uppercaseAlphabet
            caseInfo.append("upper")
        elif letter in lowercaseAlphabet:
            alphabetToUse = lowercaseAlphabet
            caseInfo.append("lower")
        else:
            messageIndicesArray.append(-1)
            caseInfo.append(None) 
            continue      
        
        alphabeticalIndex = alphabetToUse.index(letter) # index() returns the index of the letter in the specified alphabet 
        messageIndicesArray.append(alphabeticalIndex) 

    keyArray = []
    for letter in key: # Loop through key and append each letter to array (e.g., if key = "XYZ", keyArray = ["X", "Y", "Z"]
        keyArray.append(letter)

    keyPatternArray = []
    indexedKeyPatternArray = []
    letterIndex = 0

    for index in messageIndicesArray: # Add each letter from the keyArray repeatedly (e.g., XYZXYZXYZ) unless empty space (-1) is found 
        if index == -1:
            keyPatternArray.append(" ")
        else:
            keyPatternArray.append(keyArray[letterIndex % len(keyArray)]) # A separate index is declared to ensure that each letter of keyArray is appended independently of the `index` in the for loop
            letterIndex += 1

    for letter in keyPatternArray: # Determine the index of the key letter according to its case, uppercase or lowercase
        if letter in uppercaseAlphabet:
            indexedKeyPatternArray.append(uppercaseAlphabet.index(letter))
        if letter in lowercaseAlphabet:
            indexedKeyPatternArray.append(lowercaseAlphabet.index(letter))
        if letter == " ":
            indexedKeyPatternArray.append(-1)

    for index in range(len(messageIndicesArray)): # range() creates a sequence of numbers representing each ascending index of messageIndicesArray
        if messageIndicesArray[index] != -1 and indexedKeyPatternArray[index] != -1: # Checks both array of message indices and array of key indices to see whether -1 (symbol/space, etc.) exists 
            decryptedMessageIndicesArray.append(((messageIndicesArray[index] + 26) - indexedKeyPatternArray[index]) % 26) # Add 26 to account for negative numbers when subtracting index of key letter
        else:
            decryptedMessageIndicesArray.append(None)

    vigenere_cipher_output = ""
    for index in range(len(decryptedMessageIndicesArray)):
        if decryptedMessageIndicesArray[index] != None:
            correspondingAlphabetToUse = uppercaseAlphabet if caseInfo[index] == "upper" else lowercaseAlphabet # Outputs the decrypted letter based on whether corresponding caseInfo value is upper or lower 
            # Syntax for ternary operator in Py: (value_if_true) if (condition) else (value_if_false)
            vigenere_cipher_output += correspondingAlphabetToUse[decryptedMessageIndicesArray[index]] 
        else: 
            vigenere_cipher_output += message[index]

    return vigenere_cipher_output

print(vigenere_decipher(message, key))
