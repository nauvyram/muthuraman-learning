contacts = {
    "numberOfStudents": 4,
    "students": [
        {"name": "Alice", "email": "alice@example.com"},
        {"name": "Bob", "email": "bob@example.com"},
        {"name": "Charlie", "email": "charlie@example.com"},
        {"name": "David", "email": "david@example.com"}
    ]
}

print("Students emails:\n")

for student in contacts["students"]:
    print(f"{student['name']}:\t\t{student['email']}")
