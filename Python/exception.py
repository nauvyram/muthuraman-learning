acronyms = {
    "LOL": "Laugh Out Loud",
    "BRB": "Be Right Back",
    "IDK": "I Don't Know",
}

try: 
    print(acronyms["LOL"])
    print(acronyms["BRB"])
    print(acronyms["IDK"])
    print(acronyms["SMH"])
except KeyError:
    print("That acronym does not exist in the dictionary.")
finally:
    print("This will always be printed.")

def divition(x, y):
    try:
        result = x / y
    except ZeroDivisionError:
        print("You cannot divide by zero!")
    else:
        print("The result is: ", result)
    finally:
        print("This will always be printed.")

divition(10, 2)
divition(10, 0)