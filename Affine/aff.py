message = input("Enter a message: ")
a = input("Enter a numerical value of `a`: ") # Where `a` is the multiplicative key (must be coprime to 26)
b = input("Enter a numerical value of `b`: ") # Where `b` is the additive key 

from math import sqrt # Import square root function from math library 
def checkIfCoprime(a, b):
    a = int(a)
    b = int(b)

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

    return arrFactorsOfA, arrFactorsOfB

def affine(message, a, b):
    return [message, a, b]

print(checkIfCoprime(a, b))
print(affine(message, a, b))