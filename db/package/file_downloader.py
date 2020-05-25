import urllib.request

def download_file(url):
    print("Starting file download from", url)

    urllib.request.urlretrieve(url, "file")