from __future__ import print_function
import base64
import json
import requests
import sys
import string
import random
from collections import Counter
try:
    import urllib.request, urllib.error
    import urllib.parse as urllibparse
except ImportError:
    import urllib as urllibparse

def generate_random_string(length):
    letters_and_digits = string.ascii_letters + string.digits
    result_str = ''.join(random.choice(letters_and_digits) for i in range(length))
    return result_str
# ----------------- SPOTIFY BASE URL ----------------

SPOTIFY_API_BASE_URL = 'https://api.spotify.com'
API_VERSION = "v1"
SPOTIFY_API_URL = "{}/{}".format(SPOTIFY_API_BASE_URL, API_VERSION)

# ----------------- USER AUTHORIZATION ----------------

# spotify endpoints
SPOTIFY_AUTH_BASE_URL = "https://accounts.spotify.com/{}"
SPOTIFY_AUTH_URL = SPOTIFY_AUTH_BASE_URL.format('authorize')
SPOTIFY_TOKEN_URL = SPOTIFY_AUTH_BASE_URL.format('api/token')

# client keys
CLIENT = json.load(open('conf.json', 'r+'))
CLIENT_ID = CLIENT['id']
CLIENT_SECRET = CLIENT['secret']

# server side parameter
CLIENT_SIDE_URL = "http://localhost"
PORT = 8000
REDIRECT_URI = "{}:{}/callback/".format(CLIENT_SIDE_URL, PORT)
SCOPE = "user-read-private user-read-email user-library-read playlist-modify-public playlist-modify-private user-read-recently-played user-top-read"
STATE = generate_random_string(16)


auth_query_parameters = {
    "response_type": "code",
    "redirect_uri": REDIRECT_URI,
    "scope": SCOPE,
    "state": STATE,
    "client_id": CLIENT_ID
}

# python 3
if sys.version_info[0] >= 3:
    URL_ARGS = "&".join(["{}={}".format(key, urllibparse.quote(val))
                         for key, val in list(auth_query_parameters.items())])
else:
    URL_ARGS = "&".join(["{}={}".format(key, urllibparse.quote(val))
                         for key, val in auth_query_parameters.iteritems()])

AUTH_URL = "{}/?{}".format(SPOTIFY_AUTH_URL, URL_ARGS)


def authorize(auth_token):
    code_payload = {
        "grant_type": "authorization_code",
        "code": str(auth_token),
        "redirect_uri": REDIRECT_URI
    }

    # python 3 or above
    if sys.version_info[0] >= 3:
        base64encoded = base64.b64encode(("{}:{}".format(CLIENT_ID, CLIENT_SECRET)).encode())
        headers = {"Authorization": "Basic {}".format(base64encoded.decode())}
    else:
        base64encoded = base64.b64encode("{}:{}".format(CLIENT_ID, CLIENT_SECRET))
        headers = {"Authorization": "Basic {}".format(base64encoded)}

    post_request = requests.post(SPOTIFY_TOKEN_URL, data=code_payload,
                                 headers=headers)

    # tokens are returned to the app
    response_data = json.loads(post_request.text)
    access_token = response_data["access_token"]

    # use the access token to access Spotify API
    auth_header = {"Authorization": "Bearer {}".format(access_token)}
    return auth_header



# spotify endpoints
USER_PROFILE_ENDPOINT = "{}/{}".format(SPOTIFY_API_URL, 'me')
USER_PLAYLISTS_ENDPOINT = "{}/{}".format(USER_PROFILE_ENDPOINT, 'playlists')
USER_TOP_ARTISTS_AND_TRACKS_ENDPOINT = "{}/{}".format(
    USER_PROFILE_ENDPOINT, 'top')  # /<type>
USER_RECENTLY_PLAYED_ENDPOINT = "{}/{}/{}".format(USER_PROFILE_ENDPOINT,
                                                  'player', 'recently-played')
USER_LIBRARY_ENDPOINT = "{}/{}".format(USER_PROFILE_ENDPOINT, 'tracks')
AUDIO_FEATURES_ENDPOINT = "{}/{}".format(SPOTIFY_API_URL, 'audio-features')
BROWSE_FEATURED_PLAYLISTS = "{}/{}/{}".format(SPOTIFY_API_URL, 'browse',
                                              'featured-playlists')
RECOMMENDATIONS_ENDPOINT = "{}/{}".format(SPOTIFY_API_URL, 'recommendations')

# ------------------ USERS ---------------------------
GET_USER_ENDPOINT = '{}/{}'.format(SPOTIFY_API_URL, 'users')

def get_user_profile(user_id):
    url = "{}/{id}".format(GET_USER_ENDPOINT, id=user_id)
    resp = requests.get(url)
    return resp.json()

# ------------------ USER RELATED REQUETS  ---------- #


def get_users_profile(auth_header):
    url = USER_PROFILE_ENDPOINT
    resp = requests.get(url, headers=auth_header)
    return resp.json()


def get_users_playlists(auth_header):
    url = USER_PLAYLISTS_ENDPOINT
    resp = requests.get(url, headers=auth_header)
    return resp.json()



def get_users_top(auth_header, t):
    if t not in ['artists', 'tracks']:
        print('invalid type')
        return None
    url = "{}/{type}".format(USER_TOP_ARTISTS_AND_TRACKS_ENDPOINT, type=t)
    resp = requests.get(url, headers=auth_header)
    return resp.json()


