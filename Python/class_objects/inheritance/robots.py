class Robot:
    def __init__ (self, name):
        self.name = name
        self.position = [0,0]
        print("my name is " + self.name)
    
    def walk(self, x, y):
        self.position[0] = x
        self.position[1] = y
        print("my position is " + str(self.position))
        
    def eat(self):
        print("I am eating")