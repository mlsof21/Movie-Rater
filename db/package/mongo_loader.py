def create_movie(collection, movie):
    return collection.insert_one(movie).inserted_id

def create_movies(collection, movies):
    return collection.insert_many(movies).inserted_ids

def find_movie(collection, query):
    if collection.find_one(query) is not None:
        return True
    return False

    
