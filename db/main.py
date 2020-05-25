from package.loader import create_connection, create_table, create_index
from package.reader import process_file
from package.file_downloader import download_file
import os

download_file("https://datasets.imdbws.com/title.basics.tsv.gz")

conn = create_connection('movies.db')

table_sql = ''' CREATE TABLE IF NOT EXISTS movies (
    id integer PRIMARY KEY,
    imdbId text NOT NULL,
    title text NOT NULL,
    year text NOT NULL,
    runtime integer NOT NULL,
    genres text NOT NULL
); '''

index_sql = ''' CREATE UNIQUE INDEX IF NOT EXISTS idx_movies_imdbId ON movies(imdbId) '''

create_table(conn, table_sql)
create_index(conn, index_sql)

with conn:
    process_file('file', conn)

os.remove('file')
print('File removed')
print('Database process completed')