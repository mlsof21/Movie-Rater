from package.loader import create_connection, create_table, create_index
from package.reader import process_file
from package.mongo_loader import create_movie, find_movie
from package.file_downloader import download_file
import os
from pymongo import MongoClient
import pymongo

download_file("https://datasets.imdbws.com/title.basics.tsv.gz")

client = MongoClient('localhost', port=27017)
db = client["movie_rater_db"]
movie_collection = db["movies"]
movie_collection.create_index([("imdbId", pymongo.DESCENDING)],
                                unique=True)

print("Starting file processing")
process_file('file', movie_collection)

os.remove('file')
print('File removed')
print('Database process completed')