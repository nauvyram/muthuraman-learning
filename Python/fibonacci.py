def fib(n):
    if n<=1:
        return n
    return fib(n-1) + fib(n-2)

def countWays(steps):
    return fib(steps+1)

steps = 4
print("no of ways", countWays(steps))