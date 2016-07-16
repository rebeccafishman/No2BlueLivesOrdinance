import googlemaps
import requests
import sys
import os
from os.path import join, dirname
from dotenv import load_dotenv

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

GOOGLE_API_KEY = os.environ.get('GOOGLE_API_KEY')

def extract_lat_lon_from_json(data):
    location = data['geometry']['location']
    return(location['lat'], location['lng'])

def extract_ward_alderman_from_json(data):
    metadata = data['objects'][0]['metadata']
    return (metadata['WARD'], metadata['ALDERMAN'])

gmaps = googlemaps.Client(key=GOOGLE_API_KEY)
results = gmaps.geocode('60618')

if len(results) > 0:
    latitude, longitude = extract_lat_lon_from_json(results[0])
    result = requests.get("http://boundaries.tribapps.com/1.0/boundary/", params={'contains': '41.8903239,-87.623458', 'sets': 'wards'})
    data = result.json()
    ward, alderman = extract_ward_alderman_from_json(data)
    print('WARD: {}\nALDERMAN: {}'.format(ward, alderman))
