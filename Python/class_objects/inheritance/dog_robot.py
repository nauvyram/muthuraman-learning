from robots import Robot

class Dog_Robot(Robot):
    def make_noise(self):
        print("Woof!")
    
    def eat(self):
        super().eat()
        print("Bacon")

dog1 = Dog_Robot("Rover")
dog1.make_noise()
dog1.walk(5, 10)
dog1.eat()