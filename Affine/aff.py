message = input("Enter a message: ")
a = input("Enter a numerical value of `a`: ") # Where `a` is the multiplicative key (must be coprime to 26)
b = input("Enter a numerical value of `b`: ") # Where `b` is the additive key 

def affine(message, a, b):
    return [message, a, b]


print(affine(message, a, b))