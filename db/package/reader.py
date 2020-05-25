import gzip
from .loader import create_connection, create_table, create_movie, check_if_movie_exists




def process_file(file, conn):
    rowid = 0
    with gzip.open(file, 'r') as f:
        line = f.readline()

        while line != b'':
            try:
                values = [x.strip() for x in line.decode('utf-8').split('\t')]            
            except Exception as e:
                print(e)
            
            try:
                if values[1] == 'movie':
                    if check_if_movie_exists(conn, values[0]) == False:
                        to_insert = (values[0], values[2], values[5], values[7], values[8])
                        rowid = create_movie(conn, to_insert)

                        if rowid % 1000 == 0:
                            conn.commit()
            except IndexError as e:
                print(line)
                print("Error parsing movie", e, values)
                print('Last row inserted:', rowid)
                conn.commit()

            line = f.readline()
