class Robot_Dog:
    def __init__(self, name_val, breed_val):
        self.name = name_val
        self.breed = breed_val
    
    def bark(self):
        print("Woof!")


dog1 = Robot_Dog("Rover", "Labrador")
print(dog1.name)
print(dog1.breed)
dog1.bark()

dog2 = Robot_Dog("Buddy", "Golden Retriever")
print(dog2.name)
print(dog2.breed)