lookup_acronyms = input("Enter an acronym to look up: \n")

with open("/Users/muthu/Projects/muthuraman-learning/Python/reading_files/input.txt") as file:
    for line in file:
        if lookup_acronyms in line:
            print(line.split("-")[1].strip())
            break
    else:
        print("Acronym not found.")