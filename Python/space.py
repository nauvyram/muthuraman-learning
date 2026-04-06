import requests

response = requests.get("http://api.open-notify.org/astros.json")

json_data = response.json()

for person in json_data["people"]:
    print(person["name"])