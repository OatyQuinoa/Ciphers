message = input("Enter a message to encrypt: ")
shift = input("Enter a number: ")
type = input("Encrypt or decrypt? (E) or (D): ")

def caesar(message, shift, type):
    shift = int(shift) # Input number will be a string, therefore we must convert to integer
    caseInfo = []
    messageIndicesArray = []
    resultList = []

    uppercaseAlphabet = [
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O",
        "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
    ]

    lowercaseAlphabet = [
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o",
        "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
    ]

    # Handle uppercase and lowercase letters
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

    #print(1, messageIndicesArray)

    # Handle Encryption and Decryption types of Caesar cipher
    if type == "E" or type == "e":
        for index in range(len(messageIndicesArray)):
            if messageIndicesArray[index] != -1:
                resultList.append((messageIndicesArray[index] + shift) % 26)
            else: 
                resultList.append(None)
    elif type == "D" or type == "d":
        for index in range(len(messageIndicesArray)):
            if messageIndicesArray[index] != -1:
                resultList.append((messageIndicesArray[index] + 26 - shift) % 26)
            else: 
                resultList.append(None)
    else:
        raise ValueError("Incorrect type given. Must be either E or D.")
        # return ValueError message 

    #print(2, resultList)

    # Return output with proper case 
    caesar_output = ""
    for index in range(len(resultList)):
        if resultList[index] != None: 
            correspondingAlphabetToUse = uppercaseAlphabet if caseInfo[index] == "upper" else lowercaseAlphabet
            caesar_output += correspondingAlphabetToUse[resultList[index]]
        else:
            caesar_output += message[index]

    return caesar_output

print(caesar(message, shift, type))

# Syntax for ternary operator in Py: value_if_true if (condition) else value_if_false
# Syntax for ternary operator in Js: (condition) ? value_if_true : value_if_false;