def get_users_saved_tracks(auth_header):
    url = USER_LIBRARY_ENDPOINT
    resp = requests.get(url, headers=auth_header)
    return resp.json()


def get_users_audio_features(auth_header):
    saved_tracks = get_users_saved_tracks(auth_header)
    track_ids = ','.join([track['track']['id'] for track in saved_tracks['items']])
    params = "ids="+ track_ids
    url = "{}?{}".format(AUDIO_FEATURES_ENDPOINT,params)
    resp = requests.get(url, headers=auth_header)
    print(url)
    print(resp.json())
    return resp.json()


def get_users_recently_played(auth_header):
    url = USER_RECENTLY_PLAYED_ENDPOINT
    resp = requests.get(url, headers=auth_header)
    return resp.json()



def get_featured_playlists(auth_header):
    url = BROWSE_FEATURED_PLAYLISTS
    resp = requests.get(url, headers=auth_header)
    return resp.json()


#---------------------RECOMMENDATIONS--------------------

def get_recommendations(auth_header, market=None):
    top_artists = get_users_top(auth_header, 'artists')
    artists_ids = ','.join([artist['id'] for artist in top_artists['items'][0:1]])
    seed_artists = "seed_artists=" + artists_ids

    top_tracks = get_users_top(auth_header, 'tracks')
    tracks_ids = ','.join([track['id'] for track in top_tracks['items'][0:2]])
    seed_tracks = "seed_tracks=" + tracks_ids

    genress=[]
    for artist in top_artists['items']:
        for genre in artist['genres']:
            genress.append(genre)
    counter = Counter(genress)
    top_two_genre_names = ','.join([genre[0] for genre in counter.most_common(2)])
    seed_genres = "seed_genres=" + top_two_genre_names

    limit ="limit=" + '9'
    if market==None:
        url = '{}?{}&{}&{}&{}'.format(RECOMMENDATIONS_ENDPOINT, limit, seed_artists, seed_genres,
                                         seed_tracks)
    else:
        market = "market=" + market
        url = '{}?{}&{}&{}&{}&{}'.format(RECOMMENDATIONS_ENDPOINT, limit, market, seed_artists, seed_genres, seed_tracks)
    resp = requests.get(url, headers=auth_header)
    print(url)
    print(resp.json())
    return resp.json()




# ---------------- ARTISTS ------------------------

GET_ARTIST_ENDPOINT = "{}/{}".format(SPOTIFY_API_URL, 'artists')  # /<id>


def get_artist(artist_id):
    url = "{}/{id}".format(GET_ARTIST_ENDPOINT, id=artist_id)
    resp = requests.get(url)
    return resp.json()

def get_several_artists(list_of_ids):
    url = "{}/?ids={ids}".format(GET_ARTIST_ENDPOINT, ids=','.join(list_of_ids))
    resp = requests.get(url)
    return resp.json()


def get_artists_albums(artist_id):
    url = "{}/{id}/albums".format(GET_ARTIST_ENDPOINT, id=artist_id)
    resp = requests.get(url)
    return resp.json()


def get_artists_top_tracks(artist_id, country='US'):
    url = "{}/{id}/top-tracks".format(GET_ARTIST_ENDPOINT, id=artist_id)
    myparams = {'country': country}
    resp = requests.get(url, params=myparams)
    return resp.json()


def get_related_artists(artist_id):
    url = "{}/{id}/related-artists".format(GET_ARTIST_ENDPOINT, id=artist_id)
    resp = requests.get(url)
    return resp.json()

# -----------------SEARCH ------------------------

SEARCH_ENDPOINT = "{}/{}".format(SPOTIFY_API_URL, 'search')


# https://developer.spotify.com/web-api/search-item/
def search(search_type, name):
    if search_type not in ['artist', 'track', 'album', 'playlist']:
        print('invalid type')
        return None
    myparams = {'type': search_type}
    myparams['q'] = name
    resp = requests.get(SEARCH_ENDPOINT, params=myparams)
    return resp.json()




# ---------------- ALBUMS ------------------------
GET_ALBUM_ENDPOINT = "{}/{}".format(SPOTIFY_API_URL, 'albums')  # /<id>


def get_album(album_id):
    url = "{}/{id}".format(GET_ALBUM_ENDPOINT, id=album_id)
    resp = requests.get(url)
    return resp.json()


def get_several_albums(list_of_ids):
    url = "{}/?ids={ids}".format(GET_ALBUM_ENDPOINT, ids=','.join(list_of_ids))
    resp = requests.get(url)
    return resp.json()


def get_albums_tracks(album_id):
    url = "{}/{id}/tracks".format(GET_ALBUM_ENDPOINT, id=album_id)
    resp = requests.get(url)
    return resp.json()





# ---------------- TRACKS ------------------------

GET_TRACK_ENDPOINT = "{}/{}".format(SPOTIFY_API_URL, 'tracks')  # /<id>


def get_track(track_id):
    url = "{}/{id}".format(GET_TRACK_ENDPOINT, id=track_id)
    resp = requests.get(url)
    return resp.json()

def get_several_tracks(list_of_ids):
    url = "{}/?ids={ids}".format(GET_TRACK_ENDPOINT, ids=','.join(list_of_ids))
    resp = requests.get(url)
    return resp.json()
