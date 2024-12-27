from math import sqrt, isnan # Import square root function from math library 

message = input("Enter a message: ")
a = int(input("Enter a numerical value of a: ")) # Where `a` is the multiplicative key (must be coprime to 26)
b = int(input("Enter a numerical value of b: ")) # Where `b` is the additive key 

# ValueError: invalid literal for int() with base 10: 'num' if a or b is givne non-numerical inputs

def checkIfCoprime(a, b):

    # First determine the common factors of a and b
    testCounterA = 1
    testCounterB = 1
    arrFactorsOfA = []
    arrFactorsOfB = []

    while (testCounterA <= sqrt(a) or testCounterB <= sqrt(b)):
        if (a % testCounterA == 0):
            arrFactorsOfA.append(testCounterA)
            arrFactorsOfA.append(int(a / testCounterA)) # division changes output to float, revert back to int
        if (b % testCounterB == 0):
            arrFactorsOfB.append(testCounterB)
            arrFactorsOfB.append(int(b / testCounterB))
        
        testCounterA += 1
        testCounterB += 1

        # Sort in ascending order 
        arrFactorsOfA.sort()
        arrFactorsOfB.sort()

    # Secondly search for duplicates in arrFactorsOfA and arrFactorsOfB
    array_of_duplicates = []
    right_pointer_a = len(arrFactorsOfA) - 1
    right_pointer_b = len(arrFactorsOfB) - 1

    while (right_pointer_a >= 0 and right_pointer_b >= 0):
        if (arrFactorsOfA[right_pointer_a] == arrFactorsOfB[right_pointer_b]):
            array_of_duplicates.append(arrFactorsOfA[right_pointer_a])
            right_pointer_a -= 1
            right_pointer_b -= 1 
            # If the same value exists at the same index in both arrays, move index to the left by 1 in both arrays
        elif (arrFactorsOfA[right_pointer_a] > arrFactorsOfB[right_pointer_b]):
            right_pointer_a -= 1
            # Shift right_pointer of array A to the left if arrayA[right_pointer_a] is greater than arrayB[right_pointer_b]
        elif (arrFactorsOfA[right_pointer_a] < arrFactorsOfB[right_pointer_b]):
            right_pointer_b -= 1
            # Shift right_pointer of array B to the left if arrayB[right_pointer_b] is greater than arrayA[right_pointer_a]

    # Then check the length of duplicate array: the only value should be 1 if a and b are coprime (common factor of 1)
    return True if (len(array_of_duplicates) == 1 and array_of_duplicates[0] == 1) else False

def affine(message, a, b):
    caseInfo = []
    messageIndicesArray = []
    encryptedMessageIndicesArray = []

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

        alphabeticalIndex = alphabetToUse.index(letter) 
        # index() returns the index of the letter in the specified alphabet 
        # e.g., lowercaseAlphabet.index("a") = 0
        messageIndicesArray.append(alphabeticalIndex) 

    # for index, value in enumerate(messageIndicesArray):
    for index in range(len(messageIndicesArray)):
        if (messageIndicesArray[index] != -1):
            encryptedMessageIndicesArray.append(((a * messageIndicesArray[index]) + b) % 26)
        else:
            encryptedMessageIndicesArray.append(-1)

    return [message, a, b, caseInfo, encryptedMessageIndicesArray]

print(checkIfCoprime(a, b))
print(affine(message, a, b))