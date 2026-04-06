def mthLastElement(M,L):
    if (M <=0) & (M > len(L)):
        return None
    return L[-M]

M=4
L=[10, 200, 3, 40000, 5]

print(f"output is {mthLastElement(M,L)}")