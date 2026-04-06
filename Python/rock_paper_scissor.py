import random

choices = ["rock", "paper", "scissors"]
computer_choice = random.choice(choices)

print("Welcome to Rock, Paper, Scissors!")

user_choice = input("Enter rock, paper, or scissors: ")

if user_choice not in choices:
    print("Invalid choice. Please choose rock, paper, or scissors.")
    exit()

if user_choice == computer_choice:
    print("It's a tie!")
elif user_choice == "rock" and computer_choice == "scissors":
        print("You win!")
elif user_choice == "paper" and computer_choice == "rock":
        print("You win!")
elif user_choice == "scissors" and computer_choice == "paper":
        print("You win!")
else:
    print("You lose!")