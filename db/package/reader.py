import gzip
from .loader import create_connection, create_table, create_movie, check_if_movie_exists
from .mongo_loader import create_movie, create_movies, find_movie


def process_file(file, collection):
    objects_to_insert = []
    count = 0
    rowid = 0
    with gzip.open(file, 'r') as f:
        line = f.readline()

        print("Reading from file")
        while line != b'':
            count += 1
            try:
                values = [x.strip() for x in line.decode('utf-8').split('\t')]            
            except Exception as e:
                print(e)
            
            try:
                if values[1] == 'movie':
                    if find_movie(collection, {"imdbId": values[0]}) == False:                        
                        to_insert = {"imdbId": values[0], "title": values[2], "year": values[5], "runtime": values[7], "genres": values[8]}
                        objects_to_insert.append(to_insert)

            except IndexError as e:
                print(line)
                print("Error parsing movie", e, values)
                print('Last row inserted:', rowid)

            if count % 1000 == 0 and len(objects_to_insert) > 0:
                print("Inserting 1000 movies")
                create_movies(collection, objects_to_insert)
                objects_to_insert.clear()

            line = f.readline()

        if len(objects_to_insert > 0):
            create_movies(collection, objects_to_insert)