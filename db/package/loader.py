import sqlite3
from sqlite3 import Error

def create_movie(conn, movie):
    sql = ''' INSERT INTO movies(imdbId,title,year,runtime,genres) VALUES (?,?,?,?,?) '''
    cur = conn.cursor()
    cur.execute(sql, movie)
    return cur.lastrowid

def create_connection(db_file):
    conn = None
    try:
        conn = sqlite3.connect(db_file)
        return conn
    except Error as e:
        print(e)

def create_table(conn, create_table_sql):
    try:
        c = conn.cursor()
        c.execute(create_table_sql)
    except Error as e:
        print("error in table creation", e)

def create_index(conn, create_index_sql):
    try: 
        c = conn.cursor()
        c.execute(create_index_sql)
    except Error as e:
        print("error in index creation", e)        

def check_if_movie_exists(conn, imdbId):    
    sql = '''SELECT 1 FROM movies WHERE imdbId=? '''
    try:
        cur = conn.cursor()
        cur.execute(sql, (imdbId,))
        movie_exists = cur.fetchone() is not None
        if movie_exists:
            return True
        else:
            return False
    except Error as e:
        print("error in imdbId check", e)
        return False