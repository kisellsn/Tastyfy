from __future__ import print_function
import base64
import json
import pickle

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
CLIENT_PORT = 3000
PORT = 8000
REDIRECT_URI = "{}:{}/callback/".format(CLIENT_SIDE_URL, PORT)
SCOPE = "user-read-private user-read-email ugc-image-upload user-library-read playlist-modify-public playlist-modify-private user-read-recently-played user-top-read user-library-modify"
STATE = generate_random_string(16)


auth_query_parameters = {
    "response_type": "code",
    "redirect_uri": REDIRECT_URI,
    "scope": SCOPE,
    "state": STATE,
    "client_id": CLIENT_ID,
    "show_dialog": "True"
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
    refresh_token = response_data["refresh_token"]

    # use the access token to access Spotify API
    auth_header = {"Authorization": "Bearer {}".format(access_token)}
    refresh_header = {"Authorization": "Bearer {}".format(refresh_token)}
    return auth_header,refresh_header



# spotify endpoints
USER_PROFILE_ENDPOINT = "{}/{}".format(SPOTIFY_API_URL, 'me')
USER_PLAYLISTS_ENDPOINT = "{}/{}".format(USER_PROFILE_ENDPOINT, 'playlists')
USER_TOP_ARTISTS_AND_TRACKS_ENDPOINT = "{}/{}".format(
    USER_PROFILE_ENDPOINT, 'top')  # /<type>
USER_RECENTLY_PLAYED_ENDPOINT = "{}/{}/{}".format(USER_PROFILE_ENDPOINT,
                                                  'player', 'recently-played')
USER_LIBRARY_ENDPOINT = "{}/{}".format(USER_PROFILE_ENDPOINT, 'tracks')
AUDIO_FEATURES_ENDPOINT = "{}/{}".format(SPOTIFY_API_URL, 'audio-features')

RECOMMENDATIONS_ENDPOINT = "{}/{}".format(SPOTIFY_API_URL, 'recommendations')

# ------------------ USERS ---------------------------
GET_USER_ENDPOINT = '{}/{}'.format(SPOTIFY_API_URL, 'users')

def get_user_profile(user_id):
    url = "{}/{id}".format(GET_USER_ENDPOINT, id=user_id)
    resp = requests.get(url)
    #print(resp.json())
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



def get_users_top(auth_header, t, term='medium_term'):

    if t not in ['artists', 'tracks']:
        print('invalid type')
        return None
    if term not in ['medium_term', 'short_term', 'long_term']:
        print('invalid type')
        return None
    url = "{}/{type}?{time_range}&{limit}".format(USER_TOP_ARTISTS_AND_TRACKS_ENDPOINT, type=t, time_range="time_range="+term,limit="limit=50")
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
    #print(url)
    return resp.json()


def get_users_recently_played(auth_header,limit):
    url = "{}?{limit}".format(USER_RECENTLY_PLAYED_ENDPOINT, limit="limit="+str(limit))
    resp = requests.get(url, headers=auth_header)
    return resp.json()



#-----------------Featured Playlist-------------------------
BROWSE_FEATURED_PLAYLISTS = "{}/{}/{}".format(SPOTIFY_API_URL, 'browse',
                                              'featured-playlists')
PLAYLIST_ITEMS = "{}/{}".format(SPOTIFY_API_URL, 'playlists')
def get_featured_playlists(auth_header,limit=1,country=None, locale=None):
    if country == None:
        if locale == None:
            url = "{}?{limit}".format(BROWSE_FEATURED_PLAYLISTS, limit="limit=" + str(limit))
        else:
            url = "{}?{locale}&{limit}".format(BROWSE_FEATURED_PLAYLISTS, locale="locale=" + locale,
                                                limit="limit=" + str(limit))
    else:
        if locale == None:
            url = "{}?{country}&{limit}".format(BROWSE_FEATURED_PLAYLISTS,country="country="+country, limit="limit=" + str(limit))
        else:
            url = "{}?{country}&{locale}&{limit}".format(BROWSE_FEATURED_PLAYLISTS,country="country="+country, locale="locale=" + locale,
                                                limit="limit=" + str(limit))

    resp = requests.get(url, headers=auth_header)
    resp = resp.json()["playlists"]
    rec=[]
    tracks = get_playlists_tracks(auth_header, resp, 9)
    for track in tracks["items"]:
        rec.append(track["track"])
    print(rec)
    return rec
def get_playlists_tracks(auth_header, playlists, limit=50):
    '''
    tracks=[]
    for playlist in playlists["items"]:
        items=get_playlist_items(auth_header,playlist["id"])["items"]
        for item in items:
            tracks.append(item["track"])
    all_data=[]
    for json_str in tracks:
        data = json.loads(json_str)
        all_data.append(data)
    concatenated_json = json.dumps(all_data)
    print(concatenated_json)
    return concatenated_json
    '''
    for pl in playlists["items"]:
        items=get_playlist_items(auth_header, pl["id"], limit)

    return items

GET_TRACK_ENDPOINT = "{}/{}".format(SPOTIFY_API_URL, 'tracks')  # /<id>


def get_track(auth_header,track_id):
    url = "{}/{id}".format(GET_TRACK_ENDPOINT, id=track_id)
    resp = requests.get(url, headers=auth_header)
    return resp.json()

def get_playlist_items(auth_header, playlist_id, limit=50):
    url = "{}/{playlist_id}/{tracks}?{limit}".format(PLAYLIST_ITEMS,playlist_id=playlist_id,tracks="tracks",limit="limit="+str(limit))
    resp = requests.get(url, headers=auth_header)
    return resp.json()


GET_ARTIST_ENDPOINT = "{}/{}".format(SPOTIFY_API_URL, 'artists')  # /<id>

def get_artist(auth_header,artist_id):
    url = "{}/{id}".format(GET_ARTIST_ENDPOINT, id=artist_id)
    resp = requests.get(url, headers=auth_header)
    return resp.json()


def get_user_genres(auth_header):
    top_tracks = get_users_top(auth_header, 'tracks')
    if len(top_tracks['items']) < 2: return []
    artists = [track['artists'] for track in top_tracks['items']]
    genres = []
    for artists_track in artists:
        for artist in artists_track:
            artistobj = get_artist(auth_header,artist['id'])
            if artistobj['genres']: genres.append(artistobj['genres'])
    print(genres)
    return genres

#---------------------RECOMMENDATIONS--------------------

def get_recommendations(auth_header, limit, t_count, a_count=0, g_count=0, market=None):
    seed_artists='seed_artists='
    seed_tracks=''
    seed_genres='seed_genres='
    top_artists = get_users_top(auth_header, 'artists')
    if len(top_artists['items'])<2:
        t_count=5
    else:
        artists_ids = ','.join([artist['id'] for artist in top_artists['items'][0:a_count]])
        seed_artists = "seed_artists=" + artists_ids
        genress = []
        for artist in top_artists['items']:
            for genre in artist['genres']:
                genress.append(genre)
        counter = Counter(genress)
        top_two_genre_names = ','.join([genre[0] for genre in counter.most_common(g_count)])
        seed_genres = "seed_genres=" + top_two_genre_names

    top_tracks = get_users_top(auth_header, 'tracks')
    if len(top_tracks['items'])<5:
        if market==None: playlist = get_featured_playlists(auth_header, limit=1)
        else: playlist = get_featured_playlists(auth_header, limit=1, country=market)
        playlist_tracks = get_playlists_tracks(auth_header, playlist["playlists"], limit=5)
        tracks =[track['track'] for track in playlist_tracks[0]['items']]
        tracks_ids = ','.join([track['id'] for track in tracks])


    else:
        tracks_ids = ','.join([track['id'] for track in top_tracks['items'][0:t_count]])
    seed_tracks = "seed_tracks=" + tracks_ids



    limit ="limit=" + str(limit)
    if market==None:
        url = '{}?{}&{}&{}&{}'.format(RECOMMENDATIONS_ENDPOINT, limit, seed_artists, seed_genres,
                                         seed_tracks)
    else:
        market = "market=" + market
        url = '{}?{}&{}&{}&{}&{}'.format(RECOMMENDATIONS_ENDPOINT, limit, market, seed_artists, seed_genres, seed_tracks)
    resp = requests.get(url, headers=auth_header)
    return resp.json()


#---------------Save Tracks for Current User---------------

def save_track(auth_header, tracks):
    ids = ','.join([track['id'] for track in tracks['tracks']])
    url = "{}?{}".format(USER_LIBRARY_ENDPOINT, "ids="+ids)
    auth_header["Content-Type"] = "application/json"
    resp = requests.put(url, headers=auth_header)
    return resp









# -----------------SEARCH ------------------------

SEARCH_ENDPOINT = "{}/{}".format(SPOTIFY_API_URL, 'search')


def search(auth_header,name, search_type='track'):
    if search_type not in ['artist', 'track', 'album', 'playlist']:
        print('invalid input')
        return None
    type="type="+search_type
    q = "q=" + name
    url = '{}?{}&{}'.format(SEARCH_ENDPOINT, q, type)
    resp = requests.get(url,  headers=auth_header)
    return resp.json()



#-----------------Generate Playlist-------------------------


def generate_playlist_tracks(auth_header, tracks):

    tracks_ids = ','.join([track["track"]['id'] for track in tracks['items'][0:5]])
    seed_tracks = "seed_tracks=" + tracks_ids

    seed_artists = "seed_artists="
    seed_genres = "seed_genres="
    url = '{}?{}&{}&{}'.format(RECOMMENDATIONS_ENDPOINT, seed_artists, seed_genres,
                                         seed_tracks)

    resp = requests.get(url, headers=auth_header)
    return resp.json()


def create_playlist(auth_header, user_id, name,description=None):
    user_playlists = get_users_playlists(auth_header)["items"]
    if all(play["name"] != name for play in user_playlists):
        url = "{}/{id}/{playlists}".format(GET_USER_ENDPOINT, id=user_id, playlists="playlists")
        data = json.dumps({
            "name": name,
            "description": description
        })
        auth_header["Content-Type"] = "application/json"
        resp = requests.post(url, data=data, headers=auth_header)
    else:
        matching_playlist = next((play for play in user_playlists if play["name"] == name), None)
        return matching_playlist["id"]
    return resp.json()["id"]

def set_image(auth_header, playlist_id):
    url = "{}/{playlists}/{id}/{images}".format(SPOTIFY_API_URL, id=playlist_id, playlists="playlists",
                                                       images="images")
    auth_header["Content-Type"] = "image/jpeg"
    with open('static/imgs/image.jpg', 'rb') as image_file:
        encoded_image_data = base64.b64encode(image_file.read())

    encoded_image_string = encoded_image_data.decode('utf-8')
    resp = requests.put(url, data=encoded_image_string, headers=auth_header)
    print(resp)
    return resp

def add_playlist_tracks(auth_header, playlist_id, tracks):
    uris = ','.join([track['uri'] for track in tracks['tracks']])
    url = "{}/{playlists}/{id}/{tracks}?{uris}".format(SPOTIFY_API_URL, id=playlist_id, playlists="playlists", tracks="tracks", uris="uris="+uris)

    data = json.dumps({
        "position": 0
    })
    auth_header["Content-Type"] = "application/json"
    resp = requests.post(url, data=data, headers=auth_header)
    return resp











# ---------------- ARTISTS ------------------------



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



def get_several_tracks(list_of_ids):
    url = "{}/?ids={ids}".format(GET_TRACK_ENDPOINT, ids=','.join(list_of_ids))
    resp = requests.get(url)
    return resp.json()
