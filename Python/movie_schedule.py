current_movies = {
    "The Shawshank Redemption": "11:00 AM",
    "The Godfather": "1:30 PM",
    "The Dark Knight": "4:00 PM",
    "Pulp Fiction": "6:30 PM",
    "The Lord of the Rings: The Return of the King": "9:00 PM"
}

print("we're showing the following movies today:\n")

for i, (movie, time) in enumerate(current_movies.items(), start=1):
    print(f"{i}). {movie} at {time}")