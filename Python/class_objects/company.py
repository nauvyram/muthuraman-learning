from employee import Employee

class Company:
    def __init__(self):
        self.employees = []
    
    def add_employee(self, employee):
        self.employees.append(employee)
    
    def display_employees(self):
        for employee in self.employees:
            print(f"{employee.first_name} {employee.last_name} - Salary: ${employee.calculate_paycheck():.3f} per week")
            print("---------------------------------")
    
def main():
    my_company = Company()
    employee1 = Employee("John", "Doe", 50000)
    my_company.add_employee(employee1)

    employee2 = Employee("Jane", "Doe", 60000)
    my_company.add_employee(employee2)

    employee3 = Employee("Jim", "Smith", 55000)
    my_company.add_employee(employee3)

    my_company.display_employees()

if __name__ == "__main__":
    main()